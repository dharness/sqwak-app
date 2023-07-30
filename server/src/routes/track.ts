import express from "express";
import _ from "lodash";
import { requireAuth } from "../middleware/auth";
import prisma from "../utils/prisma";
import { loadTrack } from "../middleware/loaders";
import { validate } from "../middleware/validate";
import { postTrackSchema, putTrackSchema } from "./tackSchemas";
import { deleteImageBulk } from "../utils/imageStorage";
import { formatTrack, saveFrames } from "./trackHelper";

const trackRouter = express.Router();
trackRouter.use(requireAuth);

trackRouter.get("/", async (req, res) => {
  const tracks = await prisma.track.findMany({
    where: { userId: req.user.id },
  });

  if (!tracks) return res.status(404).send("No tracks found");
  await Promise.all(tracks.map(formatTrack));
  res.status(200).send(tracks);
});

trackRouter.get("/:trackId", loadTrack, async (req, res) => {
  await formatTrack(req.track);
  res.status(200).send(req.track);
});

trackRouter.put(
  "/:trackId",
  [validate(putTrackSchema), loadTrack],
  async (req, res) => {
    const rawFrames = req.body.frames || [];

    const nextFrames = (await saveFrames(rawFrames)) as any;
    const data = {
      frames: nextFrames as any,
    };
    const track = await prisma.track.update({
      where: { id: req.track.id },
      data,
    });

    if (!track) return res.status(400).send("Failed to update track");

    // delete the old images from s3
    const oldFrames = req.track.frames;
    await deleteImageBulk(oldFrames.map((frame) => frame.imgUrl));

    await formatTrack(track);
    res.status(200).send(track);
  }
);

trackRouter.post("/", validate(postTrackSchema), async (req, res) => {
  const { id } = req.user;
  const rawFrames = req.body.frames || [];
  const nextFrames = (await saveFrames(rawFrames)) as any;

  const data = {
    userId: id,
    frames: nextFrames,
  };
  const track = await prisma.track.create({ data });

  if (!track) return res.status(400).send("Failed to create track");

  await formatTrack(track);
  res.status(200).send(track);
});

export { trackRouter };
