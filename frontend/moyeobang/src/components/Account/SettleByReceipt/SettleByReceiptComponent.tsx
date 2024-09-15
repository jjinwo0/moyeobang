import React, { useEffect } from "react";
import { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { css } from "@emotion/react";
import { colors } from "@/styles/colors";


const api_url:string = "/api/custom/v1/34393/8f13443da4a5bb3449e36dac1ddda218c4f02d27884df6cd85905363c5603a72/general"
const secret_key:string = "UEVXbkNCTGFYRGtGUlFUTWhWR3NXUmdNU0dUUkV3ZVM="

const layoutStyle = css`
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    gap:30px;
    align-items: center;
`;

const cameraStyle = css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    video {
        width:390px;
        height:600px;
        object-fit: cover;
    }
    img {
        height:600px;
        object-fit: cover;
    }
`;

const buttonStyle = css`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: solid 5px ${colors.third};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
        width: 60px;
        height: 60px;
        background-color: ${colors.third};
        border: solid 0px transparent;
        border-radius: 50%;
    }
`;

export default function SettleByReceiptComponent() {

    const webcamRef = useRef<Webcam>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [ocrResult, setOcrResult] = useState(null);
    const [error, setError] = useState<string>('');

    // Base64 데이터를 Blob 파일로 변환
    const base64ToFile = (base64Data: string, filename: string) => {
        const byteString = atob(base64Data.split(",")[1]);
        const mimeString = base64Data.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new File([ab], filename, { type: mimeString });
    };

    function handleCapture() {
        try {
            const imageSrc = webcamRef.current?.getScreenshot();
            console.log(9999, imageSrc)
            if (imageSrc) {
                const imageFile = base64ToFile(imageSrc, 'receipt.jpeg')
                setImageSrc(imageSrc)
                sendToOCR(imageFile);
            }
        } catch {
            setError('카메라 사용이 허용되지 않았습니다.');
        }
    };


    async function sendToOCR(imageFile : File) {

        const formData = new FormData()
        const requestJson = {
            version: "V1",
            requestId: uuidv4(), // 고유한 문자열 변환!
            timestamp: new Date().getTime(),
            lang: "ko",
            images: [
                {
                    format:"jpeg",
                    name:"receipt.jpg"
                }
            ],
            // enableTableDetection: true //문서 내 표(Table) 영역을 자동 인식 후 글자(Text)와 함께 구조화된 형태로 제공.
        };

        formData.append("message", JSON.stringify(requestJson));
        formData.append("file", imageFile)
        // axios.post(url, data, config) config: 헤더 정보
        try {
            const response = await axios.post(api_url, formData, {
                headers: {
                    'X-OCR-SECRET': secret_key,
                    "Content-Type": "multipart/form-data",
                }
            });

            setOcrResult(response.data); // OCR 결과
        } catch(error) {
            console.log(error)
            setError("OCR처리 중 오류가 발생했습니다.")
        }
    }


    return (
        <div css={layoutStyle}>
            <div css={cameraStyle}>
            { imageSrc ? (
                <img 
                src={imageSrc} 
                alt="capture_img" 
                />
            ) : ( 
                <Webcam 
                ref={webcamRef} 
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "environment" }} // 모바일 후면 적용
                />
            )}
            </div>
            <div css={buttonStyle}>
                <button onClick={handleCapture}/>
            </div>

            {ocrResult && 
            <div>ocr결과 : {JSON.stringify(ocrResult)}</div>
            }

            {error &&
            <div>오류 : {error}</div>
            }

        </div>
    )
}