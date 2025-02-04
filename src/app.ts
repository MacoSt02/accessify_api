import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import loggerKoa from 'koa-logger';
import cors from 'koa2-cors';
import mount from 'koa-mount';
import auth from 'koa-basic-auth';
import 'dotenv/config';

import { usersRoutes } from './endpoints/users/users.routes';

import { responseHandler } from './middlewares/response';

// init
const app = new koa();

// middlewares
app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN,
        credentials: true,
    }),
);

app.use(loggerKoa());
app.use(bodyparser());
app.use(
    mount(
        '/health',
        auth({
            name: 'user',
            pass: 'password',
        }),
    ),
);
app.use(responseHandler);

// Load routes
usersRoutes(app);

export default app;