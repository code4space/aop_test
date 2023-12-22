const { verifyToken } = require("../helper/jwt");
const publicRoutes = ['/api/users/login', '/api/users/register', '/'];

async function auth(ctx, next) {
    if (publicRoutes.includes(ctx.path)) {
        await next();
        return;
    }

    try {
        const error = () => {
            ctx.status = 401
            throw new Error('Invalid Token')
        }

        const accessToken = ctx.headers.access_token;
        if (!accessToken) error()

        let payload = verifyToken(accessToken);
        if (!payload) error()

        ctx.state.user = { id: payload.id };
        await next();
    } catch (error) {
        throw error;
    }
}

module.exports = auth;
