import React, { useRef, useEffect, useState } from "react"
import QrScanner from "qr-scanner"
import { css } from "@emotion/react"
import PayCompletedModal from "./PayCompletedModal";

const cameraViewStyle = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    
`;


export default function QRScan({isCompleted} : {isCompleted:boolean}) {

    // const [isCompleted, setIsCompleted] = useState<boolean>(false);

    // const scanner = useRef<QrScanner>();
    // const videoElement = useRef<HTMLVideoElement>();


    return (
        <div>
            <PayCompletedModal />

        </div>
    ) 
}     