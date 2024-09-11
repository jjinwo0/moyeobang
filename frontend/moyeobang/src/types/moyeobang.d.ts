type ProfileImage = string;
type TransactionId = number;
type Place = string;
type OrderItemTitle = string;
type OrderItemAmount = number;
type TotalAmount = number;
type MemberId = number;
type Nickname = string;
type SplitMethod = string;
type Settled = boolean; // 정산완료여부
type CreatedAt = string;
type TravelId = number;
type TravelName = string;
type TravelPlaceList = Place[];
type StartDate = string;
type EndDate = string;
type QuizQuestion = string;
type QuizAnswer = string;

interface OrderItems {
  orderItemTitle: OrderItemTitle;
  orderItemAmount: OrderItemAmount;
}

interface ParticipantsInfo {
  memberId: MemberId;
  nickname: Nickname;
  profileImage: ProfileImage;
}

// 정산 전
interface TransactionRecords {
  transactionId: TransactionId;
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
  transactionId: TransactionId;
  place: Place;
  details: OrderItems[];
  totalAmount: TotalAmount;
  participants: SettledItemInfo[];
  splitMethod: SplitMethod;
  settled: Settled;
  createdAt: CreatedAt;
}

interface Travel {
  travelId: TravelId;
  travelName: TravelName;
  startDate: StartDate;
  endDate: EndDate;
  travelPlaceList: TravelPlaceList;
  quizQuestion: QuizQuestion;
  quizAnswer: QuizAnswer;
}
