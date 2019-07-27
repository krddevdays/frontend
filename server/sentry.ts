import * as Sentry from '@sentry/node';
import * as SentryIntegrations from '@sentry/integrations';
import sentryTestkit from 'sentry-testkit';
import * as Cookie from 'js-cookie';
import getConfig from 'next/config';

export default (release: string | undefined = process.env.SENTRY_RELEASE) => {
    const sentryOptions: Sentry.NodeOptions = {
        dsn: getConfig().publicRuntimeConfig.sentryDSN,
        release,
        maxBreadcrumbs: 50,
        attachStacktrace: true
    };

    if (process.env.NODE_ENV !== 'production') {
        const { sentryTransport } = sentryTestkit();

        sentryOptions.transport = sentryTransport;

        sentryOptions.integrations = [
            new SentryIntegrations.Debug({
                debugger: false
            })
        ];
    }

    Sentry.init(sentryOptions);

    return {
        Sentry,
        captureException: (err: any, ctx: any): string => {
            // TODO
            Sentry.configureScope(scope => {
                if (err.message) {
                    scope.setFingerprint([err.message]);
                }

                if (err.statusCode) {
                    scope.setExtra('statusCode', err.statusCode);
                }

                if (ctx) {
                    const { req, res, errorInfo, query, pathname } = ctx;

                    if (res && res.statusCode) {
                        scope.setExtra('statusCode', res.statusCode);
                    }

                    if (typeof window !== 'undefined') {
                        // @ts-ignore
                        scope.setTag('ssr', false);
                        scope.setExtra('query', query);
                        scope.setExtra('pathname', pathname);

                        const sessionId = Cookie.get('sid');
                        if (sessionId) {
                            scope.setUser({ id: sessionId });
                        }
                    } else {
                        // @ts-ignore
                        scope.setTag('ssr', true);
                        scope.setExtra('url', req.url);
                        scope.setExtra('method', req.method);
                        scope.setExtra('headers', req.headers);
                        scope.setExtra('params', req.params);
                        scope.setExtra('query', req.query);

                        if (req.cookies.sid) {
                            scope.setUser({ id: req.cookies.sid });
                        }
                    }

                    if (errorInfo) {
                        Object.keys(errorInfo).forEach(key => scope.setExtra(key, errorInfo[key]));
                    }
                }
            });

            return Sentry.captureException(err);
        }
    };
};
