
import { headerStyle,  closeButtonHeaderStyle} from "./HeaderStyle";
import XButton from "./ButtonIcon/XButton";
import React from "react";


export default function HeaderWithXButton() {

    return (
        <nav 
            css={[
                headerStyle,
                closeButtonHeaderStyle
            ]}
        >
            <div>
            <XButton />
            </div>
        </nav>
    )
}
