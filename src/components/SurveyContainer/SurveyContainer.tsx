import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Card, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { IOption } from "../../interfaces/global";

// Actions
import { setAnswers as setAnswersAction } from "../../actions/quizActions";

// Styles
import "./SurveyContainer.css";

export default function SurveyContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { survey } = useSelector((state: any) => state.survey);
  const [question, setQuestion] = useState(0);
  const [answers, setAnswers] = useState([] as Array<number>);
  const [lifetimeSeconds, setTimeSeconds] = useState();

  useEffect(() => {
    if (!survey) {
      history.push("/");
    }
  }, []);

  useEffect(() => {
    if (question >= survey?.questions.length) {
      dispatch(setAnswersAction(answers));
      history.push("/submit-survey");
    }
    if (lifetimeSeconds) {
      setTimeout(() => {
        selectOptions(0);
        setTimeSeconds(survey?.questions[question + 1]?.lifetimeSeconds);
      }, survey?.questions[question]?.lifetimeSeconds * 1000);
    }
  }, [question]);

  useEffect(() => {
    if (!lifetimeSeconds) {
      setTimeSeconds(survey?.questions[question]?.lifetimeSeconds)
    }
    if (lifetimeSeconds) {
      setTimeout(() => {
        selectOptions(0);
      }, survey?.questions[question + 1]?.lifetimeSeconds * 1000);
    }
  }, [lifetimeSeconds])

  const selectOptions = (answerId: number) => {
    const answersCopy: Array<number> = [...answers];
    answersCopy.push(answerId);
    setAnswers(answersCopy);
    if (question < survey?.questions.length) {
      setTimeSeconds(survey?.questions[question + 1]?.lifetimeSeconds);
      return setQuestion(question + 1);
    }
  };

  return (
    <Card className="card-survey-container">
      <Row className="row-survey-container-title" gutter={16}>
        <img className="img-container" src={survey?.image} alt="Title Survey" />
        <h1 className="h1-survey-title">{survey?.title}</h1>
      </Row>
      <Row className="row-survey-container-question" gutter={32}>
        <Col className="col-image-container gutter-row" span={8}>
          <img
            className="img-container-question img-format"
            src={survey?.questions[question]?.image}
            alt="Title Question"
          />
        </Col>
        <Col span={16} className="col-questions-container gutter-row">
          <h2 className="h2-survey-title">
            {survey?.questions[question]?.text}
          </h2>
          {survey?.questions[question]?.options.map(
            (option: IOption, index: number) => (
              <Row
                key={index}
                className="row-option"
                onClick={() => selectOptions(index)}
              >
                <p>
                  {index + 1} - {option.text}
                </p>
              </Row>
            )
          )}
        </Col>
      </Row>
    </Card>
  );
}
