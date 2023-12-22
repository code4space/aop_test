import { legacy_createStore as createStore, applyMiddleware, StoreEnhancer, Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/index';
import rootSaga from './sagas';
import { Job, JobsAction, JobsState } from './reducers/jobReducer';

export interface RootState {
    jobs: JobsState;
    jobDetails: Job;
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer as (state: RootState | undefined, action: JobsAction) => RootState,
    applyMiddleware(sagaMiddleware as Middleware)
);

sagaMiddleware.run(rootSaga);
export default store;
