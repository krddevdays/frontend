import * as React from 'react';
import { NextFunctionComponent } from 'next';
import Head from 'next/head';

const IndexPage: NextFunctionComponent = () => {
    return (
        <div className="pt-3">
            <Head>
                <title>Krasnodar Dev Days</title>
            </Head>

            <div className="container">
                <div className="pb-2 mb-3 border-bottom">
                    <h1 className="h2">Krasnodar Dev Days</h1>
                </div>

                <div className="row">
                    <div className="col-xl-8">
                        <h2 className="h3">Независимое сообщество разработчиков региона</h2>
                        <p>
                            Создано, чтобы объединять, развивать и поддерживать всех, кто так или иначе причастен к
                            разработке.
                        </p>
                        <iframe
                            className="mb-3"
                            width="100%"
                            height="300px"
                            src="https://www.youtube.com/embed/IKiPtJEBWXE"
                            frameborder="0"
                            allowfullscreen
                        />
                    </div>

                    <div className="col-xl-4">
                        <h2 className="h3">Что мы делаем?</h2>
                        <p>Проводим конференции и митапы:</p>
                        <ul>
                            <li>
                                Конференции «<a href="/events?types=conf">Krasnodar Dev Days</a>» с докладами о разных
                                сторонах разработки;
                            </li>
                            <li>
                                Митапы «<a href="/events?types=frontend">Krasnodar Frontend</a>» для front-end
                                разработчиков;
                            </li>
                            <li>
                                Митапы «<a href="/events?types=backend">Krasnodar Backend</a>» для back-end
                                разработчиков;
                            </li>
                            <li>
                                Митапы «<a href="/events?types=backend">Krasnodar Python</a>» для python разработчиков.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container mb-3">
                <h2 className="h3 border-bottom pb-3 mb-4">Кто организаторы?</h2>
                <div className="row">
                    <figure className="figure col-6 col-md-4 col-lg-4 col-xl">
                        <img
                            src="https://via.placeholder.com/180x230"
                            className="figure-img img-fluid rounded"
                            alt="..."
                        />
                        <figcaption className="figure-caption">
                            <h4>
                                <a href="https://vk.com/mmskvortsov" target="_blank" rel="noopeneer">
                                    Михаил
                                    <br />
                                    Скворцов
                                </a>
                            </h4>
                            сооснователь сообщества, <br />
                            главный помощник по всему
                        </figcaption>
                    </figure>
                    <figure className="figure col-6 col-md-4 col-lg-4 col-xl">
                        <img
                            src="https://via.placeholder.com/180x230"
                            className="figure-img img-fluid rounded"
                            alt="..."
                        />
                        <figcaption className="figure-caption">
                            <h4>
                                <a href="https://vk.com/n30n1ck" target="_blank" rel="noopeneer">
                                    Николай
                                    <br />
                                    Марченко
                                </a>
                            </h4>
                            организатор митапов «Krasnodar Frontend»
                        </figcaption>
                    </figure>
                    <figure className="figure col-6 col-md-4 col-lg-4 col-xl">
                        <img
                            src="https://via.placeholder.com/180x230"
                            className="figure-img img-fluid rounded"
                            alt="..."
                        />
                        <figcaption className="figure-caption">
                            <h4>
                                <a href="https://vk.com/binakot" target="_blank" rel="noopeneer">
                                    Иван
                                    <br />
                                    Муратов
                                </a>
                            </h4>
                            организатор митапов «Krasnodar Backend»
                        </figcaption>
                    </figure>
                    <figure className="figure col-6 col-md-4 col-lg-4 col-xl">
                        <img
                            src="https://via.placeholder.com/180x230"
                            className="figure-img img-fluid rounded"
                            alt="..."
                        />
                        <figcaption className="figure-caption">
                            <h4>
                                <a href="https://vk.com/tyvik" target="_blank" rel="noopeneer">
                                    Виктор
                                    <br />
                                    Тыщенко
                                </a>
                            </h4>
                            организатор митапов «Krasnodar Python»
                        </figcaption>
                    </figure>
                    <figure className="figure col-6 col-md-4 col-lg-4 col-xl">
                        <img
                            src="https://via.placeholder.com/180x230"
                            className="figure-img img-fluid rounded"
                            alt="..."
                        />
                        <figcaption className="figure-caption">
                            <h4>
                                <a href="https://vk.com/marklangovoi" target="_blank" rel="noopeneer">
                                    Марк
                                    <br />
                                    Ланговой
                                </a>
                            </h4>
                            основатель сообщества, организатор конференций «Krasnodar Dev Days»
                        </figcaption>
                    </figure>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-xl-8">
                        <h2 className="h3">Где мы общаемся?</h2>
                        <p>Вся коммуникация в сообществе происходит через Telegram.</p>
                        <p>
                            Анонсы мероприятий мы делаем в{' '}
                            <a href="https://t.me/krddevdays" target="_blank" rel="noopeneer">
                                основном канале
                            </a>
                            , в тематических чатах и в наших соцсетях.
                        </p>
                        <p>
                            Если вы хотите задать вопрос организаторам, пообщаться с коллегами или поделиться опытом, у
                            нас есть общий чат{' '}
                            <a href="http://t.me/krddevdays_chat" target="_blank" rel="noopeneer">
                                @krddevdays_chat
                            </a>{' '}
                            и следующие чаты по интересам:
                        </p>
                        <ul>
                            <li>
                                <a href="http://t.me/krdfrontend" target="_blank" rel="noopeneer">
                                    @krdfrontend
                                </a>{' '}
                                для frontend-разработчиков;
                            </li>
                            <li>
                                <a href="http://t.me/krdbackend" target="_blank" rel="noopeneer">
                                    @krdbackend
                                </a>{' '}
                                для backend-разработчиков;
                            </li>
                            <li>
                                <a href="http://t.me/pythonkrd" target="_blank" rel="noopeneer">
                                    @pythonkrd
                                </a>{' '}
                                для python-разработчиков;
                            </li>
                            <li>
                                <a href="http://t.me/krdQA" target="_blank" rel="noopeneer">
                                    @krdQA
                                </a>{' '}
                                для QA-инженеров;
                            </li>
                            <li>
                                <a href="http://t.me/golangkrasnodar" target="_blank" rel="noopeneer">
                                    @golangkrasnodar
                                </a>{' '}
                                для Go-разработчиков;
                            </li>
                            <li>
                                <a href="http://t.me/rubykrd" target="_blank" rel="noopeneer">
                                    @rubykrd
                                </a>{' '}
                                для Ruby-разработчиков;
                            </li>
                        </ul>
                        <p>
                            Основное правило – ни в одном из чатов выше нельзя публиковать вакансии и резюме, для этого
                            есть{' '}
                            <a href="http://t.me/krddevcareer" target="_blank" rel="noopeneer">
                                @krddevcareer
                            </a>
                            .
                        </p>
                    </div>

                    <div className="col-xl-4">
                        <h2 className="h3">Как с нами связаться?</h2>
                        <p>
                            По всем вопросам вы можете написать нам на почту{' '}
                            <a href="mailto:help@krddevdays.ru">help@krddevdays.ru</a>.
                        </p>
                        <p>
                            Подписывайтесь на нас в{' '}
                            <a href="https://vk.com/krddevdays" target="_blank" rel="noopeneer">
                                VK
                            </a>
                            ,{' '}
                            <a href="https://www.facebook.com/krddevdays/" target="_blank" rel="noopeneer">
                                Фейсбуке
                            </a>
                            ,{' '}
                            <a href="https://twitter.com/krddevdays" target="_blank" rel="noopeneer">
                                Твиттере
                            </a>
                            ,{' '}
                            <a href="https://www.instagram.com/krddevdays/" target="_blank" rel="noopeneer">
                                Инстаграме
                            </a>{' '}
                            и{' '}
                            <a
                                href="https://www.youtube.com/channel/UCBVZa_qgKhT8_MMqvR0bNQA"
                                target="_blank"
                                rel="noopeneer"
                            >
                                Ютубе
                            </a>
                            .
                        </p>
                        <p>
                            А если хотите у нас выступить, заполните{' '}
                            <a
                                href="https://connect.yandex.ru/forms/5adc61cf6162d77e2714831c/"
                                target="_blank"
                                rel="noopeneer"
                            >
                                короткую анкету
                            </a>
                            .
                        </p>
                    </div>

                    <div className="col">
                        <p>
                            Подключайтесь, общайтесь, приходите на наши мероприятия, участвуйте в жизни сообщества,
                            <a
                                href="https://connect.yandex.ru/forms/5adc61cf6162d77e2714831c/"
                                target="_blank"
                                rel="noopeneer"
                            >
                                становитесь спикером
                            </a>
                            и развивайтесь!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndexPage;
