import {
  DeleteObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  ListObjectsCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { s3Client, region } from "./S3";
import { v4 as uuidv4 } from "uuid";
import AmazonS3URI from "amazon-s3-uri";

const BUCKET_NAME =
  process.env.NODE_ENV === "test" ? "animatic-frames-test" : "animatic-frames";

const fileUrl = (bucket, key) => {
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};

async function getImageData(imgUrl: string) {
  const { region, bucket, key } = AmazonS3URI(imgUrl);
  const params = {
    Bucket: bucket,
    Key: key,
  };
  try {
    const response = await s3Client.send(new GetObjectCommand(params));
    const str = await response.Body.transformToString("base64");
    return str;
  } catch (err) {
    console.error("Error", err);
  }
}

async function getAllImages() {
  const params = {
    Bucket: BUCKET_NAME,
  };
  try {
    const response = await s3Client.send(new ListObjectsCommand(params));
    const imgUrls = (response.Contents || []).map(({ Key }) =>
      fileUrl(BUCKET_NAME, Key)
    );
    return imgUrls;
  } catch (err) {
    console.error("Error", err);
  }
}

async function saveImageBulk(base64Bulk: string[]) {
  return Promise.all(base64Bulk.map(saveImage));
}

async function saveImage(base64: string) {
  const imageName = `${uuidv4()}.png`;
  const base64Buffer = Buffer.from(base64, "base64");
  var params = {
    Bucket: BUCKET_NAME,
    Key: imageName,
    Body: base64Buffer,
    ContentEncoding: "base64",
    ContentType: "image/png",
  };

  try {
    const response = await s3Client.send(new PutObjectCommand(params));
    if (response.$metadata.httpStatusCode !== 200) {
      throw new Error("Failed to store image");
    }
    return { url: fileUrl(BUCKET_NAME, imageName) };
  } catch (err) {
    console.error("Error", err);
  }
}

async function deleteImageBulk(imgUrls: string[]) {
  if (imgUrls.length === 0) return;

  const Objects = imgUrls.map((url) => {
    const key = url.split("/").pop();
    return { Key: key };
  });

  const command = new DeleteObjectsCommand({
    Bucket: BUCKET_NAME,
    Delete: { Objects },
  });

  try {
    const { Deleted } = await s3Client.send(command);
    return Deleted;
  } catch (err) {
    console.error(err);
  }
}

export {
  saveImage,
  saveImageBulk,
  deleteImageBulk,
  getAllImages,
  getImageData,
};
