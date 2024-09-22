import axios from '@/util/axios';

export default {
  // 모임 통장
  /**
   * 모임 통장 공금 잔액 조회
   */
  getAccountState: async (accountId?: number) =>
    axios.get<getGroupAccountStateResponse>(`/accounts/${accountId}/balance`, {
      params: {
        accountId,
      },
    }),
  /**
   * 모임 통장 공금 잔액 조회
   */
  getAccountStateBymemberId: async (accountId?: number) =>
    axios.get<getAccountStateByMembeerIdResponse>(
      `/accounts/${accountId}/balance/member`,
      {
        params: {
          accountId,
        },
      }
    ),
  /**
   * 전체 결제 내역 전체 & 개별 조회
   */
  getTransactionList: async (accountId?: number, memberIds?: number[]) =>
    axios.get<GetTransactionListByAccountIdByMemberId>(
      `/accounts/${accountId}/transactions`,
      {
        params: {
          accountId,
          memberIds: memberIds?.join(','),
        },
      }
    ),
  /**
   * 전체 결제 내역 상세 조회
   */
  getTransactionDetail: async (accountId?: number, transactionId?: number) =>
    axios.get<GetTransactionDetailByAccountId>(
      `/accounts/${accountId}/transactions/${transactionId}`,
      {
        params: {
          accountId,
          transactionId,
        },
      }
    ),
  /**
   * 직접 정산
   */
  postSettleByCustom: async (
    transactionId: number,
    data: PostTransactionDetailByCustom
  ) =>
    axios.post<PostTransactionDetailByCustomResponse>(
      `/travel/accounts/transactions/${transactionId}/settle/custom`,
      data,
      {
        headers: {'Content-Type': 'application/json'},
      }
    ),
  /**
   * 직접 정산 수정
   */
  putSettleByCustom: async (
    transactionId: number,
    data: TransactionDetailByCustom
  ) =>
    axios.post<PutTransactionDetailByCustomResponse>(
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
    data: TransactionDetailByReceipt
  ) =>
    axios.post<PostTransactionDetailByReceiptResponse>(
      `/travel/accounts/transactions/${transactionId}/settle`,
      data,
      {
        headers: {'Content-Type': 'application/json'},
      }
    ),
  /**
   * 영수증 정산 수정
   */
  putSettleByReceipt: async (
    transactionId: number,
    data: TransactionDetailByReceipt
  ) =>
    axios.post<PutTransactionDetailByReceiptResponse>(
      `/travel/accounts/transactions/${transactionId}/settle`,
      data,
      {
        headers: {'Content-Type': 'application/json'},
      }
    ),

  /**
   * 여행 목록 전체 조회
   */
  getTravelList: async () => {
    axios.get<MoyeobangResponse<Travel>>('/travel/');
  },
};
