import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
});

export async function POST(request: Request) {  //handling post requests
  const body = await request.json();            // read JSON sent by frontend

  const { email, filename, contentType } = body; 

  // validation of fields

  if (!email || !filename || !contentType) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const jobId = crypto.randomUUID();          //generates unique job id
  const s3Key = `raw/${jobId}/${filename}`;     // future S3 object path

  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: s3Key,
    ContentType: contentType,
   });

   const uploadUrl = await getSignedUrl(s3, command, {
    expiresIn: 60,
   });

  
  return NextResponse.json({
    jobId,
    uploadUrl,
    s3Key,
  });
}