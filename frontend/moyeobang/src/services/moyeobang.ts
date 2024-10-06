import axios from '@/util/axios';
import axios8081 from '@/util/axios8081';

export default {
  // 모임 통장
  /**
   * 모임 통장 공금 잔액 조회
   */
  getAccountState: async (accountId: number) =>
    axios.get<MoyeobangResponse<AccountBalanceByGroup>>(
      `/accounts/${accountId}/balance`
    ),
  /**
   * 모임 통장 개인별 공금 잔액 조회
   */
  getAccountStateBymemberId: async (accountId: number, memberId: number) =>
    axios.get<MoyeobangResponse<AccountBalanceBymemberId>>(
      `/accounts/${accountId}/balance/member/${memberId}`
    ),
  /**
   * 전체 결제 내역 전체 & 개별 조회
   */
  getTransactionList: async (accountId: number, memberIds: number[]) =>
    axios.get<MoyeobangResponse<TransactionList[]>>(
      `/accounts/${accountId}/transactions`,
      {
        params: {
          memberIds: memberIds.join(','),
        },
      }
    ),
  /**
   * 전체 결제 내역 상세 조회
   */
  getTransactionDetail: async (accountId: number, transactionId: number) =>
    axios.get<MoyeobangResponse<TransactionDetailProps>>(
      `/accounts/${accountId}/transactions/${transactionId}`
    ),
  /**
   * 직접 정산
   */
  postSettleByCustom: async (
    transactionId: number,
    travelId: number,
    data: PostTransactionDetailByCustom
  ) =>
    axios.post<MoyeobangResponse<null>>(
      `/travel/accounts/transactions/${transactionId}/settle/custom/${travelId}`,
      data,
      {
        headers: {'Content-Type': 'application/json'},
      }
    ),
  /**
   * 직접 정산 수정
   */
  updateSettleByCustom: async (
    transactionId: number,
    travelId: number,
    data: PostTransactionDetailByCustom
  ) =>
    axios.post<MoyeobangResponse<null>>(
      `/travel/accounts/transactions/${transactionId}/settle/update/custom/${travelId}`,
      data,
      {
        headers: {'Content-Type': 'application/json'},
      }
    ),
  /**
   * 영수증 정산
   */
  postSettleByReceipt: async (
    transactionId: number,
    travelId: number,
    data: PostTransactionDetailByReceipt
  ) =>
    axios.post<MoyeobangResponse<null>>(
      `/travel/accounts/transactions/${transactionId}/settle/${travelId}`,
      data,
      {
        headers: {'Content-Type': 'application/json'},
      }
    ),
  /**
   * 영수증 정산 수정
   */
  updateSettleByReceipt: async (
    transactionId: number,
    travelId: number,
    data: PostTransactionDetailByReceipt
  ) =>
    axios.post<MoyeobangResponse<null>>(
      `/travel/accounts/transactions/${transactionId}/settle/update/${travelId}`,
      data,
      {
        headers: {'Content-Type': 'application/json'},
      }
    ),
  /**
   * pos기 결제 요청
   */
  postPayByPos: async (data: PaymentProps) =>
    axios8081.post<MoyeobangResponse<null>>('/payment/process', data, {
      headers: {'Content-Type': 'application/json'},
    }),
  /**
   * online 결제 요청
   */
  postPayByOnline: async (data: PaymentProps) =>
    axios.post<MoyeobangResponse<{transactionId: TransactionId}>>(
      '/payment/process',
      data,
      {
        headers: {'Content-Type': 'application/json'},
      }
    ),
  /**
  * 소비 카테고리 통계 비율 멤버별&전체 조회
  */
  getComsuptionStaticByCategory: async (accountId: number, memberIds: number[]) =>
    axios.get<MoyeobangResponse<ConsumptionByCategory[]>>(
      `/accounts/${accountId}/tags`,
      {
        params: {
          memberIds: memberIds.join(','),
        },
      }
    ),
  /**
   * 멤버별 소비 비율 통계 조회
   */
  getComsuptionStaticByMembers: async (accountId: number) =>
    axios.get<MoyeobangResponse<ConsumptionByMember[]>>(
      `/accounts/${accountId}/withdraw-proportion`
    ),
  /**
   * 여행 목록 전체 조회
   */
  getTravelList: async (memberId: number) =>
    axios.get<MoyeobangResponse<Travel>>('/travels', {
      params: {
        memberId: memberId,
      },
    }),

  /**
   * 여행 생성 api
   */
  postTravel: async (data: FormData, memberId: number) =>
    axios.post<MoyeobangResponse<ResponsePostTravel>>('/travels', data, {
      headers: {'Content-Type': 'multipart/form-data'},
      params: {
        memberId: memberId,
      },
    }),

  /**
   * 여행 정보 수정 api
   */
  putTravel: async (travelId: Id, data: FormData) =>
    axios.put<MoyeobangResponse<null>>(`/travels/${travelId}`, data, {
      headers: {'Content-Type': 'multipart/form-data'},
    }),

  /**
   * 여행 퀴즈 조회 api
   */
  getTravelQuiz: async (travelId: Id) =>
    axios.get<MoyeobangResponse<Quiz>>(`/travels/${travelId}/quiz`),

  /**
   * 여행 나가기 api
   */
  leaveTravel: async (travelId: Id, memberId: Id) =>
    axios.post<MoyeobangResponse<null>>(
      `/travels/${travelId}/leave`,
      {memberId: memberId},
      {
        headers: {'Content-type': 'application/json'},
      }
    ),

  /**
   * 참가자 퀴즈 제출
   */
  postQuiz: async (travelId: Id, data: SubmitQuiz, memberId: number) =>
    axios.post<MoyeobangResponse<boolean>>(`/travels/${travelId}/quiz`, data, {
      headers: {'Content-Type': 'application/json'},
      params: {memberId},
    }),

  /**
   * 여행 계좌 생성
   */
  postAccount: async (travelId: Id) =>
    axios.post<MoyeobangResponse<ResponsePostAccount>>(
      '/accounts',
      {travelId: travelId},
      {headers: {'Content-Type': 'application/json'}}
    ),

  /**
   * 공금 입금 요청
   */
  postResquestDepositAccount: async (accountId: number, totalAmount: number) =>
    axios.post<MoyeobangResponse<ResponsePostDepositAccount>>(
      `/accounts/${accountId}/deposit/request`,
      {totalAmount},
      {
        headers: {'Content-Type': 'application/json'},
      }
    ),

  /**
   * 공금입금 api
   */
  postDepositAccount: async (
    accountId: number,
    memberId: number,
    amount: number
  ) =>
    axios.post<MoyeobangResponse<ResponseDepositAccount>>(
      `/accounts/${accountId}/deposit`,
      {
        memberId: memberId,
        amount: amount,
      },
      {
        headers: {'Content-Type': 'application/json'},
      }
    ),

  /**
   * 1원입금 요청 api
   */
  postDepositAccountOne: async (accountNumber: string, bankName: string) =>
    axios.post<MoyeobangResponse<ResponseDepositOne>>(
      '/auth/account/verify/initiate',
      {accountNumber: accountNumber, bankName: bankName},
      {
        headers: {'Content-Type': 'application/json'},
      }
    ),

  /**
   * 1원입금 인증 코드 알림 api
   */
  postVerifyNotification: async (memberId: number, transactionId: number) =>
    axios.post<MoyeobangResponse<ResponseVerifyNotification>>(
      `/notification/verify/${memberId}/${transactionId}`
    ),

  /**
   * 1원입금 확인 api
   */
  postDepositAccountOneConfirm: async (
    accountNumber: string,
    authCode: string
  ) =>
    axios.post<MoyeobangResponse<null>>(
      '/auth/account/verify/confirm',
      {
        accountNumber: accountNumber,
        authCode: authCode,
      },
      {
        headers: {'Content-Type': 'application/json'},
      }
    ),

  /**
   * 나의 프로필 조회 api
   */
  getMyProfile: async () =>
    axios.get<MoyeobangResponse<ResponseGetProfile>>('/user/me/profile'),

  /**
   * 등록 계좌 삭제 api
   */
  deleteAccount: async () =>
    axios.delete<MoyeobangResponse<null>>('/auth/account'),

  /**
   * 여행 일정 추가
   */
  postTravelSchedule: async (travelId: Id, data: PostTravelSchedule) =>
    axios.post<MoyeobangResponse<null>>(`/travel/${travelId}/schedule`, data, {
      headers: {'Content-Type': 'application/json'},
    }),

  /**
   * 여행 일정 조회
   */
  getTravelSchedules: async (travelId: Id) =>
    axios.get<MoyeobangResponse<GetTravelSchedules>>(
      `travel/${travelId}/schedules`
    ),

  /**
   * 여행 일정 수정
   */
  putTravelSchedule: async (
    travelId: Id,
    scheduleId: Id,
    data: PostTravelSchedule
  ) => {
    axios.put<MoyeobangResponse<null>>(
      `/travel/${travelId}/schedule/${scheduleId}`,
      data,
      {
        headers: {'Content-Type': 'application/json'},
      }
    );
  },
  /**
   * 개인 계좌 등록
   */
  postRegisterAccount: async (memberId: number, accountNumber: string) =>
    axios.post<MoyeobangResponse<null>>(`/register/account/${memberId}`, {
      params: {
        accountNo: accountNumber,
      },
    }),
};
