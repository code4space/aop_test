const userService = require('../services/userService');

async function login(ctx) {
    const { username, password } = ctx.request.body;
    const token = await userService.login(username, password);
    ctx.body = { token };
}

async function register(ctx) {
    const { username, password } = ctx.request.body;
    await userService.register(username, password);
    ctx.body = { message: 'Register Success' };
}

module.exports = {
    login,
    register,
};