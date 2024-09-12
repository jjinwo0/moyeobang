import { css } from "@emotion/react";
import React from "react";
import type {HTMLAttributes, PropsWithChildren} from "react";

const backdropStyle = css`
    position: absolute;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6);
`;



type BackdropProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>

export default function Backdrop({children,...props}:BackdropProps){
  return <div {...props} css={backdropStyle}>
                {children}
        </div>
}