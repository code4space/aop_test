import { takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_JOBS_REQUEST, FETCH_JOBS_SUCCESS, FETCH_JOB_DETAILS_REQUEST, FETCH_JOB_DETAILS_SUCCESS } from '../actions/ActionType';
import { BASE_URL } from '@/constant/url';
import { getCookie } from '@/helper/getCookie';
import { FetchJobsPayload } from '../actions/jobAction';

function* fetchJobsSaga(action: { type: string, payload: FetchJobsPayload }): Generator<any, void, any> {
    try {
        let queryString = '';
        if (action.payload) {
            queryString = Object.entries(action.payload)
                .map(([key, value]) => {
                    key = encodeURIComponent(key === 'fulltime' ? 'full-time' : key);
                    value = encodeURIComponent(value?.toString() ?? '');
                    return `${key}=${value}`;
                })
                .join('&');
        }

        console.log(queryString);
        const response = yield call(() => {
            return axios({
                url: `${BASE_URL}/jobs?${queryString}`,
                method: 'GET',
                headers: { access_token: getCookie("access_token") }
            })
        });

        yield put({ type: FETCH_JOBS_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Error fetching jobs:', error);
    }
}

function* fetchJobDetailsSaga(action: { type: string, payload: string }): Generator<any, void, any> {
    try {
        const response = yield call(() => {
            return axios({
                url: `${BASE_URL}/jobs/${action.payload}`,
                method: 'GET',
                headers: { access_token: getCookie("access_token") }
            })
        });
        yield put({ type: FETCH_JOB_DETAILS_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Error fetching job details:', error);
    }
}

export default function* rootSaga(): Generator {
    yield takeLatest(FETCH_JOBS_REQUEST, fetchJobsSaga);
    yield takeEvery(FETCH_JOB_DETAILS_REQUEST, fetchJobDetailsSaga);
}
