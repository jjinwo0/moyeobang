import React, {useState, useEffect, useRef} from 'react';
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
import {useMutation, useQueryClient} from '@tanstack/react-query';
import moyeobang from '@/services/moyeobang';
import {fi} from 'date-fns/locale';

export default function PlusSelf() {
  const {travelPlaceList, travelId} = useTravelDetailStore();
  const {
    handleShowPlusSelf,
    handleShowMapSearch,
    handleSearchLocation,
    searchLocation,
    setSearchLocation,
    selectedPlace,
    setSelectedPlace,
    scheduleEdit,
    setScheduleEdit,
    travelDates,
    scheduleDayNum,
    selectedMarker,
    travelSchedules,
    setTravelSchedules,
  } = useTravelLogContext();
  const [AMPMSelection, setAMPMSelection] = useState<'AM' | 'PM'>('AM');
  const handleAMPMSelection = () => {
    setAMPMSelection(prev => (prev === 'AM' ? 'PM' : 'AM'));
  };
  const [hour, setHour] = useState<number | string>('');
  const [minute, setMinute] = useState<number | string>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [memo, setMemo] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dateTime, setDateTime] = useState<string>('');
  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const [scheduleName, setScheduleName] = useState<string | undefined>(
    searchLocation
  );
  const [scheduleLocation, setScheduleLocation] =
    useState<ScheduleLocation | null>(null);
  const [getSchedule, setGetSchedule] = useState<DaySchedule | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

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
    setIsDropdownOpen(!isDropdownOpen);
  };

  const resetForm = () => {
    setSearchLocation('');
    setScheduleName('');
    setScheduleEdit(null);
    setHour('');
    setMinute('');
    setMemo('');
    setSelectedImage(null);
  };

  const handleDelete = () => {
    // [todo] 삭제 로직 추가
    resetForm();
    handleShowPlusSelf();
  };

  /**
   * 일정 추가 mutation 선언
   */
  const {mutate: postTravelSchedule} = useMutation({
    mutationFn: ({
      travelId,
      scheduleData,
    }: {
      travelId: Id;
      scheduleData: FormData;
    }) => moyeobang.postTravelSchedule(travelId, scheduleData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['travelSchedules'],
        refetchType: 'all',
      });
      // console.log('성공');
      resetForm();
      handleShowPlusSelf();
    },
  });

  /**
   * 일정 수정 mutation 선언
   */

  const {mutate: postChangeTravelSchedule} = useMutation({
    mutationFn: ({
      travelId,
      scheduleId,
      scheduleData,
    }: {
      travelId: Id;
      scheduleId: Id;
      scheduleData: FormData;
    }) =>
      moyeobang.postChangeTravelSchedule(travelId, scheduleId, scheduleData),
    onSuccess: async () => {
      console.log('[*] 수정 성공');
      queryClient.invalidateQueries({
        queryKey: ['travelSchedules', travelId],
        refetchType: 'all',
      });
      resetForm();
      handleShowPlusSelf();

      // 일정 시간 후에 fetchQuery를 호출하여 최신 데이터를 가져옵니다.
      // setTimeout(async () => {
      try {
        const data = await queryClient.fetchQuery({
          queryKey: ['travelSchedules'],
          queryFn: () => moyeobang.getTravelSchedules(travelId),
        });

        // 최신 데이터로 Context 업데이트
        console.log(
          '[*] 최신 데이터로 Context 업데이트',
          data.data.data.schedules
        );

        setTravelSchedules(data.data.data.schedules);
        handleShowPlusSelf();
      } catch (error) {
        console.error('Error fetching travel schedules:', error);
      }
      // }, 2000); // 2초 후에 fetchQuery를 호출합니다. 필요에 따라 시간을 조정하세요.
    },
  });

  // const makeScheduleLocation = () => {
  //   if (selectedMarker) {
  //     const scheduleLocation: ScheduleLocation = {
  //       googlePlaceId: selectedMarker?.placeId || '',
  //       title: selectedMarker?.title || '',
  //       address: selectedMarker?.address || '',
  //       latitude:
  //         typeof selectedMarker?.position?.lat === 'function'
  //           ? selectedMarker.position.lat()
  //           : selectedMarker?.position?.lat || 0,
  //       longitude:
  //         typeof selectedMarker?.position?.lng === 'function'
  //           ? selectedMarker.position.lng()
  //           : selectedMarker?.position?.lng || 0,
  //       category: selectedMarker?.types ? selectedMarker.types[0] : '',
  //     };
  //     return scheduleLocation;
  //   }
  // };

  // const makeScheduleLocation = () => {

  // };

  useEffect(() => {
    if (selectedMarker) {
      const Location: ScheduleLocation = {
        googlePlaceId: selectedMarker?.placeId || '',
        title: selectedMarker?.title || '',
        address: selectedMarker?.address || '',
        latitude:
          typeof selectedMarker?.position?.lat === 'function'
            ? selectedMarker.position.lat()
            : selectedMarker?.position?.lat || 0,
        longitude:
          typeof selectedMarker?.position?.lng === 'function'
            ? selectedMarker.position.lng()
            : selectedMarker?.position?.lng || 0,
        category: selectedMarker?.types ? selectedMarker.types[0] : '',
      };
      console.log('[*] 바뀜? Location', Location);

      setScheduleLocation(Location);
    }
  }, [selectedMarker]);

  const handleSave = () => {
    // [todo] 저장 로직 추가

    /**
     * 1. 일정 장소
     * selectedMarker
     * 2. 일정 이름
     * scheduleName
     * 3. 일정 시간
     * dateTime
     * 4. 일정 메모
     * memo
     * 5. 일정 사진
     * selectedImage
     */

    const scheduleData = new FormData();
    // JSON 데이터는 Blob으로 변환하여 'data'로 전송
    const jsonData = {
      scheduleTitle: scheduleName || '',
      scheduleLocation: scheduleLocation, // 이미 객체 형태이므로 그대로 사용
      scheduleTime: dateTime || '',
      memo: memo || '',
    };

    scheduleData.append(
      'data',
      new Blob([JSON.stringify(jsonData)], {type: 'application/json'})
    );

    // 파일이 있을 때만 append
    if (fileInputRef.current?.files?.[0]) {
      scheduleData.append('image', fileInputRef.current.files[0]);
    }

    console.log('[*] scheduleData', Object.fromEntries(scheduleData.entries()));

    // const scheduleData: PostTravelSchedule = {
    //   scheduleTitle: scheduleName || '',
    //   scheduleLocation: scheduleLocation || '',
    //   scheduleTime: dateTime || '',
    //   memo: memo || '',
    //   scheduleImage: selectedImage || '',
    // };
    // [todo] 저장 로직 추가
    if (scheduleEdit) {
      console.log(
        '수정 모드 scheduleData:',
        Object.fromEntries(scheduleData.entries())
      );

      // 수정 모드
      postChangeTravelSchedule({
        travelId,
        scheduleId: scheduleEdit,
        scheduleData,
      });
    } else {
      // 추가 모드
      postTravelSchedule({travelId, scheduleData});
    }
  };

  const handleXClick = () => {
    resetForm();
    handleShowPlusSelf();
  };

  // searchLocation이 변할 때마다 scheduleName을 업데이트
  useEffect(() => {
    if (!scheduleEdit) {
      setScheduleName(searchLocation);
    }
  }, [searchLocation]);

  useEffect(() => {
    if (scheduleDayNum) {
      const date = travelDates[scheduleDayNum - 1].split(' ')[0]; // 요일 제거
      const hourInt = Number(hour);
      const convertedHour =
        AMPMSelection === 'PM' && hourInt !== 12
          ? hourInt + 12
          : hourInt === 12 && AMPMSelection === 'AM'
            ? 0
            : hourInt;
      const time = `${String(convertedHour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      if (hour !== '' && minute !== '') {
        setDateTime(`${date}T${time}`);
      }
    }
  }, [hour, minute, AMPMSelection, scheduleDayNum]);

  // 타입 가드 함수
  function isPlusSelfSchedule(schedule: DaySchedule): schedule is DaySchedule {
    return (schedule as DaySchedule).scheduleId !== undefined;
  }

  useEffect(() => {
    // [todo] 상세보기
    if (scheduleEdit) {
      if (scheduleDayNum) {
        const schedule = travelSchedules[
          scheduleDayNum - 1
        ].daySchedules.filter(
          schedule =>
            isPlusSelfSchedule(schedule) && schedule.scheduleId === scheduleEdit
        );
        setGetSchedule(schedule[0]);
        console.log('[*] 가져온 getSchedule', schedule[0]);
        if (isPlusSelfSchedule(schedule[0])) {
          console.log('[*] 가져온 scheduleName', schedule[0].scheduleTitle);
          setScheduleName(schedule[0].scheduleTitle || '');
          setSearchLocation(schedule[0]?.scheduleLocation?.title || '');
          setScheduleLocation(schedule[0]?.scheduleLocation);
          const [date, time] = schedule[0].scheduleTime?.split('T') || [];
          const [hour, minute] = time.split(':');
          const hourInt = parseInt(hour, 10);
          setAMPMSelection(hourInt >= 12 ? 'PM' : 'AM');
          setHour(hourInt > 12 ? hourInt - 12 : hourInt);
          setMinute(minute || '');

          setMemo(schedule[0].memo || '');
          setSelectedImage(schedule[0].scheduleImg || '');
        }
      }
    }
  }, [scheduleEdit]);

  useEffect(() => {
    console.log('[*] 바뀌나 travelSchedules', travelSchedules);
    console.log('[*] 바뀌나 scheduleName', scheduleName);
  }, [travelSchedules, scheduleName]);

  return (
    <>
      <div>
        <HeaderWithXButton onXClick={handleXClick} />
        <div css={PlusSelfStyle.plusSelfLayout}>
          <div
            style={{
              margin: '20px, 0',
              fontFamily: 'semibold',
              fontSize: '24px',
            }}
          >
            {' '}
            <span>일정을</span>{' '}
            <span style={{color: colors.fifth}}>적어방</span>
          </div>
          {/* 1. 여행 장소 */}
          <div css={PlusSelfStyle.LocationInputLayout}>
            일정 장소
            <div css={PlusSelfStyle.LocationInputAllLayout}>
              <div css={PlusSelfStyle.relativeContainer}>
                <div
                  css={PlusSelfStyle.placeListStyle}
                  onClick={toggleDropdown}
                >
                  {`▶ ${selectedPlace ?? ''}` || '여행 장소 선택'}
                </div>
                {isDropdownOpen && (
                  <div css={PlusSelfStyle.dropdownContentStyle}>
                    {travelPlaceList.map((place, index) => (
                      <div
                        key={index}
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
                  value={searchLocation}
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
            <div css={PlusSelfStyle.labelStyle}>
              <span style={{color: colors.customRed}}>*</span> 시간
            </div>
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
              <TimeInput
                label="시"
                value={hour}
                onChange={e => {
                  const value = e.target.value;
                  // 유효성 검사: 1부터 11까지의 숫자만 허용
                  if (/^(1[0-2]|[1-9])?$/.test(value)) {
                    setHour(value);
                  }
                }}
              />
              <TimeInput
                label="분"
                value={minute}
                onChange={e => {
                  const value = e.target.value;
                  // 유효성 검사: 0부터 59까지의 숫자만 허용
                  if (/^(59|[0-5]?[0-9])?$/.test(value)) {
                    setMinute(value);
                  }
                }}
              />
            </div>
          </div>
          {/* 4. 메모 */}
          <div>
            <div css={PlusSelfStyle.labelStyle}>메모</div>
            <textarea
              css={PlusSelfStyle.memoStyle}
              placeholder="메모를 적어주세요"
              value={memo}
              onChange={e => setMemo(e.target.value)}
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
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{display: 'none'}} // 파일 입력 창 숨김
                onChange={handleImageChange}
              />
            </div>
          </div>
          {/* 저장, 삭제 버튼 */}
          <div css={PlusSelfStyle.btnLayout}>
            {scheduleEdit && (
              <Btn
                buttonStyle={{size: 'middle', style: 'red'}}
                onClick={handleDelete}
              >
                삭제
              </Btn>
            )}
            <Btn
              buttonStyle={{
                size: scheduleEdit ? 'middle' : 'big',
                style:
                  scheduleName === '' ||
                  dateTime === '' ||
                  hour === '' ||
                  minute === ''
                    ? 'gray'
                    : 'blue',
              }}
              onClick={handleSave}
              disabled={
                scheduleName === '' ||
                dateTime === '' ||
                hour === '' ||
                minute === ''
              }
            >
              저장
            </Btn>
          </div>
        </div>
      </div>
    </>
  );
}
