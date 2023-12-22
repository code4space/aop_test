/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require("../helper/bcrypt");

exports.seed = async function (knex) {
  await knex('users').del()
  await knex('users').insert([
    {
      id: uuidv4(),
      username: 'bill',
      password: hashPassword('123456')
    },
    {
      id: uuidv4(),
      username: 'roy',
      password: hashPassword('123456')
    },
    {
      id: uuidv4(),
      username: 'marrie',
      password: hashPassword('123456')
    },
  ]);
};
