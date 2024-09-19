type ProfileImage = string;
type TransactionId = number;
type Place = string;
type OrderItemTitle = string;
type OrderItemAmount = number;
type TotalAmount = number;
type MemberId = number;
type Nickname = string;
// type SplitMethod = string;
type Settled = boolean; // 정산완료여부
type CreatedAt = string;
type TravelId = number;
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
  memberId: MemberId;
  nickname: Nickname;
  profileImage: ProfileImage;
}

// 여행 목록 관련 정보
interface Travel {
  travelId: TravelId;
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
