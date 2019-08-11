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

const AuthModal = (props: AuthModalProps) => {
    const [profile, setProfile] = React.useState<Profile | null>(null);
    const [isOpen, setIsOpen] = React.useState(profile === null);

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

    return (
        <Modal
            onAfterClose={handleAfterClose}
            onRequestClose={handleRequestClose}
            isOpen={isOpen}
            title="Авторизация"
            className="auth-modal"
        >
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
                        setProfile(await api.getProfile());
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
                            <button
                                type="submit"
                                className="button button_full-width button_theme_blue"
                                disabled={isSubmitting}
                            >
                                Войти
                            </button>
                            {status && <div className="invalid-feedback">{status}</div>}
                        </Form>
                    );
                }}
            </Formik>
        </Modal>
    );
};

export default AuthModal;
