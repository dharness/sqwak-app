import app from "./../app";
import request from "supertest";
import prisma from "./../utils/prisma";
import _ from "lodash";
import {
  createTrack,
  createUser,
  getimgData,
  makeRawFrames,
} from "../../test-fixtures/utils";
import { Prisma } from "@prisma/client";
import { deleteImageBulk, getAllImages } from "../utils/imageStorage";
import exp from "constants";
import { saveFrames } from "./trackHelper";

let accessToken: string;
let userId: string;
const countImages = async () => (await getAllImages()).length;
const isBase64 = (str: string) =>
  Buffer.from(str, "base64").toString("base64") === str;

beforeAll(async () => {
  const user = await createUser();
  accessToken = user.accessToken;
  userId = user.userId;
});

afterAll(async () => {
  await prisma.$disconnect();

  // clear any existing images
  const imgUrls = await getAllImages();
  await deleteImageBulk(imgUrls);
});

beforeEach(async () => {
  // clear any existing tracks
  await prisma.track.deleteMany({});

  // clear any existing images
  const imgUrls = await getAllImages();
  await deleteImageBulk(imgUrls);
});

test("Create empty track", async () => {
  const response = await request(app)
    .post("/api/track")
    .set("Authorization", "Bearer " + accessToken)
    .expect(200);

  const track = await prisma.track.findFirst();
  expect(track).not.toBeNull();
  expect(track.id).toEqual(response.body.id);
});

test("Get all tracks", async () => {
  const rawFrames = await makeRawFrames(5);
  const frames = await saveFrames(rawFrames);
  const { id } = await createTrack(userId, frames);

  const response = await request(app)
    .get(`/api/track`)
    .set("Authorization", "Bearer " + accessToken);

  expect(response.status).toEqual(200);
  expect(response.body.length).toEqual(1);
  const [track] = response.body;

  expect(track.frames.length).toEqual(5);
  track.frames.forEach((frame) => {
    expect(isBase64(frame.imgData)).toEqual(true);
  });
});

test("Get a track", async () => {
  const rawFrames = await makeRawFrames(5);
  const frames = await saveFrames(rawFrames);
  const { id } = await createTrack(userId, frames);

  const response = await request(app)
    .get(`/api/track/${id}`)
    .set("Authorization", "Bearer " + accessToken);

  expect(response.status).toEqual(200);
  expect(response.body.id).toEqual(id);
  expect(response.body.frames.length).toEqual(5);
  response.body.frames.forEach((frame) => {
    expect(isBase64(frame.imgData)).toEqual(true);
  });
});

test("Create a track with frames", async () => {
  const frames = await makeRawFrames(5);
  const body = { frames };

  const response = await request(app)
    .post("/api/track")
    .set("Authorization", "Bearer " + accessToken)
    .send(body);
  expect(response.status).toEqual(200);
  const track = await prisma.track.findFirst();
  expect(track.frames.length).toEqual(5);
});

test("Update a track", async () => {
  const initialDuration = 2;
  const rawFrames = await makeRawFrames(5, initialDuration);
  const frames = await saveFrames(rawFrames);
  const { id } = await createTrack(userId, frames);

  // Confirm our images are saved
  expect(await countImages()).toEqual(5);

  const updatedDuration = 3;
  const updatedRawFrames = await makeRawFrames(3, updatedDuration);

  const body = { frames: updatedRawFrames };
  const response = await request(app)
    .put(`/api/track/${id}`)
    .set("Authorization", "Bearer " + accessToken)
    .send(body);

  expect(response.status).toEqual(200);
  const track = await prisma.track.findUnique({ where: { id } });
  expect(track.frames.length).toEqual(3);
  track.frames.forEach((frame: Prisma.JsonObject) =>
    expect(frame.duration).toEqual(updatedDuration)
  );

  // Confirm old images are deleted, and new images are saved
  expect(await countImages()).toEqual(3);
});
