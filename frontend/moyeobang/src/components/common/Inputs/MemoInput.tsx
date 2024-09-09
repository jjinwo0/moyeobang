import type { InputHTMLAttributes } from "react"
import { css } from '@emotion/react'
import 'react'

type MemoInputProps = InputHTMLAttributes<HTMLInputElement> & {label: string};


const memoContainerStyle = css`
    width: 330px;
    flex-direction:column;
    display:flex;
    `;

const memoInputStyle = css`
    width:100%;
    height:100px;
    border: 1px solid #1EC0FF;
    border-radius: 25px;
    padding: 12px 16px;
    box-sizing:border-box;
    margin-top:10px;

    &::placeholder {
    color: #B9B9B9 !important;
    }
    `;


export default function MemoInput({label, ...props} : MemoInputProps) {

    return (
        <label css={memoContainerStyle}>
            {label}
            <textarea type="text" {...props} css={memoInputStyle}/>
        </label>
    )


}