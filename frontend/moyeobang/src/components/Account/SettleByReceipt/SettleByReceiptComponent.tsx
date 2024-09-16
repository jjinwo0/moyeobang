import React, { useEffect } from "react";
import { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { css } from "@emotion/react";
import { colors } from "@/styles/colors";
import { useNavigate } from "@tanstack/react-router";
import { extractItems } from "@/utils/receiptParser";
import FailByReceipt from "./FailByReceipt";
// import openAI from 'openai';

const api_url:string = "/api/custom/v1/34393/8f13443da4a5bb3449e36dac1ddda218c4f02d27884df6cd85905363c5603a72/general"
const secret_key:string = "UEVXbkNCTGFYRGtGUlFUTWhWR3NXUmdNU0dUUkV3ZVM="
const open_ai_key:string="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"

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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate({from: '/account/settle'});

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
            // console.log(9999, imageSrc)
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
            version: "V2",
            requestId: uuidv4(), // 고유한 문자열 변환!
            timestamp: new Date().getTime(),
            lang: "ko",
            images: [
                {
                    format:"jpeg",
                    name:"receipt.jpg"
                }
            ],
        };

        formData.append("message", JSON.stringify(requestJson));
        formData.append("file", imageFile)

        setIsLoading(true);

        // axios.post(url, data, config) config: 헤더 정보
        try {
            const response = await axios.post(api_url, formData, {
                headers: {
                    'X-OCR-SECRET': secret_key,
                    "Content-Type": "multipart/form-data",
                }
            });

            // 영수증 텍스트 리스트 추출
            const receiptTexts: string[] = response.data.images[0].fields.map((field: any) => field.inferText);
            analyzeReceipt(receiptTexts.join(" "));
            } catch(error) {
                console.error(error);
                setError('OCR 처리 중 오류가 발생했습니다.')
            } finally {
                setIsLoading(false);
            }
        }

    async function analyzeReceipt(stringResult:string) {
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${open_ai_key}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful assistant that extracts data from receipts and outputs it in JSON format. Please extract information such as approval number, address, place name, time separately, and present product names, quantities, and prices in a table format.",
                        },
                        {
                            role: "user",
                            content: `Here is the receipt text: ${stringResult}. Please extract the approval number, address, place name, and time separately. Also, output product names, quantities, and prices in a table format.`,
                        },
                    ],
                })
            });

            const data = await response.json();
            const message = data.choices[0].message.content;
            console.log(message)

            // JSON 문자열 파싱
            let parsedData;
            try {
                parsedData = JSON.parse(message);
            } catch (parseError) {
                console.error("JSON 파싱 오류:", parseError);
                setError("영수증 처리 중 오류가 발생했습니다.");
                return;
            }

            // extractItems를 통해 데이터 변환
            if (parsedData && parsedData.products) {
                const results = extractItems(parsedData); 
                console.log(results);
            

            // 이걸 이제 back에 POST로 보내주면 됨. 
            //성공시! 받은 transactionId를 이용해 결과 수정페이지로 이동
            const transactionId :TransactionId = 1; // 실제 값으로 대체
            navigate({ to: `/account/resultByReceipt/${transactionId}` });
            } else {
                console.error('정보없음');
                setError("영수증 처리 중 오류가 발생했습니다.");
            }


        } catch(error) {
            console.log(error)
            setError("영수증 처리 중 오류가 발생했습니다.")
        }
    } 

    return (
        <div css={layoutStyle}>
                <div css={cameraStyle}>
                {imageSrc ? (
                    <img src={imageSrc} alt="capture_img" />
                ) : (
                    <Webcam 
                    ref={webcamRef} 
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode: "environment" }} // 모바일 후면 카메라 사용
                    />
                )}
                </div>
                <div css={buttonStyle}>
                <button onClick={handleCapture}>촬영</button>
                </div>
            
            {isLoading && <div>처리 중...</div>}

            {error && <FailByReceipt/>}

        </div>
    )
}