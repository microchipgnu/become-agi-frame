import { createAndStoreDataset } from "@/core/db/queries";

export const GET = async (req: Request, res: Response) => {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response("Unauthorized");
  }

  await createAndStoreDataset();
  return new Response("OK");
};
