import React from 'react';
import { Meta, Story } from '@storybook/react';

import Input from '../components/Input/Input';
import { ExclamationCircleIcon, MailIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid';

export default {
    title: 'Components/Input Groups',
    component: Input,
    decorators: [
        (Story) => (
            <div className='w-full max-w-xs mx-auto'>
                <Story />
            </div>
        )
    ]
} as Meta;

export const withLabel: Story = () => (
    <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
        </label>
        <div className="mt-1">
            <Input
                type="text"
                name="email"
                id="email"
                placeholder="you@example.com"
            />
        </div>
    </div>
);

withLabel.storyName = 'Input with label'

export const withLabelAndHelpText: Story = () => (
    <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
        </label>
        <div className="mt-1">
            <Input
                type="text"
                name="email"
                id="email"
                placeholder="you@example.com"
                aria-describedby="email-description"
            />
        </div>
        <p className="mt-2 text-sm text-gray-500" id="email-description">
            We&apos;ll only use this for spam.
        </p>
    </div>
);

withLabelAndHelpText.storyName = 'Input with label and help text'


export const withValidationError: Story = () => (
    <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
            <Input
                type="text"
                name="email"
                id="email"
                className="pr-10"
                placeholder="you@example.com"
                defaultValue="adamwathan"
                aria-invalid="true"
                aria-describedby="email-error"
                theme='error'
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
        </div>
        <p className="mt-2 text-sm text-red-600" id="email-error">
            Your password must be less than 4 characters.
        </p>
    </div>
);

withValidationError.storyName = 'Input with validation error'
