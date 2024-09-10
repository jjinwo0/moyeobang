import type { InputHTMLAttributes } from "react"
import { css } from '@emotion/react'
import 'react'

type TimeInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label:string;
    };


const timeContainerStyle = css`
    width: 136px;
    display:flex; 
    justify-content:center; 
    `;

const timeInputStyle = css`
    width:100px;
    height:45px;
    border: 1px solid #1EC0FF;
    border-radius: 50px;
    padding: 12px 16px;
    box-sizing:border-box;
    text-align:center;

    &::placeholder {
    color: #B9B9B9 !important;
    }
    `;

const labelInputStyle = css`
    display: flex;
    width:33px;
    height:46px;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    `;

export default function TimeInput({label, ...props}: TimeInputProps) {

    return (
        <div css={timeContainerStyle}>
                <input type="text" {...props} css={timeInputStyle} placeholder={label} />
                <div css={labelInputStyle}>{label}</div>
        </div> 
    )
}