import { css } from "@emotion/react";
import React from "react";
import type {HTMLAttributes, PropsWithChildren} from "react";
import {useRef} from "react";
import Backdrop from "./Backdrop/Backdrop";
import useOnClickOutside from "@/hooks/useOnClickOutside";

type FinalModalProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {
    onClickOutside: VoidFunction;
  }

export default function FinalModal({children, onClickOutside, ...props} : FinalModalProps) {

    const modalRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(modalRef, onClickOutside);

    return (
        <Backdrop>
            <div ref={modalRef} {...props}>{children}</div>
        </Backdrop>
    )

}