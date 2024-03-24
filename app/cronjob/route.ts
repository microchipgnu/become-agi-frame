import {
  createAndStoreDataset,
  decrementPointsForAllUsers,
} from "@/core/db/queries";

export const GET = async (req: Request, res: Response) => {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response("Unauthorized");
  }

  await createAndStoreDataset();
  await decrementPointsForAllUsers(0.25);
  return new Response("OK");
};
