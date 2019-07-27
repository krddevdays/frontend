import express from 'express';
import next from 'next';
import sentry from './sentry';
import cookieParser from 'cookie-parser';
import uuidv4 from 'uuid/v4';

const port = parseInt(process.env.PORT as string, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();

const sessionCookie: express.RequestHandler = function(req, res, next) {
    const htmlPage =
        !req.path.match(/^\/(_next|static)/) &&
        !req.path.match(/\.(js|map)$/) &&
        req.accepts('text/html', 'text/css', 'image/png') === 'text/html';

    if (!htmlPage) {
        next();
        return;
    }

    if (!req.cookies.sid || req.cookies.sid.length === 0) {
        req.cookies.sid = uuidv4();
        res.cookie('sid', req.cookies.sid);
    }

    next();
};

const sourcemapsForSentryOnly: (token: string | undefined) => express.RequestHandler = token => (req, res, next) => {
    if (!dev && !!token && req.headers['x-sentry-token'] !== token) {
        res.status(401).send('Authentication access token is required to access the source map.');
        return;
    }
    next();
};

app.prepare().then(() => {
    const { Sentry } = sentry(app.buildId);

    express()
        .use(Sentry.Handlers.requestHandler())
        .use(cookieParser())
        .use(sessionCookie)
        .use(express.static('static'))
        .get(/\.map$/, sourcemapsForSentryOnly(process.env.SENTRY_TOKEN))
        // @ts-ignore
        .use(handler)
        .use(Sentry.Handlers.errorHandler())
        // @ts-ignore
        .listen(port, err => {
            if (err) {
                throw err;
            }
            console.log(`> Ready on http://localhost:${port}`);
        });
});
