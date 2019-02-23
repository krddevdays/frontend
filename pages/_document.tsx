import * as React from 'react';
import Document, { Head, Main, NextScript, NextDocumentContext } from 'next/document';
import * as http from 'http';

type MyDocumentProps = {
    locale: string;
    localeDataScript: string;
};

export default class MyDocument extends Document<MyDocumentProps> {
    static async getInitialProps(context: NextDocumentContext) {
        const props = await super.getInitialProps(context);
        const req = context.req as http.IncomingMessage & MyDocumentProps;

        return {
            ...props,
            locale: req.locale,
            localeDataScript: req.localeDataScript
        };
    }

    render() {
        return (
            <html>
                <Head>
                    <title>Krasnodar Dev Days</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <body>
                    <Main />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: this.props.localeDataScript
                        }}
                    />
                    <NextScript />
                </body>
            </html>
        );
    }
}
