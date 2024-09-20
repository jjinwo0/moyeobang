type ProfileImage = string;
type TransactionId = number;
type MemberId = number;
type Nickname = string;
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

type MemberId = number;
type Nickname = string;
type ProfileImage = string;
type TransactionId = number;
type WithdrawId = number;
type CreatedAt = string;
type TransactionType = "입금" | "출금";
type CurrentBalance = number; // 현재 잔액
type Adress = string;
type SplitMethod = "receipt" | "custom";
type OrderItemId = number;
type OrderItemTitle = string;
type OrderItemQuantity = number;
type OrderItemPrice = number;
type PaymentName = string;
type Money = number;
type AcceptedNumber = string;
type PaymentRequestId = string;
type TravelAccountNumber = string;
type IsNew = boolean;
type TotalMoney = number;
type TotalComsumption = number;

interface ParticipantInfo {
    memberId: MemberId;
    nickname: Nickname;
    profileImage: ProfileImage;
  }

interface OrderItems {
    orderItemId: OrderItemId;
    orderItemTitle: OrderItemTitle;
    orderItemQuantity : OrderItemquantity;
    orderItemPrice: OrderItemPrice;
  }

// 모임 통장 공금 잔액 조회
interface GroupAccountBalance {
  currentBalance: CurrentBalance;
  totalMoney: TotalMoney;
  totalComsumption: TotalComsumption;
  usagePercentage: UsagePercentage;
}

// 모임 통장 개인 잔액 조회
interface PersonalAccountBalance {
  participant: ParticipantInfo;
  personalCurrentBalance: PersonalCurrentBalance;
  personalCurrentMoney: TotalMoney;
  personalTotalConsumption: TotalComsumption;
  personalUsagePercentage: PersonalUsagePercentage;
  needsAdditionalDeposit?: NeedsAdditionalDeposit;
}

// 결제 내역 전체 조회 GET
interface TransactionList {
    transactionId : TransactionId;
    paymentName : PaymentName;
    money : Money;
    participants : ParticipantInfo[];   // 정산한 사람들(default)
    transactionType : TransactionType;
    currentBalance : CurrentBalance;
    createdAt : CreatedAt;
}

// 상세 조회 영수증 정산 'receipt'의 details
interface SettledItemByReceipt {
    orderItemId: OrderItemId;
    orderItemTitle : OrderItemTitle;
    orderItemPrice: OrderItemPrice;
    orderItemQuantity : OrderItemQuantity;
    participants : ParticipantInfo[];
}

// 상세 조회 직접 정산 'custom' 의 details
interface SettledParticipantByCustom {
    participant: ParticipantInfo;
    money:Money;
}

// 정산 정보 상세 조회 GET

// 공통 타입 정의
interface BaseTransactionDetail {
    transactionId : TransactionId;
    paymentName: PaymentName;
    adress: Adress;
    money: Money;
    createdAt: CreatedAt;
    // acceptedNumber: AcceptedNumber;
}
  
// 정산 완료 영수증 (N분의 1)
interface TransactionDetailByReceipt extends BaseTransactionDetail  {
    details: SettledItemByReceipt[];
    splitMethod: SplitMethod; // 'receipt'
}
  
// 정산 완료 (직접 정산) (default 정산)
interface TransactionDetailByCustom extends BaseTransactionDetail  {
    details: SettledParticipantByCustom[];
    splitMethod: SplitMethod; // 'custom'
}

type TransactionDetailProps =
  | TransactionDetailByReceipt
  | TransactionDetailByCustom;

interface CompleteTransaction {
    transactionId: TransactionId;
    money:Money;
    adress:Adress;
    paymentName:PaymentName;
    createdAt:CreatedAt;
    isNew?:IsNew;
}

interface ChatItem {
  item_name:string,
  quantity:number,
  price:number
}

interface ChatJsonProps {
  puchase_data : string;
  items : ChatItem[]
}

interface PosPay {
  money:Money;
  adress:Adress;
  paymentName:PaymentName;
}

interface PosOderItem {
  title:string;
  amount:number;
  quantity:number;
}

interface PaymentProps {
  paymentRequestId : string;
  sourceAccountNumber: string;
  placeId: string;
  placeName:string;
  placeAdress:string;
  latitude: number;
  logitude:number;
  targetAccountNumber: string;
  OrderItems : OrderItems[];
}
  // api 요청
interface MoyeobangResponse<T> {
    isSuccess: boolean;
    code: number;
    message: string;
    data: T;
    errors: string[];
  }
  

type getGroupAccountStateResponse = MoyeobangResponse<GroupAccountBalance>;
type getAccountStateByMembeerIdResponse = MoyeobangResponse<PersonalAccountBalance>;
type GetTransactionListByAccountIdByMemberId = MoyeobangResponse<TransactionList[]>;
type GetTransactionDetailByAccountId = MoyeobangResponse<TransactionDetailProps>;
type PostTransactionDetailByCustomResponse = MoyeobangResponse<TransactionDetailByCustom>;
type PutTransactionDetailByCustomResponse = MoyeobangResponse<TransactionDetailByCustom>;
type PostTransactionDetailByReceiptResponse = MoyeobangResponse<TransactionDetailByReceipt>;
type PutTransactionDetailByReceiptResponse = MoyeobangResponse<TransactionDetailByReceipt>;


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
