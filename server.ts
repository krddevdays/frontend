import * as express from 'express';
import * as next from 'next';
import events from './api/events';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

function errorHandler(error: Error, _: express.Request, res: express.Response, __: express.NextFunction) {
    res.status(500).send(error.message);
}

app.prepare().then(() => {
    const server = express();

    server.use('/api/events', events).use(errorHandler);

    server.get('/events/:id', (req, res) => {
        return app.render(req, res, '/events/event', { id: req.params.id });
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, (err: Error) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
