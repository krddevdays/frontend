import * as React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import './DiscussionForm.css';

export type DiscussionFormProps = {};

const schema = yup.object().shape({
    title: yup.string().required('Введите тему'),
    description: yup.string().required('Введите описание')
});

export default function DiscussionForm() {
    const initialValues = {
        title: '',
        description: ''
    };

    return (
        <article className="discussion-form">
            <div className="discussion-form__body">
                <h1 className="discussion-form__title">Добавить свою тему</h1>
                <Formik
                    initialValues={initialValues}
                    initialStatus={null}
                    validationSchema={schema}
                    onSubmit={(values, actions) => {
                        console.log(values);
                        actions.setSubmitting(true);
                        // make API call there
                    }}
                >
                    {({ isSubmitting }) => {
                        return (
                            <Form>
                                <section>
                                    <label htmlFor="title">Тема</label>
                                    <Field type="text" name="title" id="title" />
                                    <ErrorMessage name="title" component="div" className="discussion-form__error" />

                                    <label htmlFor="description">Описание</label>
                                    <Field type="text" name="description" id="description" />
                                    <ErrorMessage
                                        name="description"
                                        component="div"
                                        className="discussion-form__error"
                                    />

                                    <button type="submit" className="button" disabled={isSubmitting}>
                                        Добавить
                                    </button>
                                </section>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </article>
    );
}
