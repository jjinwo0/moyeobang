type Id = number;
type ProfileImage = string;
type Place = string;
type OrderItemTitle = string;
type OrderItemAmount = number;
type TotalAmount = number;
type Nickname = string;
type SplitMethod = string;
type Settled = boolean; // 정산완료여부
type CreatedAt = string;
type TravelName = string;
type TravelPlaceList = Place[];
type StartDate = string;
type EndDate = string;
type QuizQuestion = string;
type QuizAnswer = string;

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

interface OrderItems {
  orderItemTitle: OrderItemTitle;
  orderItemAmount: OrderItemAmount;
}

interface ParticipantsInfo {
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
