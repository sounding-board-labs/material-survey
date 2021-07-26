// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"

import RatingQuestion from "./"

storiesOf("RatingQuestion", module).add("Basic", () => (
  <RatingQuestion
    question={{
      name: "rating-example",
      title: "How important is a college's reputation?",
      type: "rating",
      minRateDescription: "Least Important",
      midRateDescription: "Important",
      maxRateDescription: "Most Important"
    }}
    onChangeAnswer={action("onChangeAnswer")}
  />
))

storiesOf("RatingQuestion", module).add("Custom Ratings", () => (
  <RatingQuestion
    question={{
      name: "rating-example-custom",
      title: "How important is a college's reputation?",
      type: "rating",
      rateValues: [
        { value: 1, text: 'Not important' },
        { value: 2, text: 'Important' },
        { value: 3, text: 'Very important' },
      ]
    }}
    onChangeAnswer={action("onChangeAnswer")}
  />
))
