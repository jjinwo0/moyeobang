import React, { useEffect } from "react";
import { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { css } from "@emotion/react";
import { colors } from "@/styles/colors";
import { extractItems } from "@/util/receiptParser";
import FailByReceipt from "./FailByReceipt";
import ResultByReceiptComponent from "./ResultByReceiptComponent";
// import openAI from 'openai';

const api_url= "/api/custom/v1/34393/8f13443da4a5bb3449e36dac1ddda218c4f02d27884df6cd85905363c5603a72/general"
const secret_key= import.meta.env.VITE_OCR_API_KEY;
const open_ai_key= import.meta.env.VITE_GPT_API_KEY;

const layoutStyle = css`
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    gap:30px;
    align-items: center;
`;
// 이안에 로딩창. 이미지 사진, 웹캠 있음. z-index:0
const cameraStyle = css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:1;
    position:relative; 
    // 웹캠
    video {
        width:390px;
        height:600px;
        object-fit: cover;
        z-index:1;
    }
    // 찍힌 이미지 이미지위에 로딩선 올라와야함. relative설정.
    img {
        height:600px;
        object-fit: cover;
        position:relative;
        z-index:1;
    }
`;
// webcam위에 네모 영역
const rectangleStyle=css`
    z-index:2;
    background-color:transparent;
    border: solid 3px ${colors.third};
    width:300px;
    height:500px;
    position:absolute;
`;
// loading선 이미지위에 올라오기때문에 absolute설정.
const loadingStyle=css`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:3;

    #line{
        position: absolute;
        width: 100%;
        height: 20px;
        // 그라데이션 효과
        background: linear-gradient(
        to bottom,
        ${colors.third} 0%,      
        rgba(255, 255, 255, 0) 100% 
    );
        animation: moveUpDown 3s infinite ease-in-out;     
    }
    
    @keyframes moveUpDown {
    0% {
      top: 0;
    }
    50% {
      top: calc(100% - 20px);
    }
    100% {
      top: 0;
    }
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

type SettleByReceiptComponentProps = CompleteTransaction

export default function SettleByReceiptComponent({transactionId, money, paymentName, address, createdAt, acceptedNumber} : SettleByReceiptComponentProps) {

    const webcamRef = useRef<Webcam>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [results, setResults] = useState<TransactionDetailByReceipt>();
    const [openResultModal, setOpenResultModal] = useState<boolean>(false);

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

        setIsLoading(true); // 영수증 인식 시작!

        // axios.post(url, data, config) config: 헤더 정보
        try {
            const response = await axios.post(api_url, formData, {
                headers: {
                    'X-OCR-SECRET': secret_key,
                    "Content-Type": "multipart/form-data",
                }
            });

            // 영수증 텍스트 리스트 추출
            const receiptTexts: string[] = response.data.images[0].fields.map((field : any) => field.inferText);
            analyzeReceipt(receiptTexts.join(" "));
            } catch(error) {
                console.error(error);
                setError('OCR 처리 중 오류가 발생했습니다.')
            } finally {
                // setIsLoading(false);
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
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful assistant that extracts the purchase date, item name, quantity, and price from a receipt and outputs the information in JSON format. Ensure that the purchase date appears only once and all items are listed in a table format with their names, quantities, and prices.",
                        },
                        {
                            role: "user",
                            content: `please analyze ${stringResult}. Make sure the output is in the following JSON format: {  "purchase_date": "YYYY-MM-DD", "items": [  { "item_name" : "사과" , "quantity": 1, "price": 10.00 }, { "item_name": "포도", "quantity": 2, "price": 20.00 } ] }only items and date. If an item is free, set its cost to 0'`,
                        },
                    ],
                })
            });

            const data = await response.json();
            const message = data.choices[0].message.content;

            // JSON 문자열 추출
            const jsonStartIndex = message.indexOf("{");
            const jsonEndIndex = message.lastIndexOf("}");
            const jsonString = message.slice(jsonStartIndex, jsonEndIndex + 1);

            // JSON 문자열 파싱
            let parsedData;
            try {
                parsedData = JSON.parse(jsonString); // JSON 형식의 데이터만 추출해서 파싱
                // console.log(parsedData)
            } catch (parseError) {
                console.error("JSON 파싱 오류:", parseError);
                setError("영수증 처리 중 오류가 발생했습니다.");
                return;
            }

            // extractItems를 통해 데이터 변환
            if (parsedData && parsedData.items) {
                const results = extractItems(parsedData, transactionId, createdAt, money, paymentName, address, acceptedNumber); 
                // console.log('영수증 ocr 결과', results)
                setResults(results)
                setIsLoading(false);
                setOpenResultModal(true);
                console.log('loading:', isLoading)

            } else {
                console.error('영수증 처리 오류 발생');
                setError("영수증 처리 중 오류가 발생했습니다.");
            }

        } catch(error) {
            console.log(error)
            setError("영수증 처리 중 오류가 발생했습니다.")
        }
    } 

    function handleFailClose() {
        setError('');
        setImageSrc(null);
    }

    function handleClose() {
        setOpenResultModal(false);
        setImageSrc('');
    }

    useEffect(() => {
        console.log('isLoading:', isLoading);
    }, [isLoading]);

    return (
        <div css={layoutStyle}>
           {results && openResultModal ? (
            <ResultByReceiptComponent data={results} onClose={handleClose} isNew={true} />
        ) : (
            <>
                <div css={cameraStyle}>
                    {imageSrc ? (
                        <>
                            <img src={imageSrc} alt="capture_img" />
                            {isLoading && (
                                <div css={loadingStyle}>
                                    <div id='line' />
                                </div> 
                            )}
                        </>
                    ) : (
                        <>
                        <Webcam 
                        ref={webcamRef} 
                        screenshotFormat="image/jpeg"
                        videoConstraints={{ facingMode: "environment" }} // 모바일 후면 카메라 사용
                        />
                        <div css={rectangleStyle} />
                        </>
                    )}
                </div>
                <div css={buttonStyle}>
                    <button onClick={handleCapture}/>
                </div>
            </>
        )}
        {error && <FailByReceipt onClose={handleFailClose} />}
        </div>
    )
}