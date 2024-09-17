import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import './modal.style.scss';
import { time } from 'console';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

type ModalProps = {
    children: React.ReactNode;
    footerChildren?: React.ReactNode;
    title?: string;
    transitionTimeMs?: number;
    closeOnBackdropClick?: boolean;
    onClose?: Function;
    showCloseButton?: boolean;
}

export type ModalRef = {
    open: Function;
    close: Function;
}

export const Modal = forwardRef(({ showCloseButton = true, onClose, closeOnBackdropClick = true, transitionTimeMs = 300, title, children, footerChildren }: ModalProps, ref) => {
    const [openClass, setOpenClass] = useState("");
    const [visibleClass, setVisibleClass] = useState("");
    const [justMounted, setJustMounted] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;

        // console.log("is modal open", open);

        if (isOpen) {
            setJustMounted(false);
            setOpenClass("modal_open");
            timeout = setTimeout(() => { setVisibleClass("modal_visible") }, 10);
        } else {

            if (justMounted)
                setJustMounted(false);
            else {
                setVisibleClass("");
                timeout = setTimeout(() => { setOpenClass(""); }, transitionTimeMs);
            }
        }

        if (timeout)
            return () => clearTimeout(Number(timeout));

    }, [isOpen]);

    const open = () => {
        setIsOpen(true);
    }

    const close = () => {
        if (closeOnBackdropClick)
            setIsOpen(false);

        if (onClose)
            onClose();
    }

    useImperativeHandle(ref, () => {
        return {
            open,
            close
        }
    }, []); 

    return (
        <div className={`modal ${openClass} ${visibleClass}`} style={{ "transition": `${transitionTimeMs}ms opacity ease` }}>
            <div className={`modal__backdrop ${closeOnBackdropClick ? "modal__backdrop_clickable" : ""}`} aria-label='close' onClick={close}>
            </div>
            <div className="modal__dialog">
                <div className="modal__header">
                    {title && <div className="modal__title">{title}</div>}
                    {showCloseButton && <button className="modal__close" onClick={close}><FontAwesomeIcon icon={faClose} /></button>}
                </div>
                <div className="modal__body">{children}</div>
                {footerChildren && <div className="modal__footer">{footerChildren}</div>}
            </div>

        </div>
    )
});