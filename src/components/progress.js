import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROGRESS } from "../GraphQL/Queries";
import styles from "./progress.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import {UPDATE_PROGRESS_MUTATION} from '../GraphQL/Mutations';
import axios from "axios";


function Progress() {
  const { data } = useQuery(GET_PROGRESS);
  const [steps, setSteps] = useState([]);
  const [isProgressCompleted, setProgressCompleted] = useState(false);
  const [randomText, setRandomText] = useState('');
  const [updateProgress] = useMutation(UPDATE_PROGRESS_MUTATION, {
    refetchQueries: [{query: GET_PROGRESS}],
    awaitRefetchQueries: true,
  });

  const handleChange = evt => {
    const todoId = evt.target.name;
    const stepId = evt.target.dataset.step;
    const value =
        evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;

    updateProgress({
      variables: {
        step: {
          todoId: todoId,
          stepId:  stepId,
          value: value
        }
      }
    }).catch((err) => console.log(err));
  }

  useEffect(async () => {
    if (data) {
      setSteps(data.getProgress);
      const progressCompleted = data.getProgress.every((val) => val.isCompleted === true);
        setProgressCompleted(progressCompleted);
        if(progressCompleted) {
          const result = await axios(
              'https://uselessfacts.jsph.pl/random.json',
          );
          setRandomText(result.data.text)
        }
    }
  }, [data]);

  if (isProgressCompleted) {
    // When all phases are completed, display a random fact from 'https://uselessfacts.jsph.pl/random.json'
    return <article><h1> Congratulation! </h1><br/><p>{randomText}</p></article>
  }

  return (
    <main>
      <form>
        <h3 className={styles.title}>My startup progress</h3>
      {steps.map((step, index) => {
        return (
            <fieldset key={step.id} >
              <div className={styles.inlineBlock}>
                <div className={styles.number}>
                  <p>{index + 1}</p>
                </div>
                <h3 className={styles.title}>{step.title}</h3>
                {step.isCompleted && <div className={styles.completedIcon}><FontAwesomeIcon icon={faCheck} size="2x" /></div>}
              </div>
              {step?.toDo.map((todo) => {
                return (
                    <label key={todo.id}>
                      <input name={todo.id} data-step={step.id} type="checkbox"  onChange={handleChange} checked={todo.completed && "checked"}/>
                      {todo.title}
                    </label>)
              })}
            </fieldset>);
      })}
      </form>
    </main>
  );
}

export default Progress;
