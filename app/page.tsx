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
  return (
    <div className="bg-customDark text-white min-h-screen flex flex-col justify-top items-center">
      <img src="/becomeAGI.svg" alt="Logo" className="w-40 h-40 mb-8" />

      <div className="w-full max-w-2xl flex flex-col items-left">
        <h1 className="font-bold text-xl mb-4">GOAL</h1>

        <p className="text-m">Become AGI by training your model.</p>
      </div>
    </div>
  );
}
