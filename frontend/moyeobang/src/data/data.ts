import profileImageUrl from '@/assets/images/profile.jpg'


export const profileData : ParticipantsInfo[] = [
    {   
        memberId : 1,
        nickname: "홍길동",
        profileImage : profileImageUrl,
    },
    {   
        memberId : 2,
        nickname: "홍길동",
        profileImage : profileImageUrl,
    },
    {   
        memberId : 3,
        nickname: "홍길동",
        profileImage : profileImageUrl,
    },
    {   
        memberId : 4,
        nickname: "홍길동",
        profileImage : profileImageUrl,
    },
    {   
        memberId : 5,
        nickname: "홍길동",
        profileImage : profileImageUrl,
    },
  ]
  
  export const transactionsData = [
      {
        transactionId: 1,
        place: "스타벅스",
        details: [
          {
            orderItemTitle: "아이스아메리카노",
            orderItemAmount: 2000,
          },
          {
            orderItemTitle: "라떼",
            orderItemAmount: 3000,
          },
          {
            orderItemTitle: "샌드위치",
            orderItemAmount: 6000,
          },
        ],
        amount: 12000,
        participants: [
          {
              "memberId": 1,
              "nickname": "홍길동",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 2,
              "nickname": "김철수",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 3,
              "nickname": "이영희",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 4,
              "nickname": "박민수",
              "profileImage":  profileImageUrl
            },
           
        ], 
        splitMethod: "equal",
        settled: true, 
        isDeposit : true,
        totalBalance : 1203000,
        createdAt: "2024-09-01T12:34:56Z", 
      },
      {
        transactionId: 2,
        place: "퍼센트 커피",
        details: [
          {
            orderItemTitle: "아이스아메리카노",
            orderItemAmount: 2000,
          },
          {
            orderItemTitle: "라떼",
            orderItemAmount: 3000,
          },
          {
            orderItemTitle: "샌드위치",
            orderItemAmount: 6000,
          },
        ],
        amount: 12000,
        participants: [
          {
              "memberId": 1,
              "nickname": "홍길동",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 2,
              "nickname": "김철수",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 3,
              "nickname": "이영희",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 4,
              "nickname": "박민수",
              "profileImage":  profileImageUrl
            },
        ], 
        splitMethod: "equal",
        settled: true, 
        isDeposit : true,
        totalBalance : 1203000,
        createdAt: "2024-09-01T12:34:56Z", 
      },
      {
        transactionId: 2,
        place: "퍼센트 커피",
        details: [
          {
            orderItemTitle: "아이스아메리카노",
            orderItemAmount: 2000,
          },
          {
            orderItemTitle: "라떼",
            orderItemAmount: 3000,
          },
          {
            orderItemTitle: "샌드위치",
            orderItemAmount: 6000,
          },
        ],
        amount: 12000,
        participants: [
          {
              "memberId": 1,
              "nickname": "홍길동",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 2,
              "nickname": "김철수",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 3,
              "nickname": "이영희",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 4,
              "nickname": "박민수",
              "profileImage":  profileImageUrl
            },
        ], 
        splitMethod: "equal",
        settled: false, 
        isDeposit : false,
        totalBalance : 1203000,
        createdAt: "2024-09-01T12:34:56Z", 
      },
      {
        transactionId: 2,
        place: "퍼센트 커피",
        details: [
          {
            orderItemTitle: "아이스아메리카노",
            orderItemAmount: 2000,
          },
          {
            orderItemTitle: "라떼",
            orderItemAmount: 3000,
          },
          {
            orderItemTitle: "샌드위치",
            orderItemAmount: 6000,
          },
        ],
        amount: 12000,
        participants: [
          {
              "memberId": 1,
              "nickname": "홍길동",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 2,
              "nickname": "김철수",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 3,
              "nickname": "이영희",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 4,
              "nickname": "박민수",
              "profileImage":  profileImageUrl
            },
        ], 
        splitMethod: "equal",
        settled: true, 
        isDeposit : true,
        totalBalance : 1203000,
        createdAt: "2024-09-01T12:34:56Z", 
      },
    ];