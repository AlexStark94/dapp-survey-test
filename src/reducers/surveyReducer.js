import { produce } from "immer";
import { UPLOAD_JSON, DELETE_JSON, SET_ANSWERS, SET_CONTRACT } from "../actions/quizActions";

const initialState = {
  survey: null,
  answers: null,
  contract: null
};

const surveyReducer = (state = initialState, action) => {
  switch (action?.type) {
    case UPLOAD_JSON: {
      return produce(state, (draft) => {
        draft.survey = action?.payload;
      });
    }
    case SET_ANSWERS: {
      return produce(state, (draft) => {
        draft.answers = action?.payload;
      });
    }
    case SET_CONTRACT: {
      return produce(state, (draft) => {
        draft.contract = action?.payload;
      });
    }
    case DELETE_JSON: {
      return produce(state, (draft) => {
        draft.survey = undefined;
      });
    }
    default: {
      return state;
    }
  }
};

export default surveyReducer;
