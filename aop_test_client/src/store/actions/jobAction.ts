import { FETCH_JOBS_REQUEST, FETCH_JOB_DETAILS_REQUEST } from "./ActionType";

export interface FetchJobsPayload {
    page?: number;
    fulltime?: boolean;
    location?: string;
    description?: string;
    [key: string]: number | boolean | string | undefined;
}

export const fetchJobs = (payload?: FetchJobsPayload) => {
    return { type: FETCH_JOBS_REQUEST, payload };
};

export const fetchJobDetails = (id: string) => ({ type: FETCH_JOB_DETAILS_REQUEST, payload: id });