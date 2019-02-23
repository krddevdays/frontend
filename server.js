const express = require('express');
const next = require('next');
const proxy = require('http-proxy-middleware');
const fs = require('fs');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const localeDataCache = new Map();
const getLocaleDataScript = locale => {
    const lang = locale.split('-')[0];
    if (!localeDataCache.has(lang)) {
        const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`);
        const localeDataScript = fs.readFileSync(localeDataFile, 'utf8');
        localeDataCache.set(lang, localeDataScript);
    }
    return localeDataCache.get(lang);
};

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

    server.use((req, res, next) => {
        req.locale = 'ru';
        req.localeDataScript = getLocaleDataScript('ru');

        next();
    });

    server.get('/events/:id', (req, res) => {
        return app.render(req, res, '/events/event', { id: req.params.id });
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
