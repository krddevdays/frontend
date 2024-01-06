import * as React from 'react';
import * as api from '@/api';
import Head from 'next/head';
import { NextPageContext, NextComponentType, GetServerSideProps } from 'next';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as yup from 'yup';
import { Response } from 'cross-fetch';
import clsx from 'clsx';

yup.addMethod(yup.object, 'uniqueProperty', function (propertyName, message) {
    return this.test('unique', message, function (value) {
        if (!value || !value[propertyName]) {
            return true;
        }

        // @ts-expect-error because of yup types
        if (this.parent.filter((v) => v !== value).some((v) => v[propertyName] === value[propertyName])) {
            throw this.createError({
                path: `${this.path}.${propertyName}`,
            });
        }

        return true;
    });
});

import { Event, EventTickets } from './index';

import Container from '@/components/Container/Container';
import styles from '@/styles/OrderPage.module.css';
import FormGroup from '@/components/FormGroup/FormGroup';
import { FormattedDate, FormattedNumber } from 'react-intl';
import { setContext } from '@/context';

type Profile = { first_name: string; last_name: string; email: string };

type EventOrderPageProps = {
    event: Event;
    tickets: EventTickets;
    profile: Profile | null;
};

type Ticket = { type_id: string; first_name: string; last_name: string; email: string };
type Customer = {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
};

type OrderPageTemplateProps = {
    step: number;
    children: React.ReactNode;
};

const OrderPageTemplate = ({ step, children }: OrderPageTemplateProps) => {
    return (
        <Container className={styles.orderContainer}>
            <Head>
                <title>Регистрация</title>
            </Head>
            <h1 className={styles.orderTitle}>Регистрация</h1>
            <div className={styles.orderSteps}>
                <div
                    className={clsx(styles.orderSteps__item, styles.orderStep, {
                        [styles.orderStep_status_active]: step === 0,
                        [styles.orderStep_status_finished]: step > 0,
                    })}
                >
                    <div className={styles.orderStep__number}>1</div>
                    <div className={styles.orderStep__name}>Данные покупателя</div>
                </div>
                <div
                    className={clsx(styles.orderSteps__item, styles.orderStep, {
                        [styles.orderStep_status_active]: step === 1,
                        [styles.orderStep_status_finished]: step > 1,
                    })}
                >
                    <div className={styles.orderStep__number}>2</div>
                    <div className={styles.orderStep__name}>Данные участников</div>
                </div>
                <div
                    className={clsx(styles.orderSteps__item, styles.orderStep, {
                        [styles.orderStep_status_active]: step === 2,
                        [styles.orderStep_status_finished]: step > 2,
                    })}
                >
                    <div className={styles.orderStep__number}>3</div>
                    <div className={styles.orderStep__name}>Оплата</div>
                </div>
            </div>
            {children}
        </Container>
    );
};

type EventOrderPageParams = {
    id: string;
};

const OrderPage: NextComponentType<
    NextPageContext & {
        query: EventOrderPageParams;
    },
    EventOrderPageProps,
    EventOrderPageProps
> = (props) => {
    const [step, setStep] = React.useState(0);
    const [customer, setCustomer] = React.useState<Customer | null>(props.profile);
    const [tickets, setTickets] = React.useState<Ticket[] | null>(null);
    const [order, setOrder] = React.useState<Order | null>(null);

    if (step === 0 || customer === null) {
        return (
            <OrderPageTemplate step={0}>
                <CustomerForm
                    onSubmit={(customer) => {
                        setCustomer(customer);
                        setStep(1);
                    }}
                    initialValues={customer ? customer : undefined}
                />
            </OrderPageTemplate>
        );
    }

    if (step === 1 || tickets === null) {
        return (
            <OrderPageTemplate step={1}>
                <TicketsForm
                    types={props.tickets.types}
                    customer={customer}
                    onClickPrev={(tickets) => {
                        setTickets(tickets);
                        setStep(0);
                    }}
                    onSubmit={(tickets) => {
                        setTickets(tickets);
                        setStep(2);
                    }}
                    initialValues={tickets ? tickets : undefined}
                />
            </OrderPageTemplate>
        );
    }

    if (step === 2 || order === null) {
        return (
            <OrderPageTemplate step={2}>
                <PaymentForm
                    eventId={props.event.id}
                    customer={customer}
                    payments={props.tickets.payments}
                    tickets={tickets}
                    onClickPrev={() => {
                        setStep(1);
                    }}
                    onSubmit={(order) => {
                        setOrder(order);
                        setStep(3);
                    }}
                />
            </OrderPageTemplate>
        );
    }

    return (
        <OrderPageTemplate step={3}>
            <div className={styles.orderStepForm}>
                <p className={styles.orderStepForm__information}>Ваш заказ №{order.id} успешно оформлен.</p>
                {order.payment_url && (
                    <React.Fragment>
                        <p className={styles.orderStepForm__information}>
                            Бронь действительна до{' '}
                            <FormattedDate
                                value={order.reserved_to}
                                month="long"
                                day="numeric"
                                hour="numeric"
                                minute="numeric"
                            />
                        </p>
                        <div className={styles.orderStepForm__buttons}>
                            <a href={order.payment_url} className="button button_theme_blue">
                                Оплатить{' '}
                                <FormattedNumber
                                    style="currency"
                                    value={order.price}
                                    currency={order.currency_id}
                                    minimumFractionDigits={0}
                                />
                            </a>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </OrderPageTemplate>
    );
};

type CustomerFormProps = {
    onSubmit(customer: Customer): void;
    initialValues?: Customer;
};

const CustomerForm: React.FC<CustomerFormProps> = (props) => {
    const schema = React.useMemo(
        () =>
            yup.object().shape({
                first_name: yup.string().required('Введите имя'),
                last_name: yup.string().required('Введите фамилию'),
                email: yup.string().email('Неверный e-mail').required('Введите e-mail'),
                phone: yup
                    .string()
                    .transform(function (value) {
                        if (!this.isType(value)) {
                            return value;
                        }

                        // map empty string to undefined for API, because it accepts valid phone or undefined
                        if (value?.trim().length === 0) return undefined;

                        // normalization for API
                        return value?.replaceAll(/[^+0-9]/g, '').replace(/^8/, '+7');
                    })
                    .test('is-phone', 'Неверный номер телефона', (value) => {
                        // it is optional
                        if (value === undefined || value.length === 0) return true;

                        if (value.length !== 12) return false;

                        return /^\+7/.test(value);
                    }),
            }),
        [],
    );

    return (
        <Formik
            initialValues={{
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                ...props.initialValues,
            }}
            validationSchema={schema}
            initialStatus={null}
            onSubmit={(values) => {
                props.onSubmit(schema.cast(values));
            }}
        >
            {({ isSubmitting, status }) => (
                <Form className={styles.orderStepForm}>
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
                        <label htmlFor="email">E-mail</label>
                        <Field type="email" name="email" id="email" className="form-control" />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </FormGroup>

                    <FormGroup>
                        <label htmlFor="phone">Телефон</label>
                        <Field type="tel" name="phone" id="phone" className="form-control" />
                        <ErrorMessage name="phone" component="div" className="invalid-feedback" />
                    </FormGroup>

                    <div className={styles.orderStepForm__buttons}>
                        <button type="submit" className="button" disabled={isSubmitting}>
                            {isSubmitting ? 'Проверка данных' : 'Продолжить'}
                        </button>
                    </div>
                    {status && (
                        <FormGroup>
                            <div className="invalid-feedback">{status}</div>
                        </FormGroup>
                    )}
                </Form>
            )}
        </Formik>
    );
};

type TicketsFormProps = {
    initialValues?: Ticket[];
    onSubmit(tickets: Ticket[]): void;
    onClickPrev(tickets: Ticket[]): void;
    customer: Customer;
    types: EventTickets['types'];
};

const TicketsForm: React.FC<TicketsFormProps> = (props) => {
    const ticketFactory = React.useCallback(
        (defaults: Partial<Ticket> = {}) => ({
            type_id: props.types.length === 1 ? props.types[0].id.toString() : '',
            first_name: defaults.first_name ? defaults.first_name : '',
            last_name: defaults.last_name ? defaults.last_name : '',
            email: defaults.email ? defaults.email : '',
        }),
        [props.types],
    );

    const schema = React.useMemo(
        () =>
            yup.object().shape({
                tickets: yup
                    .array()
                    .of(
                        yup
                            .object()
                            // @ts-expect-error because of yup types
                            .uniqueProperty('email', 'E-mail должен быть уникальным среди всех участников')
                            .shape({
                                type_id: yup.string().required('Выберите билет'),
                                first_name: yup.string().required('Введите имя'),
                                last_name: yup.string().required('Введите фамилию'),
                                email: yup.string().email('Неверный e-amil').required('Введите e-mail'),
                            }),
                    )
                    .min(1),
            }),
        [],
    );

    return (
        <Formik
            validationSchema={schema}
            initialValues={{
                tickets: props.initialValues || [ticketFactory(props.customer)],
            }}
            onSubmit={({ tickets }) => {
                props.onSubmit(tickets);
            }}
        >
            {({ values, isSubmitting, status }) => (
                <Form className={styles.orderStepForm}>
                    <FieldArray
                        name="tickets"
                        render={(arrayHelpers) =>
                            values.tickets.map((_, index) => (
                                <div key={index}>
                                    <p className={styles.orderStepForm__title}>
                                        Участник №{index + 1}{' '}
                                        {index > 0 && (
                                            <button
                                                style={{ float: 'right' }}
                                                type="button"
                                                className="button button_size_small button_theme_link"
                                                onClick={() => arrayHelpers.remove(index)}
                                            >
                                                удалить
                                            </button>
                                        )}
                                    </p>
                                    <FormGroup>
                                        <Field
                                            component="select"
                                            name={`tickets[${index}].type_id`}
                                            id={`ticket_${index}_type_id`}
                                            className="form-control"
                                            disabled={props.types.length === 1}
                                        >
                                            <option value="">Выберите тип билета</option>
                                            {props.types
                                                .filter((type) => !type.disabled)
                                                .map((type) => (
                                                    <option key={type.id} value={type.id}>
                                                        {type.name}
                                                    </option>
                                                ))}
                                        </Field>
                                        <ErrorMessage
                                            name={`tickets[${index}].type_id`}
                                            component="div"
                                            className="invalid-feedback"
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <label htmlFor={`ticket_${index}_first_name`}>Имя</label>
                                        <Field
                                            type="text"
                                            name={`tickets[${index}].first_name`}
                                            id={`ticket_${index}_first_name`}
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name={`tickets[${index}].first_name`}
                                            component="div"
                                            className="invalid-feedback"
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <label htmlFor={`ticket_${index}_last_name`}>Фамилия</label>
                                        <Field
                                            type="text"
                                            name={`tickets[${index}].last_name`}
                                            id={`ticket_${index}_last_name`}
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name={`tickets[${index}].last_name`}
                                            component="div"
                                            className="invalid-feedback"
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <label htmlFor={`ticket_${index}_email`}>E-mail</label>
                                        <Field
                                            type="email"
                                            name={`tickets[${index}].email`}
                                            id={`ticket_${index}_email`}
                                            className="form-control"
                                        />
                                        <ErrorMessage
                                            name={`tickets[${index}].email`}
                                            component="div"
                                            className="invalid-feedback"
                                        />
                                    </FormGroup>
                                    {index + 1 === values.tickets.length && (
                                        <button
                                            type="button"
                                            className="button button_size_small button_theme_link"
                                            onClick={() => arrayHelpers.insert(index + 1, ticketFactory())}
                                        >
                                            Добавить еще участника
                                        </button>
                                    )}
                                </div>
                            ))
                        }
                    />
                    <div className={styles.orderStepForm__buttons}>
                        <button
                            type="button"
                            className="button"
                            onClick={() => {
                                props.onClickPrev(values.tickets);
                            }}
                        >
                            Назад
                        </button>{' '}
                        <button type="submit" className="button" disabled={isSubmitting}>
                            {isSubmitting ? 'Проверка данных' : 'Продолжить'}
                        </button>
                    </div>
                    {status && (
                        <FormGroup>
                            <div className="invalid-feedback">{status}</div>
                        </FormGroup>
                    )}
                </Form>
            )}
        </Formik>
    );
};

type Order = {
    id: string;
    payment_url: string;
    cancel_url: string;
    reserved_to: string;
    currency_id: string;
    price: number;
};

type PaymentFormProps = {
    payments: EventTickets['payments'];
    customer: Customer;
    tickets: Ticket[];
    eventId: number;
    onClickPrev(): void;
    onSubmit(order: Order): void;
};

const PaymentForm: React.FC<PaymentFormProps> = (props) => {
    const schema = React.useMemo(
        () =>
            yup.object().shape({
                payment_id: yup.string().required('Укажите способ оплаты'),
            }),
        [],
    );

    return (
        <Formik
            initialValues={{
                payment_id: props.payments.length === 1 ? props.payments[0].id.toString() : '',
            }}
            validationSchema={schema}
            initialStatus={null}
            onSubmit={async (values, actions) => {
                actions.setStatus(null);
                actions.setSubmitting(true);

                try {
                    const order = await api.eventOrder(props.eventId, {
                        ...props.customer,
                        ...values,
                        tickets: props.tickets,
                    });

                    const params = {
                        event_id: props.eventId,
                        order_id: order.id,
                        currency: order.currency_id,
                        order_price: order.price,
                    };

                    ym(53951545, 'reachGoal', 'event_order_success', params);

                    _tmr.push({ type: 'reachGoal', goal: 'event_order_success', value: order.price, params });

                    props.onSubmit(order);
                } catch (e: unknown) {
                    if (e instanceof Response) {
                        switch (e.status) {
                            case 400: {
                                const errors = await e.json();

                                Object.keys(errors).forEach((field) => {
                                    if (['non_field_errors', '__all__'].includes(field)) {
                                        actions.setStatus(errors[field][0]);
                                        return;
                                    }

                                    if (['payment_id', 'legal_name', 'inn'].includes(field)) {
                                        actions.setFieldError(field, errors[field][0]);
                                    } else {
                                        throw Error(`Error for unknown field ${field}`);
                                    }
                                });

                                break;
                            }
                            default:
                                actions.setStatus('Неизвестная ошибка, попробуйте еще раз');
                                throw e;
                        }
                    } else {
                        try {
                            // @ts-expect-error trying cast to string
                            actions.setStatus(e.toString());
                        } finally {
                        }

                        throw e;
                    }
                } finally {
                    actions.setSubmitting(false);
                }
            }}
        >
            {({ values, isSubmitting, status }) => {
                type Payment = (typeof props.payments)[0];
                let payment: Payment | null = null;

                if (values.payment_id) {
                    payment = props.payments.find((payment) => payment.id.toString() === values.payment_id) as Payment;
                }
                return (
                    <Form className={styles.orderStepForm}>
                        <FormGroup>
                            <Field
                                component="select"
                                name="payment_id"
                                id="payment_id"
                                className="form-control"
                                disabled={props.payments.length === 1}
                            >
                                <option value="">Выберите способ оплаты</option>
                                {props.payments
                                    .filter((payment) => ['invoice', 'card', 'free'].includes(payment.type))
                                    .map((payment) => (
                                        <option key={payment.id} value={payment.id}>
                                            {payment.type === 'invoice' && 'По счету'}
                                            {payment.type === 'card' && 'Банковской картой'}
                                            {payment.type === 'free' && 'Бесплатно'}
                                        </option>
                                    ))}
                            </Field>
                            <ErrorMessage name="payment_id" component="div" className="invalid-feedback" />
                        </FormGroup>
                        {payment && payment.type === 'invoice' && (
                            <React.Fragment>
                                <FormGroup>
                                    <label htmlFor="legal_name">Название компании</label>
                                    <Field type="text" name="legal_name" id="legal_name" className="form-control" />
                                    <ErrorMessage name="legal_name" component="div" className="invalid-feedback" />
                                </FormGroup>

                                <FormGroup>
                                    <label htmlFor="inn">ИНН</label>
                                    <Field type="text" name="inn" id="inn" className="form-control" />
                                    <ErrorMessage name="inn" component="div" className="invalid-feedback" />
                                </FormGroup>
                            </React.Fragment>
                        )}
                        <div className={styles.orderStepForm__buttons}>
                            <button type="button" className="button" onClick={props.onClickPrev}>
                                Назад
                            </button>{' '}
                            <button type="submit" className="button button_theme_blue" disabled={isSubmitting}>
                                {isSubmitting ? 'Проверка данных' : 'Купить'}
                            </button>
                        </div>
                        {status && (
                            <FormGroup>
                                <div className="invalid-feedback">{status}</div>
                            </FormGroup>
                        )}
                        {payment && (
                            <p className={clsx(styles.orderStepForm__information, 'mt-2')}>
                                Нажимая на кнопку &quot;Купить&quot; вы подтверждаете, что изучили и согласны с{' '}
                                <a href={payment.agree_url} className={'underline'} target="_blank" rel="noreferrer">
                                    правовыми документами
                                </a>
                                .
                            </p>
                        )}
                    </Form>
                );
            }}
        </Formik>
    );
};

export const getServerSideProps: GetServerSideProps<EventOrderPageProps, EventOrderPageParams> = async function (
    context,
) {
    setContext(context.req);

    if (typeof context.params === 'undefined') {
        return {
            notFound: true,
        };
    }

    const eventId = parseInt(context.params.id);

    const [event, tickets] = await Promise.all([api.event(eventId), api.eventTickets(eventId)]);

    if (event === null || tickets === null || !tickets.is_active) {
        return {
            notFound: true,
        };
    }

    let profile: Profile | null = null;

    try {
        profile = await api.getProfile();
    } catch (e) {
        // ignore
    }

    return {
        props: {
            event,
            tickets,
            profile,
        },
    };
};

export default OrderPage;
