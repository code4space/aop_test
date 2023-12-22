import { FETCH_JOBS_SUCCESS, FETCH_JOB_DETAILS_SUCCESS } from '../actions/ActionType';

export interface Job {
    id: string;
    title: string;
    description: string;
    type: string;
    how_to_apply: string;
    company_url: string;
    company_logo: string;
    location: string;
    created_at: string;
    updated_at: string | null;
}

export interface JobsState {
    jobs: Job[];
    totalPages: number;
    page: number;
}

interface FetchJobsSuccessAction {
    type: typeof FETCH_JOBS_SUCCESS;
    payload: JobsState;
}

interface FetchJobDetailsSuccessAction {
    type: typeof FETCH_JOB_DETAILS_SUCCESS;
    payload: Job;
}

export type JobsAction = FetchJobsSuccessAction | FetchJobDetailsSuccessAction;

const initialJobsState: JobsState = {
    jobs: [],
    totalPages: 0,
    page: 1,
};

const initialDetailJobsState: Job = {
    id: '',
    title: '',
    description: '',
    type: '',
    how_to_apply: '',
    company_url: '',
    company_logo: '',
    location: '',
    created_at: '',
    updated_at: null
}

export const jobsReducer = (state = initialJobsState, action: JobsAction) => {
    switch (action.type) {
        case FETCH_JOBS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

export const jobDetailsReducer = (state = initialDetailJobsState, action: JobsAction) => {
    switch (action.type) {
        case FETCH_JOB_DETAILS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};