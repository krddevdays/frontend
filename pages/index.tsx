import * as React from 'react';
import { NextFunctionComponent } from 'next';
import Head from 'next/head';

import Container from '../components/Container/Container';
import './index.css';

const IndexPage: NextFunctionComponent = () => {
    return (
        <Container>
            <Head>
                <title>Krasnodar Dev Days</title>
            </Head>
            <div className="index-header">
                <h1 className="index-header__title">Независимое сообщество разработчиков Краснодара и края</h1>
                <p className="index-header__description">
                    Создано, чтобы объединять, развивать и поддерживать всех, кто так или иначе причастен к разработке.
                </p>
            </div>
        </Container>
    );
};

export default IndexPage;
