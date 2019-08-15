import * as React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Response } from 'cross-fetch';
import * as yup from 'yup';

import * as api from '../../api';

import FormGroup from '../FormGroup';

type Profile = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    work: string | null;
    position: string | null;
};

type ProfileFormProps = {
    profile: Profile;
    onChange: (profile: Profile) => void;
};

const schema = yup.object().shape({
    first_name: yup.string().required('Введите имя'),
    last_name: yup.string().required('Введите фамилию'),
    work: yup.string(),
    position: yup.string()
});

export default function ProfileForm(props: ProfileFormProps) {
    return (
        <Formik
            validationSchema={schema}
            initialStatus={null}
            onSubmit={async (values, actions) => {
                actions.setStatus(null);
                actions.setSubmitting(true);

                try {
                    props.onChange(await api.patchProfile(values));
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
            initialValues={{
                first_name: props.profile.first_name,
                last_name: props.profile.last_name,
                work: props.profile.work || '',
                position: props.profile.position || ''
            }}
        >
            {({ status, isSubmitting }) => {
                return (
                    <Form>
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
                                value={props.profile.email}
                            />
                        </FormGroup>
                        <button
                            type="submit"
                            className="button button_full-width button_theme_blue"
                            disabled={isSubmitting}
                        >
                            Сохранить
                        </button>
                        {status && (
                            <FormGroup>
                                <div className="invalid-feedback">{status}</div>
                            </FormGroup>
                        )}
                    </Form>
                );
            }}
        </Formik>
    );
}
