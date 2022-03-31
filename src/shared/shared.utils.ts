import AWS from "aws-sdk";

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
