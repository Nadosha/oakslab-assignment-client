import { gql } from "@apollo/client";

export const GET_PROGRESS = gql`
  query {
    getProgress {
      id
      isCompleted
      title
      toDo {
        id
        title
        completed
      }
    }
  }
`;
