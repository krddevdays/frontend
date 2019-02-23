import * as React from 'react';
import { NextFunctionComponent } from 'next';
import Head from 'next/head';

const IndexPage: NextFunctionComponent = () => {
    return (
        <div className="pt-3">
            <Head>
                <title>Krasnodar Dev Days</title>
            </Head>
            <p>
                <b>Krasnodar Dev Days</b> – это сообщество разработчиков Краснодара и края.
            </p>
        </div>
    );
};

export default IndexPage;
