const jobService = require('../services/jobService');

async function getJobList(ctx) {
    const { description, location, 'full-time': fullTime, page } = ctx.query;
    const jobs = await jobService.getJobList(description, location, fullTime, page);
    ctx.body = jobs;
}

async function getJobDetail(ctx) {
    const { id } = ctx.params;
    const job = await jobService.getJobDetail(id);
    ctx.body = job;
}

module.exports = {
    getJobList,
    getJobDetail,
};