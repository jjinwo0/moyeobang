import React, { useRef, useEffect, useState } from "react"
import QrScanner from "qr-scanner"
import { css } from "@emotion/react"
import { colors } from "@/styles/colors";
// import PayCompletedModal from "./PayCompletedModal";

const qrReaderLayoutStyle = css`
    padding-top: 30px;
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction:column;
    position : relative; 
    video { 
    width : 100% ; 
    height : 600px; 
    object-fit : cover; 
    } 
`;

const qrBoxStyle = css`
    width : 300px !important; 
    height: 300px !important; 
    border: 2px solid ${colors.third};
    border-radius: 15px;
    position: absolute;
    top: 25%;
    left: 12% !important;
`;

// const resultStyle = css`
//   font-family:'semibold';
//   text-align: center;
//   font-size: 20px;
// `;

const smallText = css`
    font-family: 'regular';
    font-size:15px;
`;

const bigText = css`
    font-family: 'semibold';
    font-size:24px;
`;

const english = css`
    font-family: 'english';
    font-size:32px;
`;

const textBoxStyle= css`
    display:flex;
    flex-direction:column;
    margin-top:30px;
    justify-content:center;
    align-items:center;
    gap:20px;
`;

export default function QrScan() {
    
    const scanner = useRef<QrScanner>();
    const videoElement = useRef<HTMLVideoElement>(null);
    const qrBoxElement = useRef<HTMLDivElement>(null);
    const [qrOn, setQrOn] = useState<boolean>(true);

    // 결과 
    const [scannedResult, setScannedResult] = useState<string | undefined>("");

    // 성공
    function onScanSuccuess( result : QrScanner.ScanResult ) {
        console.log(result);
        setScannedResult(result?.data)
        // 성공 sse 받아오기!
    }

    function onScanFail(error: string | Error) {
        console.log(error)
    }

    useEffect(()=>{
        if ( videoElement?.current && !scanner.current ) {
            scanner.current = new QrScanner( 
                videoElement?.current,
                onScanSuccuess,
                {
                    onDecodeError : onScanFail,
                    preferredCamera : "environment", // 후면지향
                    maxScansPerSecond:2, // 1초당 2번
                    highlightScanRegion : true, // ? 알아보기
                    highlightCodeOutline : true, // QR주변 윤곽선 생성
                    overlay : qrBoxElement?.current || undefined,
                }
            );

            //QR스캐너 시작
            scanner?.current?.start()
            .then(() => 
                setQrOn(true)
            )
            .catch((error : Error) => {
                if (error) {
                    setQrOn(false);
                }
            });
        }

        // 언마운트시
        return () => {
            if (!videoElement.current) {
                scanner?.current?.stop();

            }
        }

    }, [])

    // 브라우저에 카메라가 허용되지 않은 경우
    useEffect(()=> {
        if ( !qrOn) {
            alert("카메라가 차단되었거나 접근할 수 없습니다.")
        }
    }, [qrOn])

    // 결제완료 => 모달 닫기
    // function handleClose() {
    //     setScannedResult('');
    //     onClose();
    // }

    // 결제완료 => 정산하기
    // function handleSettle() {
    //     handleClose()
    //     console.log('결제완료')
    // }

    return (
        <div css={qrReaderLayoutStyle}>
            { !scannedResult && 
                <>
                <video ref={videoElement} ></video>
                <div 
                css={qrBoxStyle}
                ref={qrBoxElement}>
                </div>
                <div css={textBoxStyle}>
                <div css={smallText}>오프라인 결제 • 해외결제 • 싸피페이</div>
                <div css={bigText}><span css={english}>QR</span>코드를 스캔하세요</div>
                </div>
                </>
            }
                { scannedResult && (
                    <div>결제완료.!(QrScan컴포넌트)</div>
                    // <PayCompletedModal onClose={handleClose} transactionId={transactionId}/>
                    // <p css={resultStyle}>
                    //     스캔 결과 : {scannedResult}
                    // </p>
                )}
        </div>
    ) 
}     