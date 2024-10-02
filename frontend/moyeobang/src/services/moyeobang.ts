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
  getTransactionDetail: async (accountId: number, transactionId?: number) =>
    axios.get<MoyeobangResponse<TransactionDetailProps>>(
      `/accounts/${accountId}/transactions/${transactionId}`
    ),
  /**
   * 직접 정산
   */
  postSettleByCustom: async (
    transactionId: number,
    data: PostTransactionDetailByCustom
  ) =>
    axios.post<MoyeobangResponse<null>>(
      `/travel/accounts/transactions/${transactionId}/settle/custom`,
      data,
      {
        headers: {'Content-Type': 'application/json'},
      }
    ),
  /**
   * 직접 정산 수정 fetch임 추후에
   */
  putSettleByCustom: async (
    transactionId: number,
    data: PostTransactionDetailByCustom
  ) =>
    axios.post<MoyeobangResponse<null>>(
      `/travel/accounts/transactions/${transactionId}/settle/custom`,
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
    data: PostTransactionDetailByReceipt
  ) =>
    axios.post<MoyeobangResponse<null>>(
      `/travel/accounts/transactions/${transactionId}/settle`,
      data,
      {
        headers: {'Content-Type': 'application/json'},
      }
    ),
  /**
   * 영수증 정산 수정 fetch임 추후에
   */
  putSettleByReceipt: async (
    transactionId: number,
    data: TransactionDetailByReceipt
  ) =>
    axios.post<MoyeobangResponse<null>>(
      `/travel/accounts/transactions/${transactionId}/settle`,
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
  postQuiz: async (travelId: Id, data: SubmitQuiz) =>
    axios.post<MoyeobangResponse<boolean>>(`/travels/${travelId}/quiz`, data, {
      headers: {'Content-Type': 'application/json'},
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
   * 공금입금
   */
  postDepositAccount: async (accountId: number, data: PostDepositAccount) =>
    axios.post<MoyeobangResponse<ResponsePostDepositAccount>>(
      `/accounts/${accountId}/deposit`,
      data,
      {
        headers: {'Content-Type': 'application/json'},
      }
    ),

  /**
   * 1원입금 요청 api
   */
  postDepositAccountOne: async (accountNumber: string, bankName: string) =>
    axios.post<MoyeobangResponse<null>>(
      '/auth/account/verify/initiate',
      {accountNumber: accountNumber, bankName: bankName},
      {
        headers: {'Content-Type': 'application/json'},
      }
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
};
