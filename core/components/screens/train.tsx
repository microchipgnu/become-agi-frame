import {
    FrameContainer,
    FrameImage,
    PreviousFrame
} from "frames.js/next/server";
import { State } from "../../types";


const Train = ({ state, previousFrame }: {
    state: State, previousFrame: PreviousFrame<State>
}) => {
    return (
        <div className="p-4">
            <FrameContainer postUrl="/frames"
                pathname="/"
                state={state}
                previousFrame={previousFrame}>
                <FrameImage
                    aspectRatio="1:1"
                >
                    <p className="text-3xl text-center">Train</p>
                </FrameImage>
            </FrameContainer>
        </div>
    );
}

export default Train