import * as React from 'react';
import { Response } from 'cross-fetch';
import * as yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import Modal from '../Modal';
import FormGroup from '../FormGroup';

import * as api from '../../api';

import './index.css';

const schema = yup.object().shape({
    username: yup.string().required('Введите логин'),
    password: yup.string().required('Введите пароль')
});

const registrationSchema = yup.object().shape({
    username: yup.string().required('Введите логин'),
    email: yup
        .string()
        .email('Неверный e-amil')
        .required('Введите e-mail'),
    first_name: yup.string().required('Введите имя'),
    last_name: yup.string().required('Введите фамилию'),
    password1: yup.string().required('Введите пароль'),
    password2: yup.string().required('Введите подтверждение пароля')
});

type Profile = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    work: string | null;
    position: string | null;
};

type AuthModalProps = {
    onResolve: (profile: Profile) => void;
    onReject: () => void;
};

function LoginForm(props: {
    onFetchProfile: (profile: Profile) => void;
    onClickRegistration: React.ReactEventHandler<HTMLButtonElement>;
}) {
    return (
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            validationSchema={schema}
            initialStatus={null}
            onSubmit={async (values, actions) => {
                actions.setStatus(null);
                actions.setSubmitting(true);

                try {
                    await api.login(values);
                    props.onFetchProfile(await api.getProfile());
                } catch (e) {
                    if (e instanceof Response) {
                        switch (e.status) {
                            case 400: {
                                const errors = await e.json();

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
                                actions.setStatus('Неизвестная ошибка, попробуйте еще раз');
                                throw e;
                        }
                    } else {
                        actions.setStatus(e.toString());
                        throw e;
                    }
                } finally {
                    actions.setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting, status }) => {
                return (
                    <Form>
                        <FormGroup>
                            <label htmlFor="username">Логин</label>
                            <Field type="text" name="username" id="username" className="form-control" />
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="password">Пароль</label>
                            <Field type="password" name="password" id="password" className="form-control" />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </FormGroup>
                        {status && (
                            <FormGroup>
                                <div className="invalid-feedback">{status}</div>
                            </FormGroup>
                        )}
                        <FormGroup>
                            <button
                                type="submit"
                                className="button button_full-width button_theme_blue"
                                disabled={isSubmitting}
                            >
                                Войти
                            </button>
                        </FormGroup>
                        <button
                            type="button"
                            className="button button_full-width button_theme_link"
                            disabled={isSubmitting}
                            onClick={props.onClickRegistration}
                        >
                            Зарегистрироваться
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
}

function RegistrationForm(props: {
    onFetchProfile: (profile: Profile) => void;
    onClickLogin: React.ReactEventHandler<HTMLButtonElement>;
}) {
    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                first_name: '',
                last_name: '',
                password1: '',
                password2: ''
            }}
            validationSchema={registrationSchema}
            initialStatus={null}
            onSubmit={async (values, actions) => {
                actions.setStatus(null);
                actions.setSubmitting(true);

                try {
                    await api.registration({ ...values, work: null, position: null });
                    props.onFetchProfile(await api.getProfile());
                } catch (e) {
                    if (e instanceof Response) {
                        switch (e.status) {
                            case 400: {
                                const errors = await e.json();

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
                                throw e;
                        }
                    } else {
                        actions.setStatus(e.toString());
                        throw e;
                    }
                } finally {
                    actions.setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting, status }) => {
                return (
                    <Form>
                        <FormGroup>
                            <label htmlFor="username">Логин</label>
                            <Field type="text" name="username" id="username" className="form-control" />
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="username">E-mail</label>
                            <Field type="email" name="email" id="email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </FormGroup>
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
                            <label htmlFor="password1">Пароль</label>
                            <Field type="password" name="password1" id="password1" className="form-control" />
                            <ErrorMessage name="password1" component="div" className="invalid-feedback" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="password2">Подтверждение пароля:</label>
                            <Field type="password" name="password2" id="password2" className="form-control" />
                            <ErrorMessage name="password2" component="div" className="invalid-feedback" />
                        </FormGroup>
                        {status && (
                            <FormGroup>
                                <div className="invalid-feedback">{status}</div>
                            </FormGroup>
                        )}
                        <FormGroup>
                            <button
                                type="submit"
                                className="button button_full-width button_theme_blue"
                                disabled={isSubmitting}
                            >
                                Зарегистрироваться
                            </button>
                        </FormGroup>
                        <button
                            type="submit"
                            className="button button_full-width button_theme_link"
                            disabled={isSubmitting}
                            onClick={props.onClickLogin}
                        >
                            Войти
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
}

function AuthModal(props: AuthModalProps) {
    const [profile, setProfile] = React.useState<Profile | null>(null);
    const [isOpen, setIsOpen] = React.useState(profile === null);

    const [page, setPage] = React.useState('login');

    React.useEffect(() => {
        setIsOpen(profile === null);
    }, [profile, setIsOpen]);

    const handleAfterClose = React.useCallback(() => {
        if (profile) {
            props.onResolve(profile);
        } else {
            props.onReject();
        }
    }, [profile, props.onResolve, props.onReject]);

    const handleRequestClose = React.useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    let title: string;

    switch (page) {
        case 'login':
            title = 'Авторизация';
            break;
        case 'registration':
            title = 'Регистрация';
            break;
        default:
            title = '';
    }

    return (
        <Modal
            onAfterClose={handleAfterClose}
            onRequestClose={handleRequestClose}
            isOpen={isOpen}
            title={title}
            className="auth-modal"
        >
            {page === 'login' && (
                <LoginForm
                    onFetchProfile={profile => {
                        setProfile(profile);
                    }}
                    onClickRegistration={e => {
                        e.preventDefault();
                        setPage('registration');
                    }}
                />
            )}
            {page === 'registration' && (
                <RegistrationForm
                    onFetchProfile={profile => {
                        setProfile(profile);
                    }}
                    onClickLogin={e => {
                        e.preventDefault();
                        setPage('login');
                    }}
                />
            )}
        </Modal>
    );
}

export default AuthModal;
