import {
    NextServerPageProps,
    getFrameMessage,
    getPreviousFrame,
    useFramesReducer
} from "frames.js/next/server";
import ShareCover from "../../../core/components/screens/share/cover";
import Share from "../../../core/components/screens/share/share";
import { initialState, reducer } from "../../../core/reducer";
import { State } from "../../../core/types";
import { DEFAULT_DEBUGGER_HUB_URL } from "../../debug";


export default async function Home({ searchParams }: NextServerPageProps) {
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
        return <ShareCover state={state} previousFrame={previousFrame} />
    }


    return (
        <div className="p-4">
            <Share state={state} previousFrame={previousFrame} />
        </div>
    );
}
