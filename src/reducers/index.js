import { combineReducers } from 'redux';
import surveyReducer from './surveyReducer';

const rootReducer = combineReducers({
    survey: surveyReducer
});

// eslint-disable-next-line import/no-anonymous-default-export
export default(state, action) => {
    return rootReducer(
        state,
        action
    )
};
