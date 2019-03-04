import * as React from 'react';
import { NextFunctionComponent } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import classNames from 'classnames';

function shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

type Org = {
    name: string;
    description: string;
    link: string;
    img: string;
};

type IndexPageProps = {
    orgs: Org[];
};

const IndexPage: NextFunctionComponent<IndexPageProps> = ({ orgs }) => {
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
                        <div className="embed-responsive embed-responsive-16by9 mb-3">
                            <iframe src="https://www.youtube.com/embed/IKiPtJEBWXE" frameBorder="0" allowFullScreen />
                        </div>
                    </div>

                    <div className="col-xl-4">
                        <h2 className="h3">Что мы делаем?</h2>
                        <p>Проводим конференции и митапы:</p>
                        <ul>
                            <li>
                                Конференции «
                                <Link href={`/events?types=conf`}>
                                    <a>Krasnodar Dev Days</a>
                                </Link>
                                » с докладами о разных сторонах разработки;
                            </li>
                            <li>
                                Митапы «
                                <Link href={`/events?types=frontend`}>
                                    <a>Krasnodar Frontend</a>
                                </Link>
                                » для front-end разработчиков;
                            </li>
                            <li>
                                Митапы «
                                <Link href={`/events?types=backend`}>
                                    <a>Krasnodar Backend</a>
                                </Link>
                                » для back-end разработчиков;
                            </li>
                            <li>
                                Митапы «
                                <Link href={`/events?types=python`}>
                                    <a>Krasnodar Python</a>
                                </Link>
                                » для python разработчиков.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container">
                <h2 className="h3 border-bottom pb-3 mb-4">Кто организаторы?</h2>
            </div>
            <div
                className="mx-n4 overflow-auto"
                style={{
                    WebkitOverflowScrolling: 'touch'
                }}
            >
                <div className="container">
                    <div className="d-flex flex-row flex-nowrap">
                        {orgs.map((org, index) => (
                            <div
                                className={classNames('card mb-3 flex-grow-0 flex-shrink-0 flex', {
                                    'mr-3': index + 1 !== orgs.length
                                })}
                                key={index}
                                style={{ width: 240 }}
                            >
                                <img
                                    src={org.img}
                                    alt={org.name}
                                    className="card-img-top"
                                    width="240px"
                                    height="240px"
                                />
                                <div className="card-body">
                                    <h4 className="h5 card-title">
                                        <a href={org.link} target="_blank" rel="noopeneer">
                                            {org.name}
                                        </a>
                                    </h4>
                                    <p className="card-text">{org.description}</p>
                                </div>
                            </div>
                        ))}
                        <div style={{ paddingRight: 15 }} />
                    </div>
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
                            <a href="https://t.me/krddevdays_chat" target="_blank" rel="noopeneer">
                                @krddevdays_chat
                            </a>{' '}
                            и следующие чаты по интересам:
                        </p>
                        <ul>
                            <li>
                                <a href="https://t.me/krdfrontend" target="_blank" rel="noopeneer">
                                    @krdfrontend
                                </a>{' '}
                                для frontend-разработчиков;
                            </li>
                            <li>
                                <a href="https://t.me/krdbackend" target="_blank" rel="noopeneer">
                                    @krdbackend
                                </a>{' '}
                                для backend-разработчиков;
                            </li>
                            <li>
                                <a href="https://t.me/pythonkrd" target="_blank" rel="noopeneer">
                                    @pythonkrd
                                </a>{' '}
                                для python-разработчиков;
                            </li>
                            <li>
                                <a href="https://t.me/krdQA" target="_blank" rel="noopeneer">
                                    @krdQA
                                </a>{' '}
                                для QA-инженеров;
                            </li>
                            <li>
                                <a href="https://t.me/golangkrasnodar" target="_blank" rel="noopeneer">
                                    @golangkrasnodar
                                </a>{' '}
                                для Go-разработчиков;
                            </li>
                            <li>
                                <a href="https://t.me/rubykrd" target="_blank" rel="noopeneer">
                                    @rubykrd
                                </a>{' '}
                                для Ruby-разработчиков.
                            </li>
                        </ul>
                        <p>
                            Основное правило – ни в одном из чатов выше нельзя публиковать вакансии и резюме, для этого
                            есть{' '}
                            <a href="https://t.me/krddevcareer" target="_blank" rel="noopeneer">
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
                            Подключайтесь, общайтесь, приходите на наши мероприятия, участвуйте в жизни сообщества,{' '}
                            <a
                                href="https://connect.yandex.ru/forms/5adc61cf6162d77e2714831c/"
                                target="_blank"
                                rel="noopeneer"
                            >
                                становитесь спикером
                            </a>{' '}
                            и развивайтесь!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

IndexPage.getInitialProps = () => ({
    orgs: shuffle([
        {
            name: 'Михаил Скворцов',
            description: 'Сооснователь сообщества, главный помощник по всему',
            link: 'https://vk.com/mmskvortsov',
            img: '/misha.jpg'
        },
        {
            name: 'Николай Марченко',
            description: 'Организатор митапов «Krasnodar Frontend»',
            link: 'https://twitter.com/neonick',
            img: '/nick.jpg'
        },
        {
            name: 'Иван Муратов',
            description: 'Организатор митапов «Krasnodar Backend»',
            link: 'https://twitter.com/binakot',
            img: '/ivan.jpg'
        },
        {
            name: 'Виктор Тыщенко',
            description: 'Организатор митапов «Krasnodar Python»',
            link: 'https://vk.com/tyvik',
            img: '/viktor.jpg'
        },
        {
            name: 'Марк Ланговой',
            description: 'Основатель сообщества, организатор конференций «Krasnodar Dev Days»',
            link: 'https://vk.com/marklangovoi',
            img: '/mark.jpg'
        }
    ])
});

export default IndexPage;
