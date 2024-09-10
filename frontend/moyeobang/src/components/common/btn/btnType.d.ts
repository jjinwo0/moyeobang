// Size 타입 정의
type ButtonSize =
  | 'tiny'
  | 'small'
  | 'middle'
  | 'big'
  | 'middleSquare'
  | 'thinBig';

// Variant 타입 정의 (Button 스타일에 맞게 정의)
type ButtonVariant = 'blue' | 'blueOutlined' | 'gray' | 'red' | 'greenBlue';

interface Blue {
  buttonStyle: {
    style: 'blue'; // 'blue' 스타일에 맞게 변경
    size: ButtonSize; // size는 공통된 타입을 적용
  };
}

interface BlueOutlined {
  buttonStyle: {
    style: 'blueOutlined'; // 'blueOutlined' 스타일 적용
    size: ButtonSize;
  };
}

interface Gray {
  buttonStyle: {
    style: 'gray'; // 'gray' 스타일 적용
    size: ButtonSize;
  };
}

interface Red {
  buttonStyle: {
    style: 'red'; // 'red' 스타일 적용
    size: ButtonSize;
  };
}
