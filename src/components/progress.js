import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { GET_PROGRESS } from "../GraphQL/Queries";

function Progress() {
  const { error, loading, data } = useQuery(GET_PROGRESS);
  const [steps, setSteps] = useState([]);
  useEffect(() => {
    if (data) {
      setSteps(data.getProgress);
    }
  }, [data]);
  return (
    <div>
      {steps.map((step) => {
        return <h3>{step.title}</h3>;
      })}
    </div>
  );
}
export default Progress;
