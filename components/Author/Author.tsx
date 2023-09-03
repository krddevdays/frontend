import * as React from 'react';
import classNames from 'classnames';
import avatarSvg from './DefaultAvatar.svg';

import Image from 'next/image';

export type AuthorProps = {
    className?: string;
    small?: boolean;
    first_name: string;
    last_name: string;
    avatar: string | null;
    work: string | null;
    position: string | null;
};

export default function Author(props: AuthorProps) {
    const fullName = [props.first_name, props.last_name].join(' ');

    return (
        <div className={`flex items-center justify-between space-x-3 ${props.className}`}>
            <div
                className={classNames('relative bg-gray-300 rounded-full flex-shrink-0 overflow-hidden', {
                    'w-12 h-12': !props.small,
                    'w-6 h-6': props.small,
                })}
            >
                <Image
                    loading="lazy"
                    src={props.avatar || avatarSvg}
                    alt={fullName}
                    fill
                    sizes="100vw"
                    style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                />
            </div>
            <div className="flex-1">
                <p
                    className={classNames({
                        'text-sm': !props.small,
                        'text-xs': props.small,
                    })}
                >
                    {fullName}
                </p>
                {!props.small && (
                    <p className="text-gray-500 text-xs">
                        {[props.position, props.work].filter((v) => v !== null).join(', ')}
                    </p>
                )}
            </div>
        </div>
    );
}
