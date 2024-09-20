type Id = number;
type ProfileImage = string;
type Place = string;
type OrderItemTitle = string;
type OrderItemAmount = number;
type TotalAmount = number;
type Nickname = string;
// type SplitMethod = string;
type Settled = boolean; // 정산완료여부
type CreatedAt = string;
type TravelName = string;
type TravelPlaceList = Place[];
type StartDate = string;
type EndDate = string;
type QuizQuestion = string;
type QuizAnswer = string;
type ParticipantsCount = number;

type CurrentBalance = number;
type TotalAmount = number;
type TotalSpent = number;
type UsagePercentage = number;
type NeedsAdditionalDeposit = boolean;
type PersonalCurrentBalance = number;
type PersonalTotalAmount = number;
type PersonalTotalSpent = number;
type PersonalUsagePercentage = number;
type NeedsAdditionalDeposit = boolean;

type ScheduleTitle = string;
type ScheduleLocation = string;
type PredictedBudget = number;
type Completion = string;
type Schedules = [];
type scheduleTime = string;
type totalPrice = number;
type PaymentTime = string;
type Details = string;
type Memo = string;
type PaymentName = string;
type SplitMethod = string;

type ScheduleTitle = string;
type ScheduleLocation = string;
type PredictedBudget = number;
type Completion = string;
type Schedules = [];
type scheduleTime = string;
type totalPrice = number;
type PaymentTime = string;
type Details = string;
type Memo = string;
type PaymentName = string;
type SplitMethod = string;
type ScheduleImg = string;

type Latitude = number;
type Longitude = number;
type AmountComparison = number;
type CategoryPercent = number;
type ParticipantName = string;
type ParticipantAmount = number;
type ConsumptionTag = string;
type ImgUrl = string;
type LocationName = string;
type CategoryName = string;

type Question = string;
type Answer = string;

type InvitationLink = string;

// interface OrderItems {
//   orderItemTitle: OrderItemTitle;
//   orderItemAmount: OrderItemAmount;
// }

interface ParticipantInfo {
  memberId: Id;
  nickname: Nickname;
  profileImage: ProfileImage;
}

// 정산 전
interface TransactionRecords {
  transactionId: Id;
  place: Place;
  details: OrderItems[];
  totalAmount: TotalAmount;
  participants: ParticipantsInfo[];
  splitMethod: SplitMethod;
  settled: Settled;
  createdAt: CreatedAt;
}

interface SettledItemInfo {
  orderItemTitle: OrderItemTitle;
  orderItemAmount: OrderItemAmount;
  participants: ParticipantsInfo[];
}

type SettledItemsInfo = SettledItemInfo[];

// 정산 후
interface TransactionRecords {
  transactionId: Id;
  place: Place;
  details: OrderItems[];
  totalAmount: TotalAmount;
  participants: SettledItemInfo[];
  splitMethod: SplitMethod;
  settled: Settled;
  createdAt: CreatedAt;
}

// 여행 목록 관련 정보
interface Travel {
  travelId: Id;
  travelName: TravelName;
  travelImg: ImgUrl | null;
  participantsCount: ParticipantsCount;
  startDate: StartDate;
  endDate: EndDate;
  travelPlaceList: TravelPlaceList;
  quizQuestion: QuizQuestion;
  quizAnswer: QuizAnswer;
}

// 모임 통장 공금 잔액 조회
interface GroupAccountBalance {
  currentBalance: CurrentBalance;
  totalAmount: TotalAmount;
  totalSpent: TotalSpent;
}

// 모임 통장 개인 잔액 조회
interface PersonalAccountBalance {
  personalCurrentBalance: PersonalCurrentBalance;
  personalTotalAmount: PersonalTotalAmount;
  personalUsagePercentage: PersonalUsagePercentage;
  needsAdditionalDeposit?: NeedsAdditionalDeposit;
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

// 1. schedule type 지정
type Schedules = (PlusSelfSchedule | PaidAutoSchedule)[];

// 1) 추가된 일정
interface PlusSelfSchedule {
  scheduleId: Id;
  scheduleTitle: ScheduleTitle;
  scheduleLocation: ScheduleLocation;
  scheduleTime: scheduleTime;
  predictedBudget: PredictedBudget;
  completion: Completion;
  memo: Memo;
  scheduleImg?: ScheduleImg;
  matchedTransaction: MatchedTransaction | null;
}

// 2) 결제된 일정 (일정은 추가가 되지 않았고 결제 정보로 보여지는 일정)
interface PaidAutoSchedule {
  transactionId: Id;
  paymentName: PaymentName;
  totalPrice: Amount;
  paymentTime: PaymentTime;
  splitMethod: SplitMethod;
  participantsInfo: ParticipantsInfo[];
}

// 2. 실제 여행 일정 조회 data 타입 지정
type TravelLog = (PlusSelfSchedule | PaidAutoSchedule)[][];

// // 정산 전
// interface TransactionRecords {
//     transactionId : TransactionId
//     place : Place
//     details : OrderItems[]
//     totalAmount : TotalAmount
//     participants : ParticipantsInfo[]
//     splitMethod : SplitMethod
//     settled : Settled
//     createdAt : CreatedAt
// }

// interface SettledItemInfo {
//     orderItemTitle : OrderItemTitle
//     orderItemAmount : OrderItemAmount
//     participants : ParticipantsInfo[]
// }

// type SettledItemsInfo = SettledItemInfo[]

// // 정산 후
// interface TransactionRecords {
//     transactionId : TransactionId
//     place : Place
//     details : OrderItems[]
//     totalAmount : TotalAmount
//     participants : SettledItemInfo[]
//     splitMethod : SplitMethod
//     settled : Settled
//     createdAt : CreatedAt
// }

interface TravelLocation {
  latitude: Latitude;
  longitude: Longitude;
}

interface ConsumptionCategory {
  categoryName: CategoryName;
  percent: CategoryPercent;
}

interface ParticipantConsumption {
  name: ParticipantName;
  amount: ParticipantAmount;
}

interface ImgSummary {
  imgUrl: ImgUrl;
  locationName: LocationName;
}

interface TravelSummary {
  locationList: TravelLocation[]; // 여행 장소들의 위도, 경도 리스트
  totalAmount: TotalAmount; // 전체 예산
  amountUsed: TotalUsed; // 총 사용 금액
  amountComparison: AmountComparison;
  consumptionCategory: ConsumptionCategory[]; // 소비 카테고리
  consumptionTag: ConsumptionTag[]; // 소비 태그 (문구는 프론트에서 정함)
  participantsConsumption: ParticipantConsumption[]; // 참가자별 소비 금액
  imgSummary: ImgSummary[]; // 이미지와 장소 이름 리스트
}

interface Quiz {
  id: TravelId;
  question: Question;
  answer: Answer;
}

//여행 상세 조회
interface TravelDetail {
  travelName: TravelName;
  startDate: StartDate;
  endDate: EndDate;
  travelPlaceList: TravelPlaceList;
  accountId: AccountId;
  accountNumber: AccountNumber;
  participantsInfo: ParticipantInfo[];
}
