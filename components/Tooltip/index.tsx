import * as React from 'react';
import { Placement, ReferenceObject } from 'popper.js';
import { Popper } from 'react-popper';

import styles from './index.module.css';

type TooltipProps<T> = {
    refObject: React.RefObject<T>;
    children: React.ReactNode;
    placement?: Placement;
};

export default function Tooltip<T extends ReferenceObject>(props: TooltipProps<T>) {
    return (
        <Popper referenceElement={props.refObject.current || undefined} placement={props.placement}>
            {({ ref, style, placement, arrowProps }) => (
                <div ref={ref} style={style} data-placement={placement} className={styles.tooltip}>
                    {props.children}
                    <div ref={arrowProps.ref} style={arrowProps.style} className={styles.tooltip__arrow} />
                </div>
            )}
        </Popper>
    );
}
