import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Card, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

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
    console.log(survey);
  }, []);

  useEffect(() => {
    if (question >= survey?.questions.length) {
      console.log(answers);
      dispatch(setAnswersAction(answers));
      history.push("/submit-survey");
    }
  }, [question]);

  const selectOptions = (answerId: number) => {
    console.log(answerId);
    const answersCopy: Array<number> = [...answers];
    answersCopy.push(answerId);
    setAnswers(answersCopy);

    toast.success(`${survey?.questions[question]?.text} answered`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    if (question < survey?.questions.length) {
      return setQuestion(question + 1);
    }
  };

  return (
    <Card className="card-survey-container">
      <Row className="row-survey-container-title" gutter={16}>
        <img className="img-container" src={survey?.image} />
        <h1 className="h1-survey-title">{survey?.title}</h1>
      </Row>
      <Row className="row-survey-container-question" gutter={32}>
        <Col className="col-image-container gutter-row" span={8}>
          <img
            className="img-container-question img-format"
            src={survey?.questions[question]?.image}
          />
        </Col>
        <Col span={16} className="col-questions-container gutter-row">
          <h2 className="h2-survey-title">
            {survey?.questions[question]?.text}
          </h2>
          {survey?.questions[question]?.options.map(
            (option: any, index: number) => (
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
