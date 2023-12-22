const User = require('../models/user');
const knex = require('../config').knexInstance;
const { getToken } = require('../helper/jwt')
const { comparePassword, hashPassword } = require('../helper/bcrypt');
const { v4: uuidv4 } = require('uuid');

class UserService {
    constructor() {
        this.knex = knex;
        this.User = User.bindKnex(this.knex);
    }

    async login(username, password) {
        try {
            if (!username) throw new Error('Username is required!')
            if (!password) throw new Error('Password is required!')

            const user = await this.User.query().findOne({ username });

            if (!user || !comparePassword(password, user.password)) {
                throw new Error('Invalid Username or Password');
            }

            const payload = { id: user.id };
            return getToken(payload);
        } catch (error) {
            console.error('Login Failed:', error);
            throw error;
        }
    }

    async register(username, password) {
        try {
            if (!username) throw new Error('Username is required!')
            if (!password) throw new Error('Password is required!')
            await this.knex.transaction(async (trx) => {
                const existingUser = await this.User.query(trx).findOne({ username });

                if (existingUser) {
                    throw new Error('Username already exists');
                }

                await this.User.query(trx).insert({
                    username,
                    password: hashPassword(password),
                    id: uuidv4(),
                })
            });
        } catch (error) {
            console.error('Register Failed:', error);
            throw error;
        }
    }
}

module.exports = new UserService();