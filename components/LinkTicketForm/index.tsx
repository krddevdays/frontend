import * as React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Response } from 'cross-fetch';
import * as yup from 'yup';

import * as api from '../../api';

import FormGroup from '../FormGroup';

const schema = yup.object().shape({
    id: yup.number().required('Введите номер билета'),
    email: yup
        .string()
        .email('Введите валидный e-mail')
        .required('Введите e-mail')
});

type LinkTicketFormProps = {
    onLink: (ticket: { id: string; email: string }) => void;
};

export default function LinkTicketForm(props: LinkTicketFormProps) {
    return (
        <Formik
            validationSchema={schema}
            initialStatus={null}
            onSubmit={async (values, actions) => {
                actions.setStatus(null);
                actions.setSubmitting(true);

                try {
                    const ticket = await api.linkTicket(values);
                    props.onLink(ticket);
                } catch (e) {
                    if (e instanceof Response) {
                        switch (e.status) {
                            case 404: {
                                actions.setStatus('Неверный номер билета или e-mail');
                                break;
                            }
                            case 403: {
                                actions.setStatus('Вы не авторизованны');
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
                id: '',
                email: ''
            }}
        >
            {({ status, isSubmitting }) => {
                return (
                    <Form>
                        <FormGroup>
                            <label htmlFor="id">Номер билета</label>
                            <Field type="text" name="id" id="id" className="form-control" />
                            <ErrorMessage name="id" component="div" className="invalid-feedback" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="email">
                                E-mail <sup>(указанный для билета)</sup>
                            </label>
                            <Field type="email" name="email" id="email" className="form-control" />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </FormGroup>
                        <button
                            type="submit"
                            className="button button_full-width button_theme_blue"
                            disabled={isSubmitting}
                        >
                            Связать с профилем
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
