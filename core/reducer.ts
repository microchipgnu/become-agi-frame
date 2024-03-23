import { FrameReducer } from "frames.js/next/server";
import { State } from "./types";

export const initialState = { active: "1", total_button_presses: 0 };

export const reducer: FrameReducer<State> = (state, action) => {
  return {
    total_button_presses: state.total_button_presses + 1,
    active: action.postBody?.untrustedData.buttonIndex
      ? String(action.postBody?.untrustedData.buttonIndex)
      : "1",
  };
};