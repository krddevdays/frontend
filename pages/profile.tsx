import * as React from 'react';
import { NextPageContext, NextComponentType } from 'next';
import Head from 'next/head';
import { Response } from 'cross-fetch';
import * as api from '../api';

import Container from '../components/Container/Container';
import AuthModal from '../components/AuthModal';
import ProfileForm from '../components/ProfileForm';
import LinkTicketForm from '../components/LinkTicketForm';

import './profile.css';

type Profile = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    work: string | null;
    position: string | null;
};

type ProfilePageProps = {
    profile: null | Profile;
};

const ProfilePage: NextComponentType<NextPageContext, ProfilePageProps, ProfilePageProps> = props => {
    const [profile, setProfile] = React.useState(props.profile);

    React.useEffect(() => {
        setProfile(props.profile);
    }, [props.profile === null]);

    const [authModalIsOpened, setAuthModalIsOpened] = React.useState(profile === null);

    React.useEffect(() => {
        const newAuthModalIsOpened = profile === null;

        if (authModalIsOpened !== newAuthModalIsOpened) {
            setAuthModalIsOpened(newAuthModalIsOpened);
        }
    }, [setAuthModalIsOpened, profile]);

    const handleAuthModal = React.useCallback(
        (profile?: Profile) => {
            if (profile) {
                setProfile(profile);
            }
            setAuthModalIsOpened(false);
        },
        [setAuthModalIsOpened]
    );

    const handleClickAuth: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
        e => {
            e.preventDefault();
            setAuthModalIsOpened(true);
        },
        [setAuthModalIsOpened]
    );

    const handleProfileChange = React.useCallback((profile: Profile) => {
        setProfile(profile);
    }, []);

    const [ticket, setTicket] = React.useState<{ id: string } | null>(null);

    const handleTicketLink = React.useCallback((ticket: { id: string }) => {
        setTicket(ticket);
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
                    <div className="section__content profile-section__content">
                        <ProfileForm profile={profile} onChange={handleProfileChange} />
                    </div>
                )}
            </div>
            {profile && (
                <div className="section">
                    <h2 className="section__title">Связать билет с профилем</h2>
                    <div className="section__content profile-section__content">
                        {!ticket && (
                            <React.Fragment>
                                <p>
                                    Мы можем использовать данные вашего профиля при печати бейджа.
                                    <br />
                                    Для этого нужно связать ваш билет с профилем.
                                </p>
                                <LinkTicketForm onLink={handleTicketLink} />
                            </React.Fragment>
                        )}
                        {ticket && <p>Билет #{ticket.id} успешно связан с вашим профилем.</p>}
                    </div>
                </div>
            )}
            {authModalIsOpened && <AuthModal onReject={handleAuthModal} onResolve={handleAuthModal} />}
        </Container>
    );
};

ProfilePage.getInitialProps = async ctx => {
    let profile = null;

    try {
        profile = await api.getProfile(ctx);
    } catch (e) {
        if (!(e instanceof Response) || e.status !== 403) {
            throw e;
        }
    }

    if (typeof window === 'undefined' && ctx.res && profile === null) {
        ctx.res.statusCode = 403;
    }

    return {
        profile
    };
};

export default ProfilePage;
