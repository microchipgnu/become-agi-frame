import {
  FrameReducer,
  NextServerPageProps,
  getFrameMessage,
  getPreviousFrame,
  useFramesReducer
} from "frames.js/next/server";
import Cover from "../core/components/screens/cover";
import Train from "../core/components/screens/train";
import { State } from "../core/types";
import { DEFAULT_DEBUGGER_HUB_URL } from "./debug";
import { currentURL } from "./utils";
import { reducer, initialState } from "../core/reducer";


export default async function Home({ searchParams }: NextServerPageProps) {
  const url = currentURL("/");
  const previousFrame = getPreviousFrame<State>(searchParams);

  const frameMessage = await getFrameMessage(previousFrame.postBody, {
    hubHttpUrl: process.env.NEXT_PUBLIC_HOST?.startsWith("http://localhost:3000") ? DEFAULT_DEBUGGER_HUB_URL : "https://hub.pinata.cloud",
  });

  if (frameMessage && !frameMessage?.isValid) {
    throw new Error("Invalid frame payload");
  }

  const [state, dispatch] = useFramesReducer<State>(
    reducer,
    initialState,
    previousFrame
  );

  if (!frameMessage) {
    return <Cover state={state} previousFrame={previousFrame} />
  }


  return (
    <div className="p-4">
      <Train state={state} previousFrame={previousFrame} />
    </div>
  );
}
