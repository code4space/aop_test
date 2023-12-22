const Job = require('../models/job');
const knex = require('../config').knexInstance;

class JobService {
    constructor() {
        this.knex = knex;
        this.Job = Job.bindKnex(this.knex);
    }

    async getJobList(description, location, fullTime, page = 1, limit = 10) {
        try {
            const query = this.Job.query();

            if (description) {
                query.andWhere(function () {
                    this.where('title', 'ilike', `%${description}%`)
                        .orWhere('description', 'ilike', `%${description}%`);
                });
            }

            if (location) {
                query.andWhere('location', 'ilike', `%${location}%`);
            }

            if (fullTime === 'true') {
                query.andWhere('type', 'full-time');
            }

            const totalCount = await query.resultSize();
            const totalPages = Math.ceil(totalCount / limit);
            const offset = (page - 1) * limit;

            const jobs = await query
                .offset(offset)
                .limit(limit);

            return { jobs, totalPages, page: +page };
        } catch (error) {
            console.error('Error fetching job list:', error);
            throw error;
        }
    }

    async getJobDetail(id) {
        try {
            const job = await this.Job.query().findById(id);
            return job;
        } catch (error) {
            console.error('Error fetching job detail:', error);
            throw error;
        }
    }

}

module.exports = new JobService();
