import { HTMLAttributes } from "react";
import { css } from "@emotion/react";
import BackButton from "../ButtonIcon/BackButton";
import AlramButton from "../ButtonIcon/AlramButton";
import QRButton from "../ButtonIcon/QRButton";
import XButton from "../ButtonIcon/XButton";

const headerStyle = css`
    position: fixed;
    top:0;
    left:0;
    right:0;
    display:flex;
    align-items:center;
    height: 50px;S
    padding: 0 10px;
    perspective:0;
    z-index:9999;
    background-color:white;
`;

// 왼쪽 백버튼
const backButtonHeaderStyle = css`
    ${headerStyle}
    justify-content: flex-start;
`;

// 오른쪽 백버튼
const closeButtonHeaderStyle = css`
    ${headerStyle}
    justify-content: flex-end;
`;

// 오른쪽 큐알 알람
const towIconsHeaderStyle = css`
    ${headerStyle}
    justify-content: flex-end;
`;

export default function HeaderContainer({ 
    type,
    css: addStyle,
     ...props} : HTMLAttributes<HTMLDivElement> & {type:'back' | 'close' | 'two-icons'}) {

    return (
        <nav 
        {...props}
        css={[
            type==='back' 
            ? backButtonHeaderStyle
            : type==='close'
            ? closeButtonHeaderStyle
            : towIconsHeaderStyle,
            addStyle
        ]}
        >
            {type==='back' && <BackButton />}
            {type==='close' && <XButton />}
            {type==='twoIcons' && 
            <div>
            <QRButton/>
            <AlramButton/>
            </div>
            }

        </nav>
    )
}