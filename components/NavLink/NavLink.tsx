import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import classNames from 'classnames';
import { withRouter, WithRouterProps } from 'next/router';

type NavLinkProps = Pick<LinkProps, Exclude<keyof LinkProps, 'passHref' | 'children' | 'onError' | 'href'>> &
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        activeClassName?: string;
    };

function NavLink(props: NavLinkProps & WithRouterProps) {
    const { prefetch, shallow, scroll, replace, href, as, className, activeClassName, router, ...anchorProps } = props;
    const active = props.href ? router!.pathname.startsWith(props.href) : false;

    return (
        <Link prefetch={prefetch} shallow={shallow} scroll={scroll} replace={replace} href={href} as={as}>
            <a
                {...anchorProps}
                className={classNames(
                    className,
                    activeClassName
                        ? {
                              [activeClassName]: active
                          }
                        : null
                )}
            />
        </Link>
    );
}

export default withRouter(NavLink);
