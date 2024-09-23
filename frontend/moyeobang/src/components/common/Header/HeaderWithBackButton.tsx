
import { headerStyle, backButtonHeaderStyle } from "./HeaderStyle";
import BackButton from "./ButtonIcon/BackButton";
import React from "react";

export default function HeaderWithBackButton() {

    return (
        <nav 
            css={[
                headerStyle,
                backButtonHeaderStyle
            ]}
        >
            <div>
            <BackButton/>
            </div>
        </nav>
    )
}
