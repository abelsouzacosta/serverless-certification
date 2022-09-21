import { APIGatewayProxyHandler } from 'aws-lambda';
import { TableNames } from 'src/utils/TableNames.enum';
import { document } from '../utils/dynamodbclient';

interface ICreateCertificate {
  id: string;
  name: string;
  grade: string;
}

export const handler: APIGatewayProxyHandler = async event => {
  const { id, name, grade } = JSON.parse(event.body) as ICreateCertificate;

  await document
    .put({
      TableName: TableNames.USERS_CERTIFICATE,
      Item: {
        id,
        name,
        grade,
        created_at: new Date().getTime(),
      },
    })
    .promise();

  const response = await document
    .query({
      TableName: TableNames.USERS_CERTIFICATE,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': id,
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify(response.Items[0]),
  };
};
