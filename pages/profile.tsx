import * as React from 'react';
import { NextPageContext, NextComponentType, GetServerSideProps } from 'next';
import Head from 'next/head';
import { Response } from 'cross-fetch';
import classNames from 'classnames';
import * as api from '../api';

import Container from '../components/Container/Container';
import AuthModal from '../components/AuthModal/AuthModal';
import ProfileForm from '../components/ProfileForm/ProfileForm';
import LinkTicketForm from '../components/LinkTicketForm/LinkTicketForm';

import styles from '../styles/ProfilePage.module.css';
import { FormattedNumber } from 'react-intl';
import { setContext } from '../context';

type Profile = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    work: string | null;
    position: string | null;
};

type Ticket = {
    number: number;
    price: number;
    pdf_url: string | null;
    passbook_url: string | null;
};

type ProfilePageProps = {
    profile: null | Profile;
    tickets: null | Ticket[];
};

const ProfilePage: NextComponentType<NextPageContext, ProfilePageProps, ProfilePageProps> = (props) => {
    const [profile, setProfile] = React.useState(props.profile);

    React.useEffect(() => {
        setProfile(props.profile);
    }, [props.profile]);

    const [authModalIsOpened, setAuthModalIsOpened] = React.useState(profile === null);

    React.useEffect(() => {
        const newAuthModalIsOpened = profile === null;

        if (authModalIsOpened !== newAuthModalIsOpened) {
            setAuthModalIsOpened(newAuthModalIsOpened);
        }
    }, [setAuthModalIsOpened, profile, authModalIsOpened]);

    const handleAuthModal = React.useCallback(
        (profile?: Profile) => {
            if (profile) {
                setProfile(profile);
            }
            setAuthModalIsOpened(false);
        },
        [setAuthModalIsOpened],
    );

    const handleClickAuth: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
        (e) => {
            e.preventDefault();
            setAuthModalIsOpened(true);
        },
        [setAuthModalIsOpened],
    );

    const handleProfileChange = React.useCallback((profile: Profile) => {
        setProfile(profile);
    }, []);

    const [tickets, setTickets] = React.useState<Ticket[] | null>(props.tickets);

    React.useEffect(() => {
        setTickets(props.tickets);
    }, [props.tickets]);

    const handleTicketLink = React.useCallback((tickets: Ticket[]) => {
        setTickets(tickets);
    }, []);

    return (
        <Container>
            <Head>
                <title>Профиль</title>
            </Head>
            <div className="section">
                <h1 className="section__title">Профиль</h1>
                {!profile && (
                    <div className="section__content">
                        <button type="button" className="button button_theme_inline" onClick={handleClickAuth}>
                            Войдите
                        </button>
                        , чтобы просмотреть и отредактировать свой профиль
                    </div>
                )}
                {profile && (
                    <div className={classNames('section__content', styles.profileSection__content)}>
                        <ProfileForm profile={profile} onChange={handleProfileChange} />
                    </div>
                )}
            </div>
            {tickets && (
                <div className="section">
                    <h2 className="section__title">Билеты</h2>
                    <div className={classNames('section__content', styles.profileSection__content)}>
                        {tickets.length > 0 && (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Номер</th>
                                        <th>Цена</th>
                                        <th />
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map((ticket, i) => (
                                        <tr key={i}>
                                            <td>{ticket.number}</td>
                                            <td>
                                                <FormattedNumber
                                                    style="currency"
                                                    value={ticket.price}
                                                    currency="RUB"
                                                    minimumFractionDigits={0}
                                                />
                                            </td>
                                            <td>
                                                {ticket.pdf_url && (
                                                    <a href={ticket.pdf_url} target="_blank" rel="noopener noreferrer">
                                                        pdf
                                                    </a>
                                                )}
                                                {ticket.passbook_url && (
                                                    <React.Fragment>
                                                        {ticket.pdf_url && ' '}
                                                        <a
                                                            href={ticket.passbook_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            passbook
                                                        </a>
                                                    </React.Fragment>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        <p>
                            Мы можем использовать данные вашего профиля при печати бейджа.
                            <br />
                            Для этого нужно связать ваш билет с профилем.
                        </p>
                        <LinkTicketForm onLink={handleTicketLink} />
                    </div>
                </div>
            )}
            {authModalIsOpened && <AuthModal onReject={handleAuthModal} onResolve={handleAuthModal} />}
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps<ProfilePageProps, never> = async function (context) {
    setContext(context.req);

    let profile = null;
    let tickets = null;

    try {
        [profile, tickets] = await Promise.all([api.getProfile(), api.getTickets()]);
    } catch (e: any) {
        if (!(e instanceof Response) || e.status !== 403) {
            throw e;
        }
    }

    return {
        props: {
            profile,
            tickets,
        },
    };
};

export default ProfilePage;
