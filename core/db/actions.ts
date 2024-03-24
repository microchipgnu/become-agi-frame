import { kv } from "@vercel/kv";
import { fetchSingleData } from "./queries";

type ShareHashData = {
  sourceFid: string;
  gameHash: string;
  position: string;
  hasNoise: boolean;
};

const { KV_REST_API_TOKEN } = process.env;

// generate and store a share hash
export const createShareHash = async ({
  sourceFid,
  gameHash,
  position,
  hasNoise,
}: ShareHashData) => {
  try {
    const shareHash = await generateShareHash({
      sourceFid,
      gameHash,
      position,
      hasNoise,
    });
    await kv.set(shareHash, { sourceFid, gameHash, position, hasNoise });
    return shareHash;
  } catch (error) {
    console.error("Error creating share hash:", error);
    throw error;
  }
};

type DownloadData = {
  id: number;
  position: string;
  status: string;
  hash: string;
  accesses: number;
  created_at: Date;
  sourceFid: string;
  hasNoise: boolean;
};

// get fetchSingleData from share hash
export const getDownloadDataFromShareHash = async (
  shareHash: string,
): Promise<DownloadData> => {
  try {
    const { sourceFid, gameHash, position, hasNoise } = (await kv.get(
      shareHash,
    )) as ShareHashData;
    const data = await fetchSingleData(gameHash, position);
    data.sourceFid = sourceFid;
    data.hasNoise = hasNoise;
    return data;
  } catch (error) {
    console.error("Error fetching data from share hash:", error);
    throw error;
  }
};

// generate a sha256 hash using gameHash, position, and fid
const generateShareHash = ({
  sourceFid,
  gameHash,
  position,
  hasNoise,
}: ShareHashData): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(
    `${sourceFid}${gameHash}${position}${hasNoise}${KV_REST_API_TOKEN}`,
  );

  return crypto.subtle.digest("SHA-256", data).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  });
};
