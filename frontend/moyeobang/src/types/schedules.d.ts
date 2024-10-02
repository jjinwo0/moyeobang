// 구글 맵 장소 정보 타입
interface PlaceDetails {
  placeName: PlaceName;
  placeCategory: PlaceCategory;
  placeDescription: PlaceDescription;
  placeOpenHours: PlaceOpenHours;
  placeRating: PlaceRating;
  placAaddress: PlacAaddress;
}

// 여행 일정 조회
// schedules 상세 타입 지정
// MatchedTransaction 지정
interface MatchedTransaction {
  transactionId: Id;
  paymentName: string;
  totalPrice: number;
  paymentTime: string;
  splitMethod: SplitMethod;
  participantsInfo: ParticipantsInfo[];
}

// Location type 지정
interface ScheduleLocation {
  googlePlaceId: string;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
}

// 1) 추가된 일정
interface PlusSelfSchedule {
  scheduleId: Id;
  isSelfPlus: boolean;
  scheduleTitle: ScheduleTitle;
  scheduleLocation: ScheduleLocation;
  scheduleTime: scheduleTime;
  budget: Budget;
  completion: Completion;
  memo: Memo;
  scheduleImg?: ScheduleImg;
  matchedTransaction: MatchedTransaction | null;
}

// 2) 결제된 일정 (일정은 추가가 되지 않았고 결제 정보로 보여지는 일정)
interface PaidAutoSchedule {
  transactionId: Id;
  isSelfPlus: boolean;
  paymentName: PaymentName;
  latitude: Latitude;
  longitude: Longitude;
  totalPrice: Amount;
  paymentTime: PaymentTime;
  splitMethod: SplitMethod;
  participantsInfo: ParticipantsInfo[];
}

// 실제 여행 일정 조회 data 타입 지정
type TravelLog = DaySchedules[];

// schedule type 지정
interface DaySchedules {
  dayNum: number;
  dayDate: string;
  daySchedules: (PlusSelfSchedule | PaidAutoSchedule)[];
}

type ExtendedMarkerOptions = google.maps.MarkerOptions & {
  placeId?: string;
  placeName?: string;
  address?: string;
  category?: string;
  types?: string[]; // `types` 속성 추가
};

// Location type 지정
interface ScheduleLocation {
  googlePlaceId: string;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
}



//여행 일정 API 관련 타입
/**
 * 여행 일정 추가 data 타입
 */
interface PostTravelSchedule {
  scheduleTitle: string;
  scheduleLocation: ScheduleLocation;
  scheduleTime: string;
  memo: string;
  scheduleImg: string;
}
