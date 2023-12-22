/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');

exports.seed = async function (knex) {
  const jobs = [];

  for (let i = 0; i < 100; i++) {
    const type = ['full-time', 'part-time', 'contract']
    const random = Math.floor(Math.random() * type.length)
    jobs.push({
      id: uuidv4(),
      title: faker.person.jobTitle(),
      description: faker.lorem.sentence(),
      type: type[random],
      how_to_apply: faker.lorem.sentence(),
      company_url: faker.internet.url(),
      company_logo: faker.image.avatarGitHub(),
      location: faker.location.city(),
    });
  }

  await knex('jobs').del()
  await knex('jobs').insert(jobs);
};
