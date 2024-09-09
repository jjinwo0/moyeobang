import HeaderContainer from "./HeaderContainer/HeaderContainer"
import BackButton from "./ButtonIcon/BackButton"
import { css } from "@emotion/react"

export default function HeaderWithXbutton() {

    const leftStyle = css`
    
    `;

    return (
        <HeaderContainer>
            <div css={leftStyle}>
                <BackButton />
            </div>
        </HeaderContainer>
        
    )
}