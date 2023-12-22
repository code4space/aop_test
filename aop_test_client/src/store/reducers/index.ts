import { combineReducers } from 'redux';
import { jobDetailsReducer, jobsReducer } from './jobReducer';

const rootReducer = combineReducers({
    jobs: jobsReducer,
    jobDetails: jobDetailsReducer,
});

export default rootReducer