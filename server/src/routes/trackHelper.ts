import { Frame, RawFrame } from "../types/custom";
import _ from "lodash";
import { getImageData, saveImageBulk } from "../utils/imageStorage";

/**
 * Save the frames to s3 and return the urls
 * @param rawFrames - frames with image data
 * @returns frames with image urls
 */
export async function saveFrames(rawFrames: RawFrame[]) {
  const allimgData = rawFrames.map((frame) => frame.imgData);
  const imgUrls = await saveImageBulk(allimgData);
  const framesWithUrls = rawFrames.map((frame, i) => {
    const nextFrame: Frame = _.omit(frame, "imgData");
    nextFrame.imgUrl = imgUrls[i]?.url;
    return nextFrame;
  });
  return framesWithUrls;
}

/**
 * Format a track for sending to the client
 */
export async function formatTrack(track) {
  await loadImageDataForTrack(track);
  track.frames = track.frames.map((frame) => _.omit(frame, "imgUrl"));
}

/**
 * Adds the base64 image data to each frame
 */
export async function loadImageDataForTrack(track) {
  const results = track.frames.map(async (frame) => {
    const imgData = await getImageData(frame.imgUrl);
    frame.imgData = imgData;
  });

  await Promise.all(results);
}
