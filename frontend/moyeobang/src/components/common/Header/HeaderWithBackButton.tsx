
import { headerStyle, backButtonHeaderStyle } from "./HeaderStyle";
import BackButton, { BackButtonProps } from "./ButtonIcon/BackButton";
import React from "react";


export default function HeaderWithBackButton({onClick}:BackButtonProps) {

    return (
        <nav 
            css={[
                headerStyle,
                backButtonHeaderStyle
            ]}
        >
            <div>
            <BackButton onClick={onClick}/>
            </div>
        </nav>
    )
}
