import { fetchMetadata } from "frames.js/next";

export async function generateMetadata() {
  return {
    title: "b{AGI}",
    other: await fetchMetadata(
      new URL(
        "/splash",
        process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000",
      ),
    ),
  };
}

export default function Home() {
  return <div>{`b{AGI}`}</div>;
}
