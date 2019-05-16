import * as express from 'express';
import * as next from 'next';
import sentry from './sentry';
import * as cookieParser from 'cookie-parser';
import * as uuidv4 from 'uuid/v4';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

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

    const server = express();

    server.use(Sentry.Handlers.requestHandler());

    server.use(cookieParser()).use(sessionCookie);

    server.get(/\.map$/, sourcemapsForSentryOnly(process.env.SENTRY_TOKEN));

    server.use(express.static('static'));

    server.get('/events/:id', (req, res) => {
        return app.render(req, res, '/events/event', { id: req.params.id });
    });

    server.get('/events/:id/order', (req, res) => {
        return app.render(req, res, '/events/order', { id: req.params.id });
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.use(Sentry.Handlers.errorHandler());

    server.listen(port, (err: Error) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
