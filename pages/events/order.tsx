import * as React from 'react';
import * as api from '../../api';
import Head from 'next-server/head';
import { NextContext, NextFunctionComponent } from 'next';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as yup from 'yup';
import { Response } from 'cross-fetch';
import classNames from 'classnames';
import ym from 'react-yandex-metrika';

yup.addMethod(yup.object, 'uniqueProperty', function(propertyName, message) {
    return this.test('unique', message, function(value) {
        if (!value || !value[propertyName]) {
            return true;
        }

        // @ts-ignore
        if (this.parent.filter(v => v !== value).some(v => v[propertyName] === value[propertyName])) {
            throw this.createError({
                path: `${this.path}.${propertyName}`
            });
        }

        return true;
    });
});

import { Event, EventTickets } from './event';

import Container from '../../components/Container/Container';
import './order.css';

const schema = yup.object().shape({
    first_name: yup.string().required('Введите имя'),
    last_name: yup.string().required('Введите фамилию'),
    email: yup
        .string()
        .email('Неверный e-mail')
        .required('Введите e-mail'),
    phone: yup.string(),
    tickets: yup
        .array()
        .of(
            yup
                .object()
                // @ts-ignore
                .uniqueProperty('email', 'E-mail должен быть уникальным среди всех участников')
                .shape({
                    type_id: yup.string().required('Выберите билет'),
                    first_name: yup.string().required('Введите имя'),
                    last_name: yup.string().required('Введите фамилию'),
                    email: yup
                        .string()
                        .email('Неверный e-amil')
                        .required('Введите e-mail')
                })
        )
        .min(1),
    payment_id: yup.string().required('Укажите способ оплаты')
});

type EventPageProps = {
    event: Event;
    tickets: EventTickets;
};

const OrderPage: NextFunctionComponent<
    EventPageProps,
    EventPageProps,
    NextContext & {
        query: {
            id: number;
        };
    }
> = props => {
    const [step, setStep] = React.useState(0);

    return (
        <Container className="order-container">
            <Head>
                <title>Регистрация</title>
            </Head>
            <h1 className="order-title">Регистрация</h1>
            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    tickets: [
                        {
                            type_id: '',
                            first_name: '',
                            last_name: '',
                            email: ''
                        }
                    ],
                    payment_id: ''
                }}
                validationSchema={schema}
                initialStatus={null}
                onSubmit={async (values, actions) => {
                    actions.setStatus(null);
                    actions.setSubmitting(true);

                    try {
                        const order = await api.eventOrder(props.event.id, values);

                        ym('reachGoal', 'event_order_success', {
                            event_id: props.event.id
                        });

                        window.location.href = order.payment_url || order.url;
                    } catch (e) {
                        if (e instanceof Response) {
                            const response = e;

                            switch (response.status) {
                                case 400: {
                                    const errors = await response.json();

                                    Object.keys(errors).forEach(field => {
                                        if (field === 'non_field_errors') {
                                            actions.setStatus(errors[field][0]);
                                            return;
                                        }

                                        actions.setFieldError(field, errors[field][0]);
                                    });

                                    setStep(0);
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
                {({ values, isSubmitting }) => (
                    <Form>
                        <div className="order-steps">
                            <div
                                className={classNames('order-steps__item order-step', {
                                    ['order-step_status_active']: step === 0,
                                    ['order-step_status_finished']: step > 0
                                })}
                            >
                                <div className="order-step__number">1</div>
                                <div className="order-step__name">Данные покупателя</div>
                            </div>
                            <div
                                className={classNames('order-steps__item order-step', {
                                    ['order-step_status_active']: step === 1,
                                    ['order-step_status_finished']: step > 1
                                })}
                            >
                                <div className="order-step__number">2</div>
                                <div className="order-step__name">Данные участников</div>
                            </div>
                            <div
                                className={classNames('order-steps__item order-step', {
                                    ['order-step_status_active']: step === 2,
                                    ['order-step_status_finished']: step > 2
                                })}
                            >
                                <div className="order-step__number">3</div>
                                <div className="order-step__name">Оплата</div>
                            </div>
                        </div>
                        {step === 0 && (
                            <div className="order-step-form">
                                <label htmlFor="first_name">Имя</label>
                                <Field type="text" name="first_name" id="first_name" />
                                <ErrorMessage name="first_name" component="div" className="error" />

                                <label htmlFor="last_name">Фамилия</label>
                                <Field type="text" name="last_name" id="last_name" />
                                <ErrorMessage name="last_name" component="div" className="error" />

                                <label htmlFor="email">E-mail</label>
                                <Field type="email" name="email" id="email" />
                                <ErrorMessage name="email" component="div" className="error" />

                                <label htmlFor="phone">Телефон</label>
                                <Field type="tel" name="phone" id="phone" />
                                <ErrorMessage name="phone" component="div" className="error" />

                                <div className="order-step-form__buttons">
                                    <button type="button" className="button" onClick={() => setStep(step + 1)}>
                                        Продолжить
                                    </button>
                                </div>
                            </div>
                        )}
                        {step === 1 && (
                            <FieldArray
                                name="tickets"
                                render={arrayHelpers => (
                                    <div className="order-step-form">
                                        {values.tickets.map((_, index) => (
                                            <div key={index}>
                                                <p>
                                                    Участник №{index + 1}{' '}
                                                    {index > 0 && (
                                                        <button
                                                            style={{ float: 'right' }}
                                                            type="button"
                                                            className="button button_small button_theme_link"
                                                            onClick={() => arrayHelpers.remove(index)}
                                                        >
                                                            удалить
                                                        </button>
                                                    )}
                                                </p>
                                                <Field
                                                    component="select"
                                                    name={`tickets[${index}].type_id`}
                                                    id={`ticket_${index}_type_id`}
                                                >
                                                    <option value="">Выберите тип билета</option>
                                                    {props.tickets.types
                                                        .filter(type => !type.disabled)
                                                        .map(type => (
                                                            <option key={type.id} value={type.id}>
                                                                {type.name}
                                                            </option>
                                                        ))}
                                                </Field>
                                                <ErrorMessage
                                                    name={`tickets[${index}].type_id`}
                                                    component="div"
                                                    className="error"
                                                />

                                                <label htmlFor={`ticket_${index}_first_name`}>Имя</label>
                                                <Field
                                                    type="text"
                                                    name={`tickets[${index}].first_name`}
                                                    id={`ticket_${index}_first_name`}
                                                />
                                                <ErrorMessage
                                                    name={`tickets[${index}].first_name`}
                                                    component="div"
                                                    className="error"
                                                />

                                                <label htmlFor={`ticket_${index}_last_name`}>Фамилия</label>
                                                <Field
                                                    type="text"
                                                    name={`tickets[${index}].last_name`}
                                                    id={`ticket_${index}_last_name`}
                                                />
                                                <ErrorMessage
                                                    name={`tickets[${index}].last_name`}
                                                    component="div"
                                                    className="error"
                                                />

                                                <label htmlFor={`ticket_${index}_email`}>E-mail</label>
                                                <Field
                                                    type="email"
                                                    name={`tickets[${index}].email`}
                                                    id={`ticket_${index}_email`}
                                                />
                                                <ErrorMessage
                                                    name={`tickets[${index}].email`}
                                                    component="div"
                                                    className="error"
                                                />
                                                {index + 1 === values.tickets.length && (
                                                    <button
                                                        type="button"
                                                        className="button button_small button_theme_link"
                                                        onClick={() =>
                                                            arrayHelpers.insert(index + 1, {
                                                                type_id: '',
                                                                first_name: '',
                                                                last_name: '',
                                                                email: ''
                                                            })
                                                        }
                                                    >
                                                        Добавить еще участника
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <div className="order-step-form__buttons">
                                            <button type="button" className="button" onClick={() => setStep(step - 1)}>
                                                Назад
                                            </button>{' '}
                                            <button type="button" className="button" onClick={() => setStep(step + 1)}>
                                                Продолжить
                                            </button>
                                        </div>
                                    </div>
                                )}
                            />
                        )}
                        {step === 2 && (
                            <div className="order-step-form">
                                <Field component="select" name="payment_id" id="payment_id">
                                    <option value="">Выберите способ оплаты</option>
                                    {props.tickets.payments
                                        .filter(payment => ['invoice', 'card'].includes(payment.type))
                                        .map(payment => (
                                            <option key={payment.id} value={payment.id}>
                                                {payment.type === 'invoice' && 'По счету'}
                                                {payment.type === 'card' && 'Банковской картой'}
                                            </option>
                                        ))}
                                </Field>
                                <ErrorMessage name="payment_id" component="div" className="error" />
                                {values.payment_id &&
                                    (props.tickets.payments.find(
                                        payment => payment.id.toString() === values.payment_id
                                    ) as typeof props.tickets.payments[0]).type === 'invoice' && (
                                        <React.Fragment>
                                            <label htmlFor="legal_name">Название компании</label>
                                            <Field type="text" name="legal_name" id="legal_name" />
                                            <ErrorMessage name="legal_name" component="div" className="error" />

                                            <label htmlFor="inn">ИНН</label>
                                            <Field type="text" name="inn" id="inn" />
                                            <ErrorMessage name="inn" component="div" className="error" />
                                        </React.Fragment>
                                    )}
                                <div className="order-step-form__buttons">
                                    <button type="button" className="button" onClick={() => setStep(step - 1)}>
                                        Назад
                                    </button>{' '}
                                    <button type="submit" className="button" disabled={isSubmitting}>
                                        Купить
                                    </button>
                                </div>
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

OrderPage.getInitialProps = async ctx => {
    const event = await api.event(ctx.query.id);
    const tickets = await api.eventTickets(ctx.query.id);

    if (event === null || tickets === null || !tickets.is_active) {
        const err = new Error();
        // @ts-ignore
        err.code = 'ENOENT';
        throw err;
    }

    return {
        event,
        tickets
    };
};

export default OrderPage;
