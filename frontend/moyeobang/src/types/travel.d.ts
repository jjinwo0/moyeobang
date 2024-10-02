// 여행 목록 관련 정보
interface Travel {
  travelId: Id;
  travelName: TravelName;
  travelImg: ImgUrl | null;
  participantCount: ParticipantsCount;
  startDate: StartDate;
  endDate: EndDate;
  travelPlaceList: Place[];
  quizQuestion: QuizQuestion;
  quizAnswer: QuizAnswer;
  accountId: AccountId;
  accountNumber: AccountNumber;
  participantsInfo: ParticipantInfo[];
}

interface TravelSummary {
  locationList: TravelLocation[];
  totalAmount: TotalAmount;
  amountUsed: TotalComsumption;
  amountComparison: AmountComparison;
  consumptionByCategory: ConsumptionCategory[];
  consumptionTag: ConsumptionTag[];
  consumptionByMember: ConsumptionByMember[];
  imgSummary: ImgSummary[];
}

// 퀴즈 관련
interface Quiz {
  question: Question;
  travelName: TravelName;
}

interface ResponsePostTravel {
  travelId: Id;
}

interface ResponsePostAccount {
  accountNumber: TravelAccountNumber;
}

interface PostTravel {
  travelName: TravelName;
  startDate: StartDate;
  endDate: EndDate;
  travelPlaceList: Place[];
  quizQuestion: QuizQuestion;
  quizAnswer: QuizAnswer;
  travelImg: ImgUrl | null;
}

interface Member {
  memberId: Id;
  memberName: MemberName;
  profileImage: ImgUrl;
  accountNumber: TravelAccountNumber;
}

interface SubmitQuiz {
  answer: QuizAnswer;
}

interface ImgSummary {
  imgUrl: ImgUrl;
  locationName: LocationName;
}

type BankName = string;

interface ResponseGetProfile {
  memberId: Id;
  memberName: MemberName;
  profileImage: ImgUrl;
  bankName: BankName;
  accountNumber: TravelAccountNumber;
}
