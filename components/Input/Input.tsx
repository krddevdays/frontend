import * as React from 'react';
import classNames from 'classnames';

type InputProps =
    {
        theme?: 'error'
    }
    & React.ComponentProps<'input'>

const Input: React.FC<InputProps> = (props) => {
        const { theme, className, ...inputProps } = props;
        return (
            <input
                {...inputProps}
                className={classNames('block w-full sm:text-sm rounded-md', {
                    'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500': theme !== 'error',
                    'border-red-300 focus:ring-red-500 focus:border-red-500 text-red-900 placeholder-red-300': theme === 'error'
                }, className)}
            />
        );
    }
;

export default Input;
