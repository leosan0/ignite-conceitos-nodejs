import { document } from "../utils/DynamoDBClient";
import { v4 as uuidv4 } from 'uuid';

interface ICreateTodo {
    id: string;
    user_id: string;
    title: string;
    done: boolean;
    deadline: Date;
}

export const handle = async (event) => {
    const { title, deadline } = JSON.parse(event.body) as ICreateTodo;
    const { user_id } = event.pathParameters;

    const id = uuidv4();

    // const response = await document
    //     .query({
    //         TableName: "users_todos",
    //         KeyConditionExpression: "id = :id",
    //         ExpressionAttributeValues: {
    //             ":id": id,
    //         },
    //     })
    //     .promise();

    // const todoAlreadyExists = await response.Items[0];

    // if (!todoAlreadyExists) {
        await document
            .put({
                TableName: "users_todos",
                Item: {
                    id,
                    user_id,
                    title,
                    done: false,
                    deadline
                },
            })
            .promise();
    
      return {
          statusCode: 201,
          body: JSON.stringify({
              message: "Todo created!",
          }),
          headers: {
              "Content-type": "application/json",
          },
      };
    // }
};
