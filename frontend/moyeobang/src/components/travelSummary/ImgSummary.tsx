import {css} from '@emotion/react';
import informationIcon from '@/assets/icons/information.png';
import cloudIcon from '@/assets/icons/cloud.webp';
import roadImg from '@/assets/icons/roadImg.png';
import airplaneIcon from '@/assets/icons/airplane.webp';

interface TravelImage {
  imgUrl: string; // 이미지 URL
  locationName: string; // 장소 이름
}

interface ImgSummaryProps {
  travelImg: TravelImage[]; // travelImg는 TravelImage 객체들의 배열
}

export default function ImgSummary({travelImg}: ImgSummaryProps) {
  const containerStyle = css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const boxStyle = css`
    width: 98%;
    height: 582px;
    background-color: rgba(135, 224, 255, 0.3);
    margin: 40px 0;
    border-radius: 15px;
    position: relative; /* Position relative로 설정 */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  `;

  const informationImgStyle = css`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
  `;

  const cloudIconStyle = css`
    width: 50px;
    position: absolute;
    top: 60px;
    left: 20px;
  `;

  const roadImgStyle = css`
    margin-top: 75px;
    width: 250px;
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  `;

  const airplaneIconStyle = css`
    position: absolute;
    bottom: 40px;
    right: 20px;
    width: 80px;
  `;

  const gridContainerStyle = css`
    position: absolute;
    top: 40px; /* roadImg 위로 이미지 위치 조정 */
    left: 38%;
    transform: translateX(-50%);
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 두 개의 열로 구성 */
    gap: 20px;
    width: 75px;
    z-index: 2;
  `;

  const gridItemStyle = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  `;

  const imgStyle = css`
    width: 80px;
    height: 80px;
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: 5px;
  `;

  const placeNameStyle = css`
    font-family: 'semibold';
    font-size: 13px;
    color: #333;
  `;

  return (
    <div css={containerStyle}>
      <div css={boxStyle}>
        <img src={informationIcon} css={informationImgStyle} />
        <img src={cloudIcon} css={cloudIconStyle} />
        <img src={airplaneIcon} css={airplaneIconStyle} />
        {/* travelImg 데이터를 기반으로 이미지와 장소 이름을 roadImg 위에 표시 */}
        <div css={gridContainerStyle}>
          {travelImg.map((item, index) => (
            <div css={gridItemStyle} key={index}>
              <img src={item.imgUrl} alt={item.locationName} css={imgStyle} />
              <p css={placeNameStyle}>{item.locationName}</p>
            </div>
          ))}
        </div>
        <img src={roadImg} css={roadImgStyle} />{' '}
        {/* 도로 이미지를 맨 아래에 표시 */}
      </div>
    </div>
  );
}
