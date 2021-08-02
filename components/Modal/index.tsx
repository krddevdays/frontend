import * as React from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';

import styles from './index.module.css';

type ModalProps = {
    className?: string;
    onRequestClose: () => void;
    isOpen: boolean;
    onAfterClose: () => void;
    title: React.ReactChild;
    children: React.ReactNode;
};

const Modal = (props: ModalProps) => {
    const handleClickClose: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
        e => {
            e.preventDefault();
            props.onRequestClose();
        },
        [props.onRequestClose]
    );

    return (
        <ReactModal
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            onAfterClose={props.onAfterClose}
            className={{
                base: classNames(styles.modal__body, props.className),
                afterOpen: styles.modal__body_afterOpen,
                beforeClose: styles.modal__body_beforeClose
            }}
            overlayClassName={{
                base: styles.modal__overlay,
                afterOpen: styles.modal__overlay_afterOpen,
                beforeClose: styles.modal__overlay_beforeClose
            }}
            closeTimeoutMS={200}
            portalClassName={styles.modal}
            bodyOpenClassName=""
            htmlOpenClassName=""
        >
            <button className={styles.modal__closeButton} type="button" onClick={handleClickClose}>
                <img src="/static/close.svg" alt="" />
            </button>
            <div className={styles.modal__title}>{props.title}</div>
            <div className={styles.modal__content}>{props.children}</div>
        </ReactModal>
    );
};

export default Modal;
