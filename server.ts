import * as express from "express";
import * as next from "next";
import * as proxy from "http-proxy-middleware";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(
        proxy('/api/timepad/', {
            changeOrigin: true,
            target: 'https://api.timepad.ru/',
            pathRewrite: {
                '^/api/timepad/': '/'
            }
        })
    );

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
