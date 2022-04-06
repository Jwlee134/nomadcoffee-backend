import { CoffeeShopPhoto } from "@prisma/client";
import AWS, { S3 } from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

const Bucket = "nomadcoffee-jw";

export const uploadPhotoToS3 = async (file: any, folder?: string) => {
  const { createReadStream, filename } = await file;
  const { Location } = await new AWS.S3()
    .upload({
      Body: createReadStream(),
      Bucket,
      Key: `${folder}/${Date.now()}-${filename}`,
      ACL: "public-read",
    })
    .promise();
  return Location;
};

export const uploadMultiplePhotosToS3 = async (
  files: any[],
  folder?: string
) => {
  if (!files.length) return [];
  const urls: string[] = await Promise.all(
    files?.map(async (data: any) => {
      const url = await uploadPhotoToS3(data, folder);
      return url;
    })
  );
  return urls;
};

export const deletePhotoFromS3 = (photo: CoffeeShopPhoto, folder?: string) => {
  const Key = `${folder}/${photo.url.split("/").slice(-1).join("")}`;
  new AWS.S3().deleteObject({ Bucket, Key }, (err, data) => {
    console.log(err, data);
  });
};
