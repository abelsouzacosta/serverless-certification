import { DynamoDB } from 'aws-sdk';
import 'dotenv/config';

const options = {
  region: 'localhost',
  endpoint: `http://localhost:${process.env.DYNAMO_DB_LOCAL_PORT}`,
  accessKeyId: process.env.DYNAMO_DB_LOCAL_ACCESS_KEY_ID,
  secretAccessKey: process.env.DYNAMO_DB_LOCAL_SECRET_ACCESS_KEY,
};

const isOffline = () => {
  return process.env.IS_OFFLINE;
};

export const document = isOffline()
  ? new DynamoDB.DocumentClient(options)
  : new DynamoDB.DocumentClient();
