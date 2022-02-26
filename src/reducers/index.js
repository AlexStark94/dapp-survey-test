import { combineReducers } from 'redux';
import surveyReducer from './surveyReducer';

const rootReducer = combineReducers({
    survey: surveyReducer
});

export default(state, action) => {
    return rootReducer(
        state,
        action
    )
};
