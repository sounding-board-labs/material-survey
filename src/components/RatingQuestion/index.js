// @flow

import type { RatingQuestion } from "../../material-survey-format.js.flow"
import React, { useCallback, useMemo } from "react"
import QuestionContainer from "../QuestionContainer"
import styled from "styled-components"
import QuestionText from "../QuestionText"
import Slider from "@material-ui/core/Slider"
import useQuestionAnswer from "../../hooks/use-question-answer"

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
`

type RateValue = {
  value: string;
  text: string;
}

export default ({
  question,
  onChangeAnswer
}: {
  question: RatingQuestion,
  onChangeAnswer: Function
}) => {
  const [{ answer, error }, changeAnswer] = useQuestionAnswer(
    question,
    onChangeAnswer,
    question.defaultAnswer || undefined
  )

  const {
    rateValues,
    rankings,
    minRateDescription,
    maxRateDescription,
    midRateDescription
  } = question

  const getRateValue = (rate: RateValue | string | number) => {
    if (typeof rate === "string" || typeof rate === "number") {
      return rate;
    }
    return rate.value;
  }

  const marks = useMemo(() => {
    return (rateValues || []).map((rate: RateValue | string | number) => {
      if (typeof rate === "string" || typeof rate === "number") {
        return {
          value: rate,
          label: rate,
        }
      }
      return {
        value: rate.value,
        label: rate.text,
      }
    })
  }, [rateValues]);

  const min = rateValues ? getRateValue(rateValues[0]) : 0
  const max = rateValues ? getRateValue(rateValues[rateValues.length - 1]) : 4

  return (
    <QuestionContainer
      question={question}
      answered={answer !== undefined}
      error={error}
    >
      <Slider
        onChange={(e, value) => changeAnswer(value)}
        style={{ opacity: answer === undefined ? 0.5 : 1, marginTop: 10 }}
        value={
          answer === undefined
            ? rateValues
              ? getRateValue(rateValues[Math.floor(rateValues.length / 2)])
              : 2
            : answer
        }
        min={min}
        marks={true || marks}
        max={max}
        step={1}
        id={question.id?question.id+"Slider":""}
      />
      {rateValues ? (
        <Row>
          {marks.map(rate => (
            <QuestionText key={rate.value}>{rate.label}</QuestionText>
          ))}
        </Row>
      ) : (
        <Row>
          <QuestionText>{minRateDescription}</QuestionText>
          {midRateDescription && (
            <QuestionText>{midRateDescription}</QuestionText>
          )}
          <QuestionText>{maxRateDescription}</QuestionText>
        </Row>
      )}
    </QuestionContainer>
  )
}
