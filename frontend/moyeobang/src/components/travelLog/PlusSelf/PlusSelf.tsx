import React, {useState, useEffect} from 'react';
import {css} from '@emotion/react';
import HeaderWithXButton from '../../common/Header/HeaderWithXbutton';
import {colors} from '@/styles/colors';
import * as PlusSelfStyle from '@/components/travelLog/PlusSelf/PlusSelfStyle';
import Btn from '../../common/btn/Btn';
import LocationInput from '../../common/Inputs/LocationInput';
import LabeledInput from '../../common/Inputs/LabeledInput';
import TimeInput from '../../common/Inputs/TimeInput';
import addTravelPhoto from '@/assets/icons/addTravelPhoto.png';
import searchImg from '@/assets/icons/Search.png';
import useTravelDetailStore from '@/store/useTravelDetailStore';
import {useTravelLogContext} from '@/contexts/TravelLog';

interface PlusSelfProps {
  handleShowPlusSelf: () => void; // 함수형 props 정의
  handleShowMapSearch: () => void;
  handleSearchLocation: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchLocation: string | undefined;
  setSearchLocation: () => void;
}

export default function PlusSelf({
  handleShowPlusSelf,
  handleShowMapSearch,
  handleSearchLocation,
  searchLocation,
  setSearchLocation,
}: PlusSelfProps) {
  const {travelPlaceList} = useTravelDetailStore();
  const [AMPMSelection, setAMPMSelection] = useState<'AM' | 'PM'>('AM');
  const handleAMPMSelection = () => {
    setAMPMSelection(prev => (prev === 'AM' ? 'PM' : 'AM'));
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleAddImg = () => {
    // input[type="file"]을 클릭하는 로직 추가
    document.getElementById('imageInput')?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // 이미지 URL 생성
      setSelectedImage(imageUrl); // 이미지 상태 업데이트
    }
  };

  const handlePlaceSelection = (place: string) => {
    setSelectedPlace(place);
    // setSearchLocation(prev => `${place} ${prev}`);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  const {selectedPlace, setSelectedPlace} = useTravelLogContext();

  const [scheduleName, setScheduleName] = useState<string | undefined>(
    searchLocation
  );

  // searchLocation이 변할 때마다 scheduleName을 업데이트
  useEffect(() => {
    setScheduleName(searchLocation);
  }, [searchLocation]);

  return (
    <>
      <HeaderWithXButton onXClick={handleShowPlusSelf} />
      <div css={PlusSelfStyle.plusSelfLayout}>
        <div
          style={{margin: '20px, 0', fontFamily: 'semibold', fontSize: '24px'}}
        >
          {' '}
          <span>일정을</span> <span style={{color: colors.fifth}}>적어방</span>
        </div>
        {/* 1. 여행 장소 */}
        <div css={PlusSelfStyle.LocationInputLayout}>
          일정 장소
          <div css={PlusSelfStyle.LocationInputAllLayout}>
            <div css={PlusSelfStyle.relativeContainer}>
              <div css={PlusSelfStyle.placeListStyle} onClick={toggleDropdown}>
                {`▶ ${selectedPlace ?? ''}` || '여행 장소 선택'}
              </div>
              {isDropdownOpen && (
                <div css={PlusSelfStyle.dropdownContentStyle}>
                  {travelPlaceList.map((place, index) => (
                    <div
                      key={index}
                      css={PlusSelfStyle.placeOptionStyle}
                      onClick={() => handlePlaceSelection(place)}
                    >
                      {place}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div css={PlusSelfStyle.inputImgWrapper}>
              <input
                type="text"
                name=""
                id=""
                css={PlusSelfStyle.LocationInputStyle}
                placeholder="여행 장소 검색"
                onChange={e => handleSearchLocation(e)}
              />
              <img
                src={searchImg}
                alt="검색 버튼 이미지"
                css={PlusSelfStyle.searchImgStyle}
                onClick={handleShowMapSearch}
              />
            </div>
          </div>
        </div>

        {/* 2. 여행 이름 */}
        <div css={PlusSelfStyle.inputContainerStyle}>
          <div>
            {' '}
            <span style={{color: colors.customRed}}>*</span>{' '}
            <span>일정 이름</span>
          </div>

          <input
            type="text"
            value={scheduleName}
            onChange={e => {
              setScheduleName(e.target.value);
            }}
            css={PlusSelfStyle.labeledInputStyle}
            placeholder="일정 이름 입력"
          />
        </div>
        {/* 3. 여행 시간 */}
        <div>
          <div css={PlusSelfStyle.labelStyle}>시간</div>
          {/* 시간 선택 */}
          <div css={PlusSelfStyle.timeInputStyle}>
            <div css={PlusSelfStyle.AMPMSytle}>
              <button
                css={PlusSelfStyle.AMBtnSytle(AMPMSelection)}
                onClick={handleAMPMSelection}
              >
                오전
              </button>
              <button
                css={PlusSelfStyle.PMBtnSytle(AMPMSelection)}
                onClick={handleAMPMSelection}
              >
                오후
              </button>
            </div>
            <TimeInput label="시" />
            <TimeInput label="분" />
          </div>
        </div>

        {/* 4. 메모 */}
        <div>
          <div css={PlusSelfStyle.labelStyle}>메모</div>
          <textarea
            css={PlusSelfStyle.memoStyle}
            placeholder="메모를 적어주세요"
          />
        </div>

        {/* 5. 사진 */}
        <div css={PlusSelfStyle.imgLayout}>
          <div css={PlusSelfStyle.imgLabelStyle}>사진</div>
          <div>
            <img
              src={selectedImage || addTravelPhoto}
              alt="이미지 추가"
              style={{
                width: selectedImage ? '100px' : '50px',
                height: selectedImage ? '100px' : '50px',
              }}
              onClick={handleAddImg}
            />
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              style={{display: 'none'}} // 파일 입력 창 숨김
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* 저장, 삭제 버튼 */}
        <div css={PlusSelfStyle.btnLayout}>
          <Btn buttonStyle={{size: 'small', style: 'blue'}}>저장</Btn>
        </div>
      </div>
    </>
  );
}
