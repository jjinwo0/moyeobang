import React, { useRef, useEffect, useState } from "react"
import QrScanner from "qr-scanner"
import { css } from "@emotion/react"
import { colors } from "@/styles/colors";
import PayCompletedModal from "./PayCompletedModal";
import useTravelDetailStore from "@/store/useTravelDetailStore";
import { useMutation } from "@tanstack/react-query";
import moyeobang from "@/services/moyeobang";

const storeData = [
    {
        placeId: 'airport-1',
        placeName : '모여방윙스',
        placeAddress: '제주시 특별자치도, 공항로 2 제주국제공항',
        latitude: 0,
        longitude: 0,
        storeAccountNumber: '0012280102000441',
    },
    {
        placeId: 'starbucks-1',
        placeName : '호텔모여방',
        placeAddress: '서울특별시 강남구 테헤란로 108길 42',
        latitude: 0,
        longitude: 0,
        storeAccountNumber: '0012280102000441',
    }
]

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

const smallTextStyle = css`
    font-family: 'regular';
    font-size:15px;
`;

const bigTextStyle = css`
    font-family: 'semibold';
    font-size:24px;
`;

const englishStyle = css`
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
    const {accountNumber} = useTravelDetailStore();
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [transactionId, setTransactionId] = useState<TransactionId>();

    const {mutate: postPaymentByOnline } = useMutation({
        mutationFn: ({data} : {data: PaymentProps}) => moyeobang.postPayByOnline(data),
        onSuccess: async (response) => {
            setSuccessMessage('success')
            setTransactionId(response.data.data.transactionId)
            console.log('결제 성공!')
        },
    });

    // 결과 
    const [scannedResult, setScannedResult] = useState<OnlineQrData | null>(null);

    // 성공
    function onScanSuccuess( result : QrScanner.ScanResult ) {  

        try {
            if (result.data) {
                const data = JSON.parse(result.data);
                setScannedResult(data);
                console.log('파싱된 QR 데이터', data)
                
                const stores = storeData.filter((store) => store.placeId === data.placeId)
                const payData : PaymentProps = { 
                    ...stores[0],
                    ...data,
                    travelAccountNumber: accountNumber
                }
                console.log('post요청 데이터:', payData)

                // 결제 데이터 API 요청!
                postPaymentByOnline({data:payData})
            }


        } catch (error) {
            console.log('QR스캔 오류 발생', error)
        }
    }

    function onScanFail(error: string | Error) {
        console.log('QR스캔 실패:',error)
    }

    useEffect(()=>{
        if ( videoElement?.current && !scanner.current ) {
            scanner.current = new QrScanner( 
                videoElement?.current,
                onScanSuccuess,
                {
                    onDecodeError : onScanFail,
                    preferredCamera : "environment", // 후면지향
                    maxScansPerSecond:3, // 1초당 2번
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

    function handleClose() {
        setSuccessMessage('');
    }

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
                <div css={smallTextStyle}>오프라인 결제 • 해외결제 • 싸피페이</div>
                <div css={bigTextStyle}><span css={englishStyle}>QR</span>코드를 스캔하세요</div>
                </div>
                </>
            }
                { successMessage && transactionId && (
                    <PayCompletedModal transactionId={transactionId} onClose={handleClose}/>
                )}
        </div>
    ) 
}     