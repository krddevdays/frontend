import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Response } from 'cross-fetch';
import discussionSvg from './Discussion.svg';
import Image from 'next/image';

import { useAuth } from '@/components/AuthProvider';
import * as api from '@/api';

import Tooltip from '@/components/Tooltip/Tooltip';

import styles from './DiscussionForm.module.css';

type Discussion = {
    id: number;
    event_id: number;
    title: string;
    description: string;
    votes_count: number;
    my_vote: boolean;
};
export type DiscussionFormProps = {
    eventId: number;
    onAdd: (discussion: Discussion) => void;
};

const schema = yup.object().shape({
    title: yup.string().required('Введите тему'),
    description: yup.string().required('Введите описание'),
});

export default function DiscussionForm(props: DiscussionFormProps) {
    const auth = useAuth();
    const titleRef = React.useRef<HTMLTextAreaElement | null>(null);
    const descriptionRef = React.useRef<HTMLTextAreaElement | null>(null);
    const submitRef = React.useRef<HTMLButtonElement | null>(null);

    const [confirmed, setConfirmed] = React.useState(false);

    return (
        <React.Fragment>
            {!confirmed && (
                <div className={styles.discussionForm}>
                    <div className={styles.discussionForm__body}>
                        <Image
                            src={discussionSvg}
                            alt=""
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                            }}
                        />
                    </div>
                    <div className={styles.discussionForm__footer}>
                        <button
                            type="submit"
                            className="button button_theme_blue button_full-width"
                            onClick={(e) => {
                                e.preventDefault();
                                setConfirmed(true);
                                setTimeout(() => {
                                    ym(53951545, 'reachGoal', 'click_want_own_discussion');
                                }, 0);
                            }}
                        >
                            Хочу подать свою тему
                        </button>
                    </div>
                </div>
            )}
            {confirmed && (
                <Formik
                    initialValues={{
                        title: '',
                        description: '',
                    }}
                    initialStatus={null}
                    validationSchema={schema}
                    onSubmit={async (values, actions) => {
                        actions.setStatus(null);
                        actions.setSubmitting(true);

                        let finished = false;
                        while (!finished) {
                            try {
                                const discussion = await api.addDiscussion({ ...values, event_id: props.eventId });
                                props.onAdd(discussion);
                                actions.resetForm();
                                finished = true;
                                setTimeout(() => {
                                    ym(53951545, 'reachGoal', 'add_own_discussion');
                                }, 0);
                            } catch (e: unknown) {
                                if (e instanceof Response) {
                                    switch (e.status) {
                                        case 403:
                                            try {
                                                await auth();
                                            } catch (e) {
                                                finished = true;
                                            }
                                            break;
                                        case 400:
                                            const errors = await e.json();

                                            Object.keys(errors).forEach((field) => {
                                                if (['non_field_errors', '__all__'].includes(field)) {
                                                    actions.setStatus(errors[field][0]);
                                                    return;
                                                }

                                                actions.setFieldError(field, errors[field][0]);
                                            });
                                            finished = true;
                                            break;
                                        default:
                                            alert('Неизвестная ошибка, попробуйте еще раз');
                                            throw e;
                                    }
                                } else {
                                    alert('Неизвестная ошибка, попробуйте еще раз');
                                    throw e;
                                }
                            } finally {
                                actions.setSubmitting(false);
                            }
                        }
                    }}
                >
                    {({ isSubmitting, errors, touched, status }) => {
                        return (
                            <Form className={styles.discussionForm}>
                                <div className={styles.discussionForm__body}>
                                    <Field
                                        component="textarea"
                                        name="title"
                                        id="title"
                                        className={styles.discussionForm__title}
                                        placeholder="Название темы"
                                        innerRef={titleRef}
                                    />
                                    {errors.title && touched.title && (
                                        <Tooltip refObject={titleRef} placement="top">
                                            {errors.title}
                                        </Tooltip>
                                    )}

                                    <Field
                                        component="textarea"
                                        name="description"
                                        className={styles.discussionForm__description}
                                        placeholder="Описание темы"
                                        innerRef={descriptionRef}
                                    />
                                    {errors.description && touched.description && (
                                        <Tooltip refObject={descriptionRef} placement="top">
                                            {errors.description}
                                        </Tooltip>
                                    )}
                                </div>
                                <div className={styles.discussionForm__footer}>
                                    <button
                                        type="submit"
                                        className="button button_theme_blue button_full-width"
                                        disabled={isSubmitting}
                                        ref={submitRef}
                                    >
                                        Подать
                                    </button>
                                    {status && (
                                        <Tooltip refObject={submitRef} placement="bottom">
                                            {status}
                                        </Tooltip>
                                    )}
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            )}
        </React.Fragment>
    );
}
