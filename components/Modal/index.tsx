import * as React from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';

import './index.css';

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
                base: classNames('modal__body', props.className),
                afterOpen: 'modal__body_after-open',
                beforeClose: 'modal__body_before-close'
            }}
            overlayClassName={{
                base: 'modal__overlay',
                afterOpen: 'modal__overlay_after-open',
                beforeClose: 'modal__overlay_before-close'
            }}
            closeTimeoutMS={200}
            portalClassName="modal"
            bodyOpenClassName=""
            htmlOpenClassName=""
        >
            <button className="modal__close-button" type="button" onClick={handleClickClose}>
                <img src="/static/close.svg" alt="" />
            </button>
            <div className="modal__title">{props.title}</div>
            <div className="modal__content">{props.children}</div>
        </ReactModal>
    );
};

export default Modal;
