import { Pool } from "pg";
import { createDataset } from "./create-dataset";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // Ensure this is set in your Vercel project settings
  ssl: {
    rejectUnauthorized: false,
  },
});

const CREATE_DATASET_TABLE = `
  CREATE TABLE IF NOT EXISTS becomeagi_dataset (
    id SERIAL PRIMARY KEY,
    position TEXT NOT NULL,
    status TEXT NOT NULL,
    hash TEXT NOT NULL,
    accesses INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

const CREATE_USER_TABLE = `
  CREATE TABLE IF NOT EXISTS becomeagi_users (
    id SERIAL PRIMARY KEY,
    fid INTEGER NOT NULL UNIQUE,
    points REAL NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

const DROP_DATASET_TABLE = `DROP TABLE becomeagi_dataset;`;
const DROP_USER_TABLE = `DROP TABLE becomeagi_users;`;

const createDatasetTable = async () => {
  await pool.query(CREATE_DATASET_TABLE);
};

const dropDatasetTable = async () => {
  await pool.query(DROP_DATASET_TABLE);
};

export const createAndStoreDataset = async () => {
  const dataset = await createDataset();

  if (dataset.grid.length === 0) return;

  const placeholders = dataset.grid
    .map(
      (_, index) => `($${3 * index + 1}, $${3 * index + 2}, $${3 * index + 3})`,
    )
    .join(", ");

  const values: string[] = dataset.grid.reduce<string[]>((acc, item) => {
    // Ensure each item's properties are strings; adjust as necessary for your data types
    return acc.concat(item.position, item.status, dataset.hash);
  }, []);

  const queryText = `INSERT INTO becomeagi_dataset (position, status, hash) VALUES ${placeholders} RETURNING *`;

  const { rows } = await pool.query(queryText, values);

  return rows;
};

export const fetchCurrentDataset = async () => {
  const FETCH_DATASET = `
    SELECT id, position, status, accesses, hash FROM becomeagi_dataset
    ORDER BY created_at DESC, position ASC
    LIMIT 32
  `;

  const { rows } = await pool.query(FETCH_DATASET);
  const randomIndex = Math.floor(Math.random() * rows.length);
  return { rows, accessedRow: rows[randomIndex] };
};

export const incrementAccesses = async (id: number) => {
  const UPDATE_ACCESS_COUNT = `
    UPDATE becomeagi_dataset
    SET accesses = accesses + 1
    WHERE id = $1
    RETURNING *;
  `;

  try {
    const { rows } = await pool.query(UPDATE_ACCESS_COUNT, [id]);
    return rows[0];
  } catch (error) {
    console.error("Error incrementing accesses for ID:", id, error);
    throw error;
  }
};

export const createUserTable = async () => {
  await pool.query(CREATE_USER_TABLE);
};

export const dropUserTable = async () => {
  await pool.query(DROP_USER_TABLE);
};

export const insertUser = async (fid: number) => {
  const INSERT_USER = `
    INSERT INTO becomeagi_users (fid)
    VALUES ($1)
    RETURNING *;
  `;

  try {
    const { rows } = await pool.query(INSERT_USER, [fid]);
    return rows[0];
  } catch (error) {
    console.error("Error inserting user:", fid, error);
    throw error;
  }
};

export const fetchUser = async (fid: number) => {
  const FETCH_USER = `
    SELECT * FROM becomeagi_users
    WHERE fid = $1
  `;

  const { rows } = await pool.query(FETCH_USER, [fid]);

  return rows;
};

export const fetchBenchmark = async (fid: number) => {
  // Fetch the top 10 users
  const FETCH_TOP_USERS = `
    SELECT *, RANK() OVER (ORDER BY points DESC) as rank
    FROM becomeagi_users
    ORDER BY points DESC
    LIMIT 10;
  `;

  // Fetch the specific user's position
  const FETCH_USER_POSITION = `
    SELECT rank FROM (
      SELECT fid, RANK() OVER (ORDER BY points DESC) as rank
      FROM becomeagi_users
    ) as ranked_users
    WHERE fid = $1;
  `;

  try {
    const topUsersPromise = pool.query(FETCH_TOP_USERS);
    const userPositionPromise = pool.query(FETCH_USER_POSITION, [fid]);

    // Use Promise.all to execute both queries concurrently
    const [topUsersResult, userPositionResult] = await Promise.all([
      topUsersPromise,
      userPositionPromise,
    ]);

    // Extract the rows from the query results
    const topUsers = topUsersResult.rows;
    const userPosition = userPositionResult.rows[0]
      ? userPositionResult.rows[0].rank
      : "Not in leaderboard";

    return {
      topUsers,
      userPosition,
    };
  } catch (error) {
    console.error("Error fetching benchmark data:", error);
    throw error;
  }
};

export const updatePoints = async (
  fid: number,
  points: number, // Assumed to be positive for increment, negative for decrement
  operation: "increment" | "decrement",
) => {
  // Determine the operation and prepare the SQL accordingly
  const operationSQL =
    operation === "increment"
      ? "GREATEST(points + $1, 0)" // Ensures the result is never less than 0
      : "GREATEST(points - ABS($1), 0)"; // Use ABS to ensure decrement is positive, and result is never less than 0

  const UPDATE_USER_POINTS = `
    UPDATE becomeagi_users
    SET points = ${operationSQL}
    WHERE fid = $2
    RETURNING *;
  `;

  try {
    const { rows } = await pool.query(UPDATE_USER_POINTS, [
      Math.abs(points),
      fid,
    ]);
    if (rows.length === 0) {
      console.log("User not found or no update necessary.");
      return null;
    }
    return rows[0];
  } catch (error) {
    console.error("Error updating user points:", error);
    throw error;
  }
};

export const insertUserIfNotExists = async (fid: number) => {
  const INSERT_USER_IF_NOT_EXISTS = `
    INSERT INTO becomeagi_users (fid)
    VALUES ($1)
    ON CONFLICT (fid) DO NOTHING
    RETURNING *;
  `;

  try {
    const { rows } = await pool.query(INSERT_USER_IF_NOT_EXISTS, [fid]);
    if (rows.length) {
      console.log("User inserted:", rows[0]);
      return rows[0]; // Return the inserted row
    } else {
      console.log("User already exists or insertion was skipped.");
      return null; // Return null if the user already exists
    }
  } catch (error) {
    console.error("Error attempting to insert user:", fid, error);
    throw error;
  }
};

export const getOrCreateUserWithMap = async (fid: number) => {
  const GET_OR_CREATE_USER = `
    WITH user_upsert AS (
      INSERT INTO becomeagi_users (fid)
      VALUES ($1)
      ON CONFLICT (fid) DO NOTHING
      RETURNING id, fid, points, created_at
    ), user_data AS (
      SELECT id, fid, points, created_at FROM user_upsert
      UNION ALL
      SELECT id, fid, points, created_at FROM becomeagi_users WHERE fid = $1 AND NOT EXISTS (SELECT 1 FROM user_upsert)
    )
    SELECT * FROM user_data;
  `;

  // Attempt to run the combined operation
  try {
    const { rows } = await pool.query(GET_OR_CREATE_USER, [fid]);
    if (rows.length === 0) {
      throw new Error("User could not be retrieved or created.");
    }
    const latestMap = await fetchCurrentDataset();
    return {
      user: rows[0],
      dataset: latestMap,
    };
  } catch (error) {
    console.error("Error getting or creating user with map:", error);
    throw error;
  }
};

// console.log(await createAndStoreDataset())
// console.table(await fetchCurrentDataset())
// console.log(await fetchCurrentDataset())
// console.table(await dropDatasetTable())
// console.table(await createDatasetTable())

// await dropUserTable()
// await createUserTable()
// await dropDatasetTable()
// await createDatasetTable()
// await createAndStoreDataset()
