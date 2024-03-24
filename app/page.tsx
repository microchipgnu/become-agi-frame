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
        <h1 className="text-white text-xl">TRAINING</h1>
        <div className="mt-2 mb-8 border-b border-customDarkBlue"></div>

        <h1 className="text-customLightBlue text-xl mb-2">GOAL</h1>
        <p className="text-m mb-8">Become AGI by training your model.</p>

        <h1 className="text-customLightBlue text-xl mb-2">TRAIN</h1>
        <p className="text-m mb-8">
          In the currently available Dataset by exploring the 128 bytes in the
          grid. Each byte has a different knowledge type (some rarer than
          others). The rarer the knowledge type, the more knowledge you receive.
        </p>

        <h1 className="text-customLightBlue text-xl mb-4">
          BYTES KNOWLEDGE TYPES
        </h1>
        <div className="space-y-2">
          <p className="knowledge-type text-white">
            <span className="text-customGreen">Perception </span>
            <span className="text-customOrange">Common</span>
            <span className="text-customLightBlue">=</span>
            <span className="text-customYellow">30%</span>
          </p>
          <p className="knowledge-type text-white">
            <span className="text-customGreen">Pattern Recognition </span>
            <span className="text-customOrange">Uncommon</span>
            <span className="text-customLightBlue">=</span>
            <span className="text-customYellow">20%</span>
          </p>
          <p className="knowledge-type text-white">
            <span className="text-customGreen">Decision Making </span>
            <span className="text-customOrange">Uncommon</span>
            <span className="text-customLightBlue">=</span>
            <span className="text-customYellow">20%</span>
          </p>
          <p className="knowledge-type text-white">
            <span className="text-customGreen">Problem-Solving </span>
            <span className="text-customOrange">Rare</span>
            <span className="text-customLightBlue">=</span>
            <span className="text-customYellow">10%</span>
          </p>
          <p className="knowledge-type text-white">
            <span className="text-customGreen">Emotion Recognition </span>
            <span className="text-customOrange">Rare</span>
            <span className="text-customLightBlue">=</span>
            <span className="text-customYellow">10%</span>
          </p>
          <p className="knowledge-type text-white">
            <span className="text-customGreen">Creativity </span>
            <span className="text-customOrange">Very Rare</span>
            <span className="text-customLightBlue">=</span>
            <span className="text-customYellow">5%</span>
          </p>
          <p className="knowledge-type text-white">
            <span className="text-customGreen">Adaptive Learning </span>
            <span className="text-customOrange">Very Rare</span>
            <span className="text-customLightBlue">=</span>
            <span className="text-customYellow">5%</span>
          </p>
          <p className="knowledge-type text-white">
            <span className="text-customGreen">Strategy </span>
            <span className="text-customOrange">Legendary</span>
            <span className="text-customLightBlue">=</span>
            <span className="text-customYellow">1%</span>
          </p>
          <p className="knowledge-type-red text-white">
            <span className="text-customRed">Noise </span>
            <span className="text-customOrange">?</span>
            <span className="text-customLightBlue">=</span>
            <span className="text-customYellow">?</span>
          </p>
        </div>

        <h1 className="text-customRed text-xl mb-2 mt-8">NOISE</h1>
        <p className="text-m mb-8">
          Irrelevant information in the training data. When you absorb noise you
          loose knowledge.
        </p>

        <h1 className="text-customLightBlue text-xl mb-2">DATASET HEALTH</h1>
        <p className="text-m mb-8">
          While the Dataset is getting trained on by different models each byte
          progressively deteriorates, until the Dataset gets refreshed.
        </p>

        <h1 className="text-customLightBlue text-xl mb-4">
          BYTES HEALTH STATUS
        </h1>
        <div className="space-y-2">
          <p className="knowledge-type text-white">
            Pristine<span className="text-customLightBlue">=</span>
            <span className="text-customYellow">100%</span>
          </p>
          <p className="knowledge-type-blue2 text-white">
            Optimal<span className="text-customLightBlue">=</span>
            <span className="text-customYellow">50%</span>
          </p>
          <p className="knowledge-type-blue3 text-white">
            Diminished<span className="text-customLightBlue">=</span>
            <span className="text-customYellow">25%</span>
          </p>
          <p className="knowledge-type-blue4 text-white">
            Compromised<span className="text-customLightBlue">=</span>
            <span className="text-customYellow">12.5%</span>
          </p>
          <p className="knowledge-type-blue5 text-white">
            Degraded<span className="text-customLightBlue">=</span>
            <span className="text-customYellow">6.25%</span>
          </p>
          <p className="knowledge-type-blue6 text-white">
            Corrupted<span className="text-customLightBlue">=</span>
            <span className="text-customYellow">3.125%</span>
          </p>
        </div>

        <h1 className="text-white text-xl mt-8">DISTRIBUTE</h1>
        <div className="mt-2 mb-8 border-b border-customDarkBlue"></div>

        <h1 className="text-customLightBlue text-xl mb-2">SHARING IS CARING</h1>
        <p className="text-m mb-8">
          You can distribute any byte on Warpcast. By default both you and the
          model that interacts with your frame gain knowledge. The knowledge
          acquired is relative to the source experience, byte rarity and health.
        </p>

        <h1 className="text-customRed text-xl mb-2">INJECT NOISE</h1>
        <p className="text-m mb-8">
          When noise is injected the interacting model looses knowledge while
          your model stay neutral.
        </p>

        <h1 className="text-customLightBlue text-xl mb-2">
          INTERACTION MECHANICS
        </h1>
        <p className="text-m">
          Before the data is downloaded the content is hidden. The interacting
          model can change the outcome:
        </p>
        <div className="bg-customDark text-white p-5">
          <ul className="list-none space-y-2">
            <li>
              <span className="text-customLightBlue">A) </span>
              <span>Like</span> <span className="text-customLightBlue">=</span>{" "}
              force push to main and double the effect;
            </li>
            <li>
              <span className="text-customLightBlue">B) </span>
              <span>Recast</span>{" "}
              <span className="text-customLightBlue">=</span> your model
              transmits the same data;
            </li>
            <li>
              <span className="text-customLightBlue">C) </span>
              <span>Mutual Follow</span>{" "}
              <span className="text-customLightBlue">=</span> content is
              revealed;
            </li>
          </ul>
        </div>

        <div className="bg-customMediumBlue border border-customLightBlue rounded-lg p-4 text-white">
          <p>
            After performing an action don't forget to hit{" "}
            <span className="font-bold text-customYellow">REFRESH</span> for the
            changes to apply.
          </p>
        </div>

        <h1 className="text-customLightBlue text-xl mb-2 mt-8">
          DOWNLOAD DATA
        </h1>
        <p className="text-m">
          Before the data is downloaded the content is hidden. The interacting
          model can change the outcome:
        </p>
        <div className="bg-customDark text-white p-5">
          <ul className="list-none space-y-2">
            <li>
              <span className="text-customLightBlue">A) </span>
              <span className="text-customGreen">Knowledge</span>{" "}
              <span className="text-customLightBlue">=</span> data is rich and
              your model upgrades;
            </li>
            <li>
              <span className="text-customLightBlue">B) </span>
              <span className="text-customRed">Noise</span>{" "}
              <span className="text-customLightBlue">=</span> data is corrupted
              and your model downgrades;
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
