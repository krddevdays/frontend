import * as React from 'react';
import { NextPageContext, NextComponentType } from 'next';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import Head from 'next/head';
import { Response } from 'cross-fetch';

import * as api from '../api';

import Container from '../components/Container/Container';
import AuthModal from '../components/AuthModal';
import FormGroup from '../components/FormGroup';

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

const schema = yup.object().shape({
    first_name: yup.string().required('Введите иямя'),
    last_name: yup.string().required('Введите фамилию'),
    work: yup.string(),
    position: yup.string()
});

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

    return (
        <Container className="section">
            <Head>
                <title>Профиль</title>
            </Head>
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
                <div className="section__content">
                    <Formik
                        validationSchema={schema}
                        initialStatus={null}
                        onSubmit={async (values, actions) => {
                            actions.setStatus(null);
                            actions.setSubmitting(true);

                            try {
                                setProfile(await api.patchProfile(values));
                            } catch (e) {
                                if (e instanceof Response) {
                                    const response = e;

                                    switch (response.status) {
                                        case 400: {
                                            const errors = await response.json();

                                            Object.keys(errors).forEach(field => {
                                                if (['non_field_errors', '__all__'].includes(field)) {
                                                    actions.setStatus(errors[field][0]);
                                                    return;
                                                }

                                                actions.setFieldError(field, errors[field][0]);
                                            });
                                            break;
                                        }
                                        default:
                                            actions.setStatus('Неизвестная ошибка');
                                    }
                                } else {
                                    actions.setStatus(e.toString());
                                }
                            } finally {
                                actions.setSubmitting(false);
                            }
                        }}
                        initialValues={{
                            first_name: profile.first_name,
                            last_name: profile.last_name,
                            work: profile.work || '',
                            position: profile.position || ''
                        }}
                    >
                        {({ status, isSubmitting }) => {
                            return (
                                <Form className="profile-form">
                                    <FormGroup>
                                        <label htmlFor="first_name">Имя</label>
                                        <Field type="text" name="first_name" id="first_name" className="form-control" />
                                        <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="last_name">Фамилия</label>
                                        <Field type="text" name="last_name" id="last_name" className="form-control" />
                                        <ErrorMessage name="last_name" component="div" className="invalid-feedback" />
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="work">Место работы</label>
                                        <Field type="text" name="work" id="work" className="form-control" />
                                        <ErrorMessage name="work" component="div" className="invalid-feedback" />
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="position">Должность</label>
                                        <Field type="text" name="position" id="position" className="form-control" />
                                        <ErrorMessage name="position" component="div" className="invalid-feedback" />
                                    </FormGroup>
                                    <FormGroup>
                                        <label htmlFor="email">E-mail</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="form-control"
                                            disabled
                                            value={profile.email}
                                        />
                                    </FormGroup>
                                    <button
                                        type="submit"
                                        className="button button_full-width button_theme_blue"
                                        disabled={isSubmitting}
                                    >
                                        Сохранить
                                    </button>
                                    {status && <div className="invalid-feedback">{status}</div>}
                                </Form>
                            );
                        }}
                    </Formik>
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
