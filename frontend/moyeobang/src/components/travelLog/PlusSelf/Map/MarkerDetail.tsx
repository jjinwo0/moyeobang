import {useTravelLogContext} from '@/contexts/TravelLog';
import React, {useState} from 'react';
import {useSpring, animated} from 'react-spring';
import {useSwipeable} from 'react-swipeable';
import {css} from '@emotion/react';

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

  return (
    <animated.div {...swipeHandlers} style={springProps}>
      <div>
        <h3>{selectedMarker.title}</h3>
        <p>
          위치: {selectedMarker.position?.lat}, {selectedMarker.position?.lng}
        </p>
      </div>
    </animated.div>
  );
}
