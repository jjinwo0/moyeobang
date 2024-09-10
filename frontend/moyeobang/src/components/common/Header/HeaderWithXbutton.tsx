
import { headerStyle,  closeButtonHeaderStyle} from "./HeaderStyle";
import XButton from "./ButtonIcon/XButton";
import React from "react";

interface HeaderWithXButtonProps {
    onXClick: () => void;
}


export default function HeaderWithXButton({onXClick} : HeaderWithXButtonProps) {

    return (
        <nav 
            css={[
                headerStyle,
                closeButtonHeaderStyle
            ]}
        >
            <div 
            onClick={onXClick}>
            <XButton />
            </div>
        </nav>
    )
}
