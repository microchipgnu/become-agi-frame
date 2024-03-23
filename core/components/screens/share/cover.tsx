import {
  FrameButton,
  FrameContainer,
  FrameImage,
  PreviousFrame,
} from "frames.js/next/server";
import { State } from "../../../types";

const ShareCover = ({
  state,
  previousFrame,
}: {
  state: State;
  previousFrame: PreviousFrame<State>;
}) => {
  return (
    <div className="p-4">
      <FrameContainer
        postUrl="/frames"
        pathname="/share/asdasd"
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage aspectRatio="1:1">
          <p className="text-3xl text-center">Share Cover</p>
        </FrameImage>
        <FrameButton>Download Data</FrameButton>
      </FrameContainer>
    </div>
  );
};

export default ShareCover;
