// type Id = number;
// type ProfileImage = string;
// type MemberName = string;
// type CreatedAt = string;
// type TravelName = string;
// type TravelPlaceList = Place[];
// type StartDate = string;
// type EndDate = string;
// type QuizQuestion = string;
// type QuizAnswer = string;
// type ParticipantsCount = number;

// type CurrentBalance = number;
// type TotalAmount = number;
// type TotalSpent = number;
// type UsagePercentage = number;
// type NeedsAdditionalDeposit = boolean;
// type PersonalCurrentBalance = number;
// type PersonalTotalAmount = number;
// type PersonalTotalSpent = number;
// type PersonalUsagePercentage = number;
// type NeedsAdditionalDeposit = boolean;

// type ScheduleTitle = string;
// type ScheduleLocation = string;
// type PredictedBudget = number;
// type Completion = string;
// type Schedules = [];
// type scheduleTime = string;
// type totalPrice = number;
// type PaymentTime = string;
// type Details = string;
// type Memo = string;
// type PaymentName = string;
// type SplitMethod = string;

// type ScheduleTitle = string;
// type ScheduleLocation = string;
// type PredictedBudget = number;
// type Completion = string;
// type Schedules = [];
// type scheduleTime = string;
// type totalPrice = number;
// type PaymentTime = string;
// type Details = string;
// type Memo = string;
// type PaymentName = string;
// type SplitMethod = string;
// type ScheduleImg = string;

// type Latitude = number;
// type Longitude = number;
// type AmountComparison = number;
// type CategoryPercent = number;
// type ParticipantName = string;
// type ParticipantAmount = number;
// type ConsumptionTag = string;
// type ImgUrl = string;
// type LocationName = string;
// type CategoryName = string;

// type Question = string;
// type Answer = string;

// type InvitationLink = string;

// interface ParticipantInfo {
//   memberId: Id;
//   memberName: MemberName;
//   profileImage: ProfileImage;
// }

// // 여행 목록 관련 정보
// interface Travel {
//   travelId: Id;
//   travelName: TravelName;
//   travelImg: ImgUrl | null;
//   participantsCount: ParticipantsCount;
//   startDate: StartDate;
//   endDate: EndDate;
//   travelPlaceList: TravelPlaceList;
//   quizQuestion: QuizQuestion;
//   quizAnswer: QuizAnswer;
//   accountId: AccountId;
//   accountNumber: AccountNumber;
//   participantsInfo: ParticipantInfo[];
// }

// type MemberId = number;
// type MemberName = string;
// type ProfileImage = string;
// type TransactionId = number;
// type WithdrawId = number;
// type CreatedAt = string;
// type TransactionType = string;
// type CurrentBalance = number; // 현재 잔액
// type Adress = string;
// type SplitMethod = string;
// // type SplitMethod = "receipt" | "custom";
// type OrderItemId = number;
// type OrderItemTitle = string;
// type OrderItemQuantity = number;
// type OrderItemPrice = number;
// type PaymentName = string;
// type Money = number;
// type AcceptedNumber = string;
// type PaymentRequestId = string;
// type sourceAccountNumber = string;
// type IsNew = boolean;
// type TotalMoney = number;
// type TotalComsumption = number;
// type AccountId = number;

// interface ParticipantInfo {
//   memberId: MemberId;
//   memberName: Nickname;
//   profileImage: ProfileImage;
// }

// interface OrderItems {
//   orderItemId: OrderItemId;
//   orderItemTitle: OrderItemTitle;
//   orderItemQuantity: OrderItemquantity;
//   orderItemPrice: OrderItemPrice;
// }

// // 모임 통장 공금 잔액 조회
// interface AccountBalanceByGroup {
//   currentBalance: CurrentBalance;
//   totalAmount: TotalMoney;
//   totalComsumption: TotalComsumption;
//   usagePercentage: UsagePercentage;
// }

// // 모임 통장 개인 잔액 조회
// interface AccountBalanceBymemberId {
//   participant: ParticipantInfo;
//   personalCurrentBalance: PersonalCurrentBalance;
//   personalTotalMoney: TotalMoney;
//   personalTotalConsumption: TotalComsumption;
//   personalUsagePercentage: PersonalUsagePercentage;
//   needsAdditionalDeposit?: NeedsAdditionalDeposit;
// }

// // 여행 일정 조회
// // schedules 상세 타입 지정
// // MatchedTransaction 지정
// interface MatchedTransaction {
//   transactionId: Id;
//   paymentName: string;
//   totalPrice: number;
//   paymentTime: string;
//   splitMethod: SplitMethod;
//   participantsInfo: ParticipantsInfo[];
// }

// // 1. schedule type 지정
// type Schedules = (PlusSelfSchedule | PaidAutoSchedule)[];

// // 1) 추가된 일정
// interface PlusSelfSchedule {
//   scheduleId: Id;
//   scheduleTitle: ScheduleTitle;
//   scheduleLocation: ScheduleLocation;
//   scheduleTime: scheduleTime;
//   predictedBudget: PredictedBudget;
//   completion: Completion;
//   memo: Memo;
//   scheduleImg?: ScheduleImg;
//   matchedTransaction: MatchedTransaction | null;
// }

// // 2) 결제된 일정 (일정은 추가가 되지 않았고 결제 정보로 보여지는 일정)
// interface PaidAutoSchedule {
//   transactionId: Id;
//   paymentName: PaymentName;
//   totalPrice: Amount;
//   paymentTime: PaymentTime;
//   splitMethod: SplitMethod;
//   participantsInfo: ParticipantsInfo[];
// }

// // 2. 실제 여행 일정 조회 data 타입 지정
// type TravelLog = (PlusSelfSchedule | PaidAutoSchedule)[][];

// // 여행 일정 조회
// // schedules 상세 타입 지정
// // MatchedTransaction 지정
// interface MatchedTransaction {
//   transactionId: Id;
//   paymentName: string;
//   totalPrice: number;
//   paymentTime: string;
//   splitMethod: SplitMethod;
//   participantsInfo: ParticipantsInfo[];
// }

// // 1. schedule type 지정
// type Schedules = (PlusSelfSchedule | PaidAutoSchedule)[];

// // 1) 추가된 일정
// interface PlusSelfSchedule {
//   scheduleId: Id;
//   scheduleTitle: ScheduleTitle;
//   scheduleLocation: ScheduleLocation;
//   scheduleTime: scheduleTime;
//   predictedBudget: PredictedBudget;
//   completion: Completion;
//   memo: Memo;
//   scheduleImg?: ScheduleImg;
//   matchedTransaction: MatchedTransaction | null;
// }

// // 2) 결제된 일정 (일정은 추가가 되지 않았고 결제 정보로 보여지는 일정)
// interface PaidAutoSchedule {
//   transactionId: Id;
//   paymentName: PaymentName;
//   totalPrice: Amount;
//   paymentTime: PaymentTime;
//   splitMethod: SplitMethod;
//   participantsInfo: ParticipantsInfo[];
// }

// // 2. 실제 여행 일정 조회 data 타입 지정
// type TravelLog = (PlusSelfSchedule | PaidAutoSchedule)[][];

// // 결제 내역 전체 조회 GET
// interface TransactionList {
//   transactionId: TransactionId;
//   paymentName: PaymentName;
//   money: Money;
//   participants: ParticipantInfo[]; // 정산한 사람들(default)
//   transactionType: TransactionType;
//   createdAt: CreatedAt;
//   currentBalance: CurrentBalance;
// }

// // 상세 조회 영수증 정산 'receipt'의 details
// interface SettledItemByReceipt {
//   orderItemId: OrderItemId;
//   orderItemTitle: OrderItemTitle;
//   orderItemPrice: OrderItemPrice;
//   orderItemQuantity: OrderItemQuantity;
//   participants: ParticipantInfo[];
// }

// // 상세 조회 직접 정산 'custom' 의 details
// interface SettledParticipantByCustom {
//   participant: ParticipantInfo;
//   money: Money;
// }

// // 정산 정보 상세 조회 GET

// // 공통 타입 정의
// interface BaseTransactionDetail {
//   transactionId: TransactionId;
//   paymentName: PaymentName;
//   address: Adress;
//   money: Money;
//   createdAt: CreatedAt;
//   acceptedNumber: AcceptedNumber;
// }

// // 정산 완료 영수증 (N분의 1)
// interface TransactionDetailByReceipt extends BaseTransactionDetail {
//   details: SettledItemByReceipt[];
//   splitMethod: SplitMethod; // 'receipt'
// }

// // 정산 완료 (직접 정산) (default 정산)
// interface TransactionDetailByCustom extends BaseTransactionDetail {
//   details: SettledParticipantByCustom[];
//   splitMethod: SplitMethod; // 'custom'
// }

// type TransactionDetailProps =
//   | TransactionDetailByReceipt
//   | TransactionDetailByCustom;

// interface ChatItem {
//   item_name: string;
//   quantity: number;
//   price: number;
// }

// interface ChatJsonProps {
//   purchase_date: string;
//   items: ChatItem[];
// }

// interface QrData {
//   paymentRequestId: string; // 고유번호 uuidv4()
//   sourceAccountNumber: string; // 결제 계좌번호
// }

// interface PosPay {
//   placeId: number;
//   placeName:string;
//   placeAddress:Adress;
//   amount:Money;
//   latitude: Latitude;
//   longitude: Longitude;
//   targetAccountNumber: string;
// }

// interface PosOderItem {
//   title: string;
//   amount: number;
//   quantity: number;
// }

// interface PaymentProps {
//   paymentRequestId: string;
//   sourceAccountNumber: string; // 결제자(모임통장) 계좌번호
//   placeId: string;
//   placeName: string;
//   placeAddress: string;
//   amount:Money;
//   latitude: number;
//   longitude: number;
//   targetAccountNumber: string;
//   // OrderItems : OrderItems[];  // 없앰
// }

// interface ErrorResponse {
//   status: number;
//   code: number;
//   message: string;
// }

// // api 요청
// interface MoyeobangResponse<T> {
//   status: string;
//   data: T;
//   error: ErrorResponse | null;
// }

// interface TravelLocation {
//   latitude: Latitude;
//   longitude: Longitude;
// }

// interface ConsumptionCategory {
//   categoryName: CategoryName;
//   percent: CategoryPercent;
// }

// interface ParticipantConsumption {
//   name: ParticipantName;
//   amount: ParticipantAmount;
// }

// interface ImgSummary {
//   imgUrl: ImgUrl;
//   locationName: LocationName;
// }

// interface TravelSummary {
//   locationList: TravelLocation[]; // 여행 장소들의 위도, 경도 리스트
//   totalAmount: TotalAmount; // 전체 예산
//   amountUsed: TotalUsed; // 총 사용 금액
//   amountComparison: AmountComparison;
//   consumptionCategory: ConsumptionCategory[]; // 소비 카테고리
//   consumptionTag: ConsumptionTag[]; // 소비 태그 (문구는 프론트에서 정함)
//   participantsConsumption: ParticipantConsumption[]; // 참가자별 소비 금액
//   imgSummary: ImgSummary[]; // 이미지와 장소 이름 리스트
// }

// interface Quiz {
//   question: Question;
// }

// interface ResponsePostTravel {
//   travelId: Id;
// }

// interface ResponsePostAccount {
//   accountNumber: sourceAccountNumber;
// }

// interface PostTravel {
//   travelName: TravelName;
//   stratDate: StartDate;
//   endDate: EndDate;
//   travelPlaceList: TravelPlaceList;
//   quizQuestion: QuizQuestion;
//   quizAnswer: QuizAnswer;
//   travelImg: ImgUrl | null;
// }

// interface Member {
//   memberId: Id;
//   memberName: MemberName;
//   profileImage: ImgUrl;
//   accountNumber: AccountNumber;
// }

// interface submitQuiz {
//   answer: QuizAnswer;
// }

type Id = number;
type Place = string;
type ProfileImage = string;
type MemberName = string;
type CreatedAt = string;
type TravelName = string;
type StartDate = string;
type EndDate = string;
type QuizQuestion = string;
type QuizAnswer = string;
type ParticipantsCount = number;
type CurrentBalance = number;
type TotalAmount = number;
type TotalMoney = number;
type Money = number;
type TotalComsumption = number;
type UsagePercentage = string;
type NeedsAdditionalDeposit = boolean;
type PersonalCurrentBalance = number;
type PersonalTotalAmount = number;
type PersonalTotalSpent = number;
type PersonalUsagePercentage = number;
// type ScheduleLocation = string;
type PredictedBudget = number;
type TotalPrice = number;
type PaymentTime = string;
type Details = string;
type PaymentName = string;
type Latitude = number;
type Longitude = number;
type AmountComparison = number;
type CategoryPercent = string;
type ParticipantName = string;
type ParticipantAmount = number;
type ConsumptionTag = string;
type ImgUrl = string;
type LocationName = string;
type CategoryName = string;
type InvitationLink = string;
type Nickname = string;
type AccountNumber = string;

// API 요청 응답 타입
interface MoyeobangResponse<T> {
  status: string;
  data: T;
  error: ErrorResponse | null;
}

// 에러 응답 타입
interface ErrorResponse {
  status: number;
  code: number;
  message: string;
}

interface ParticipantInfo {
  memberId: Id;
  memberName: MemberName;
  profileImage: ProfileImage;
}

type MemberId = number;
type TransactionId = number;
type WithdrawId = number;
type TransactionType = string;
type Adress = string;
type OrderItemId = number;
type OrderItemTitle = string;
type OrderItemQuantity = number;
type OrderItemPrice = number;
type AcceptedNumber = string;
type PaymentRequestId = string;
type SourceAccountNumber = string;
type IsNew = boolean;
type TotalConsumption = number;
type TotalSpent = number;
type AccountId = number;

interface ParticipantInfo {
  memberId: MemberId;
  memberName: Nickname;
  profileImage: ProfileImage;
}

interface OrderItems {
  orderItemId: OrderItemId;
  orderItemTitle: OrderItemTitle;
  orderItemQuantity: OrderItemQuantity;
  orderItemPrice: OrderItemPrice;
}

// 일정 관련
interface MatchedTransaction {
  transactionId: Id;
  paymentName: string;
  totalPrice: number;
  paymentTime: string;
  splitMethod: SplitMethod;
  participantsInfo: ParticipantInfo[];
}

// 기타 관련 인터페이스
interface TravelLocation {
  latitude: Latitude;
  longitude: Longitude;
}

interface ConsumptionByCategory {
  categoryName: CategoryName;
  proportion: CategoryPercent;
  balance: CurrentBalance;
}

interface ConsumptionByMember {
  participantInfo: ParticipantInfo;
  proportion: UsagePercentage;
  balance: ParticipantAmount;
}

interface QrData {
  paymentRequestId: PaymentRequestId;
  sourceAccountNumber: string;
}

// pos기
interface PosPay {
  placeId: string;
  placeName: string;
  placeAddress: Adress;
  amount: Money;
  latitude: Latitude;
  longitude: Longitude;
  targetAccountNumber: string;
}

interface PosOrderItem {
  title: string;
  amount: number;
  quantity: number;
}

// Review 타입 정의
interface Review {
  authorName: string;
  authorProfilePhoto: string;
  reviewText: string;
  rating?: number;
}

// OpeningHours 타입 정의
interface OpeningHours {
  detailedOpeningHours: string[];
}

// Marker 타입 정의
interface CustomMarker {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  placeId: string;
  address: string;
  rating?: number;
  openingHours?: string[]; // 간단한 영업 시간 정보
  types?: string[]; // 장소 유형 정보
  reviews?: Review[]; // Review 타입의 배열
  detailedOpeningHours?: string[]; // 자세한 영업 시간 정보
  photos?: string[];
}

//공금입금 요청 응답
interface ResponsePostDepositAccount {
  title: TravelName;
  amount: TotalAmount;
}

//공금입금 응답
interface ResponseDepositAccount {
  accountBalance: number;
}

//1원입금 요청 응답
interface ResponseDepositOne {
  transactionId: number;
}

//1원입금 알림 요청 응답
interface ResponseVerifyNotification {
  authText: string;
  key: string;
}
