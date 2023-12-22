const errorHandler = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        ctx.status = ctx.status || 500;
        ctx.body = {
            error: {
                message: error.message || 'Internal Server Error',
            },
        };
    }
}

module.exports = { errorHandler }