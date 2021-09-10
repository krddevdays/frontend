import * as React from 'react';
import { NextPageContext, NextComponentType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from 'next';

import * as api from '../api';

import EventsList, { EventsListProps } from '../components/EventsList/EventsList';

import heroImage from '../public/hero.jpg';
import { setContext } from '../context';

type IndexPageProps = {
    events: EventsListProps['events'];
};

const IndexPage: NextComponentType<NextPageContext, IndexPageProps, IndexPageProps> = props => {
    return (
        <div className='mt-12'>
            <Head>
                <title>Krasnodar Dev Days</title>
            </Head>
            <div className='relative'>
                <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                    <div className='relative shadow-xl sm:rounded-2xl sm:overflow-hidden'>
                        <div className='absolute inset-0'>
                            <Image
                                objectFit='cover'
                                objectPosition='bottom'
                                loading='lazy'
                                placeholder='blur'
                                layout='responsive'
                                src={heroImage}
                            />
                            <div className='absolute inset-0 bg-indigo-700 mix-blend-multiply' />
                        </div>
                        <div className='relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8'>
                            <h1 className='text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl'>
                                <span className='block text-white'>Некоммерческое ИТ-сообщество</span>
                                <span className='block text-indigo-200'>Краснодара</span>
                            </h1>
                            <p className='mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl'>
                                Создано чтобы аккумулировать знания и опыт, поддерживать специалистов из сферы
                                информационных технологий и создавать для них благоприятную среду
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {props.events.length > 0 && (
                <section className='max-w-7xl mx-auto sm:px-6 lg:px-8 mt-10'>
                    <div className='flex justify-between'>
                        <h2 className='text-lg leading-6 font-medium text-gray-900'>Предстоящие мероприятия</h2>
                        <Link href='/events'>
                            <a className='text-lg font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'>Посмотреть
                                все</a>
                        </Link>
                    </div>
                    <div className='mt-6'>
                        <EventsList events={props.events} />
                    </div>
                </section>
            )}
        </div>
    );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps<IndexPageProps, never> = async function(context) {
    setContext(context.req);

    return {
        props: {
            events: await api
                .events({
                    date_from: new Date()
                })
                .then(events =>
                    events.sort((e1, e2) => (Date.parse(e1.finish_date) > Date.parse(e2.finish_date) ? 1 : -1))
                )
        }
    };
};
