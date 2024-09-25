import {useTravelLogContext} from '@/contexts/TravelLog';
import React, {useState} from 'react';
import {useSpring, animated} from 'react-spring';
import {useSwipeable} from 'react-swipeable';
import {css} from '@emotion/react';
import * as MarkerDetailStyle from '@/components/travelLog/PlusSelf/Map/MarkerDetailStyle';
import Btn from '@/components/common/btn/Btn';
import blankStar from '@/assets/icons/blankStar.png';
import blueStar from '@/assets/icons/blueStar.png';
import springLine from '@/assets/icons/springLine.png';
import categoryIcon from '@/assets/icons/categoryIcon.png';
import locationIcon from '@/assets/icons/locationIcon.png';
import reviewIcon from '@/assets/icons/reviewIcon.png';

export default function MarkerDetail() {
  const {selectedMarker, setSelectedMarker} = useTravelLogContext();
  console.log('[*]marker 정보', selectedMarker);

  const [isExpanded, setIsExpanded] = useState(false);
  const MarkerDetailHeight = isExpanded ? '80vh' : '20vh';

  // Handle swipe gestures using react-swipeable
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => setIsExpanded(true),
    onSwipedDown: () => setIsExpanded(false),
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  const springProps = useSpring({
    height: MarkerDetailHeight,
    config: {tension: 300, friction: 40}, // Adjust animation speed
  });

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <img
          key={i}
          src={i <= rating ? blueStar : blankStar}
          alt={`${i} star`}
          style={{
            width: '15px',
            height: '15px',
          }}
        />
      );
    }
    return stars;
  };

  return (
    <animated.div {...swipeHandlers} style={springProps}>
      {/* {
    "position": {
        "lat": 37.8731321,
        "lng": 127.7522193
    },
    "title": "스타벅스 춘천후석로DT점",
    "placeId": "ChIJO1mAOQDlYjUReSmwWHqxbRg",
    "address": "대한민국 강원특별자치도 춘천시 후평동 24-1",
    "rating": 4,
    "openingHours": [],
    "types": [
        "cafe",
        "food",
        "store",
        "point_of_interest",
        "establishment"
    ],
    "reviews": [
        {
            "authorName": "MK Kim",
            "authorProfilePhoto": "https://lh3.googleusercontent.com/a/ACg8ocJR9k0MnM-FGzqKujb8U_6twlmWiuVnvO6j50ESfE-eNhqabg=s128-c0x00000000-cc-rp-mo-ba6",
            "reviewText": "아주 붐비지는 않는..브런치하기도 좋은..매장이네요",
            "rating": 4
        }
    ],
    "detailedOpeningHours": [
        "월요일: 오전 7:00 ~ 오후 11:00",
        "화요일: 오전 7:00 ~ 오후 11:00",
        "수요일: 오전 7:00 ~ 오후 11:00",
        "목요일: 오전 7:00 ~ 오후 11:00",
        "금요일: 오전 7:00 ~ 오후 11:00",
        "토요일: 오전 7:00 ~ 오후 11:00",
        "일요일: 오전 7:00 ~ 오후 11:00"
    ]
} */}
      {!isExpanded ? (
        <div css={MarkerDetailStyle.markerDetailStyle}>
          <div>
            <img
              src={springLine}
              alt="springLine"
              style={{marginBottom: '10px'}}
            />
          </div>
          <div css={MarkerDetailStyle.MapDetailContentLayout}>
            <div css={MarkerDetailStyle.MapDetailHeader}>
              <div id="title">{selectedMarker.title}</div>
              <div id="rating">
                {selectedMarker.rating} {renderStars(selectedMarker.rating)}
              </div>
            </div>
            <div css={MarkerDetailStyle.MapDetailContent}>
              <div id="types">
                <img
                  src={categoryIcon}
                  alt="categoryIcon"
                  style={{width: '15px', height: '15px'}}
                />
                {selectedMarker.types[0]}
              </div>
              <div id="address">
                <img
                  src={locationIcon}
                  alt="locationIcon"
                  style={{width: '15px', height: '15px'}}
                />
                {selectedMarker.address}
              </div>
            </div>
          </div>
          <div css={MarkerDetailStyle.BtnLayout}>
            <Btn buttonStyle={{style: 'blue', size: 'big'}}>장소확정</Btn>
          </div>
        </div>
      ) : (
        <div css={MarkerDetailStyle.markerDetailStyle}>
          <div>
            <img
              src={springLine}
              alt="springLine"
              style={{marginBottom: '10px'}}
            />
          </div>
          <div css={MarkerDetailStyle.MapDetailContentLayout}>
            <div css={MarkerDetailStyle.LongMapDetailHeader}>
              <div id="title">{selectedMarker.title}</div>
              <div id="rating">
                {selectedMarker.rating} {renderStars(selectedMarker.rating)}
              </div>
            </div>
            <div css={MarkerDetailStyle.LongMapDetailContent}>
              <div id="types">
                <img
                  src={categoryIcon}
                  alt="categoryIcon"
                  style={{width: '20px', height: '20px'}}
                />
                {selectedMarker.types[0]}
              </div>
              <div id="address">
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <img
                    src={locationIcon}
                    alt="locationIcon"
                    style={{width: '20px', height: '20px'}}
                  />
                </div>
                <div>{selectedMarker.address}</div>
              </div>
              <div id="reviews">
                <div id="reviews-header">
                  <img
                    src={reviewIcon}
                    alt="reviewIcon"
                    style={{width: '20px', height: '20px'}}
                  />
                  <div>Reviews</div>
                </div>
                <div id="reviews-images">
                  <img
                    src={selectedMarker.reviews[0].authorProfilePhoto}
                    alt="reviewImage"
                    style={{width: '100px', height: '100px'}}
                  />
                </div>
                <div id="reviews-content">
                  {selectedMarker.reviews.map((review) => (
                    <div key={review.authorName}>
                      <div>{review.authorName}</div>
                      <div>{review.reviewText}</div>
                      <div>{review.rating}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div css={MarkerDetailStyle.BtnLayout}>
            <Btn buttonStyle={{style: 'blue', size: 'big'}}>장소확정</Btn>
          </div>
        </div>
      )}
    </animated.div>
  );
}
