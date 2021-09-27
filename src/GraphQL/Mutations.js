import {gql} from "@apollo/client";

export const UPDATE_PROGRESS_MUTATION = gql`
    mutation updateProgress($step: UpdateStepsInput) {
      updateProgress(step: $step) {
          id
      }
    }
`;