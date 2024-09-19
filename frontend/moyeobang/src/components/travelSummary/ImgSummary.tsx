import {css} from '@emotion/react';

export default function ImgSummary({travelImg}) {
  const containerStyle = css`
    width: 100%;
    /* height: 100%; */
  `;
  return (
    <>
      <div css={containerStyle}>이미지 요약 페이지</div>
    </>
  );
}
