//import { APIGatewayProxyHandler } from "aws-lambda";

import { document } from "../utils/DynamoDBClient";

export const handle = async (event) => {
    const { user_id } = event.pathParameters;

    const response = await document
        .query({
            TableName: "users_todos",
            KeyConditionExpression: "user_id = :user_id",
            ExpressionAttributeValues: {
                ":user_id": user_id,
            },
        })
        .promise();

    console.log(response);

    const userTodos = response.Items;

    if (userTodos) {
        return {
            statusCode: 200,
            body: JSON.stringify({
              userTodos
            }),
        };
    }

    return {
        statusCode: 400,
        body: JSON.stringify({
            message: "Certificado inválido!",
        }),
    };
};
