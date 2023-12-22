require('dotenv').config();

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const { errorHandler } = require('./middleware/errorHandler');
const auth = require('./middleware/authentication');
const cors = require('@koa/cors');

const app = new Koa();
const PORT = process.env.PORT || 5000;

app.use(errorHandler);
app.use(bodyParser());

app.use(cors());

//* Authentication
app.use(auth);

//* Routes
app.use(userRoutes);
app.use(jobRoutes);
app.use(async (ctx, next) => {
    if (ctx.path === '/') {
        ctx.body = { message: 'Welcome to the AOP Test API!' };
    } else {
        await next();
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
