import { redirect } from "frames.js/core";
import { createFrames } from "frames.js/next";

const frames = createFrames();

const handleRequest = frames(async (ctx) => {
  // if is share url
  return redirect("/share/1");

  // if is game url
  //  return redirect("/game/id");
});

export const GET = handleRequest;
export const POST = handleRequest;
