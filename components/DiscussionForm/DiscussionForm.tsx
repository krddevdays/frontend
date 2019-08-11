import * as React from 'react';
import { Formik, Form, Field } from 'formik';
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
        <div className="discussion-form">
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
                        <React.Fragment>
                            <Form className="discussion-form__body">
                                <Field
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="discussion-form__title"
                                    placeholder="Название вашей темы"
                                />

                                <Field
                                    component="textarea"
                                    type="text"
                                    name="description"
                                    className="discussion-form__description"
                                    placeholder="Описание вашей темы"
                                />
                            </Form>
                            <div className="discussion-form__footer">
                                <button
                                    type="submit"
                                    className="button button_theme_blue button_full-width"
                                    disabled={isSubmitting}
                                >
                                    Подать свою тему
                                </button>
                            </div>
                        </React.Fragment>
                    );
                }}
            </Formik>
        </div>
    );
}
