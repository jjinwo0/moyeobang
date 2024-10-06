type PlaceName = string;
type PlaceCategory = string;
type PlaceDescription = string;
type PlaceOpenHours = string;
type PlaceRating = number;
type PlaceAaddress = string;
type ScheduleTitle = string;
type ScheduleTime = string;
type Budget = number;
type Completion = string;
type Memo = string;
type ScheduleImg = string;
type SplitMethod = string;
type Amount = number;
type Sequence = number;

// 구글 맵 장소 정보 타입
interface PlaceDetails {
  placeName: PlaceName;
  placeCategory: PlaceCategory;
  placeDescription: PlaceDescription;
  placeOpenHours: PlaceOpenHours;
  placeRating: PlaceRating;
  placeAaddress: PlaceAaddress;
}

// 여행 일정 조회
// schedules 상세 타입 지정
// Location type 지정
interface ScheduleLocation {
  googlePlaceId: string | null;
  title: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  category: string | null;
}

// 1) 추가된 일정
interface DaySchedule {
  scheduleId: Id | null;
  scheduleTitle: ScheduleTitle | null;
  scheduleLocation: ScheduleLocation | null;
  scheduleTime: ScheduleTime | null;
  budget: Budget | null;
  sequence: Sequence | null;
  completion: Completion | null;
  memo: Memo | null;
  scheduleImg?: ScheduleImg | null;
  matchedTransaction: Transaction | null;
  unmatchedTransaction: Transaction | null;
}

type ParticipantsInfo = {
  memberId: Id;
};

// 2) 결제된 일정 (일정은 추가가 되지 않았고 결제 정보로 보여지는 일정)
interface Transaction {
  transactionId: Id;
  paymentName: PaymentName;
  latitude: Latitude;
  longitude: Longitude;
  totalPrice: Amount;
  paymentTime: PaymentTime;
  splitMethod: SplitMethod;
  participantsInfo: ParticipantsInfo[];
}

// 실제 여행 일정 조회 data 타입 지정
type TravelLog = Schedules[];

// schedule type 지정
interface Schedules {
  dayNum: number;
  dayDate: string;
  daySchedules: DaySchedule[];
}

type ExtendedMarkerOptions = google.maps.MarkerOptions & {
  placeId?: string;
  placeName?: string;
  address?: string;
  category?: string;
  types?: string[]; // `types` 속성 추가
};


//여행 일정 API 관련 타입
/**
 * 여행 일정 추가 data 타입
 */
interface PostTravelSchedule {
  scheduleTitle: string;
  scheduleLocation: ScheduleLocation;
  scheduleTime: string;
  memo: string;
  scheduleImage: string;
}


/**
 * 여행 일정 조회 data 타입
 */
interface GetTravelSchedules {
  schedules: Schedules[];
}
