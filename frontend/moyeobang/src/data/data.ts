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
              memberId: 1,
              nickname: "홍길동",
              profileImage:  profileImageUrl
            },
            {
              memberId: 2,
              nickname: "김철수",
              profileImage:  profileImageUrl
            },
            {
              memberId: 3,
              nickname: "이영희",
              profileImage:  profileImageUrl
            },
            {
              memberId: 4,
              nickname: "박민수",
              profileImage:  profileImageUrl
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
              memberId: 1,
              nickname: "홍길동",
              profileImage:  profileImageUrl
            },
            {
              memberId: 2,
              nickname: "김철수",
              profileImage:  profileImageUrl
            },
            {
              memberId: 3,
              nickname: "이영희",
              rofileImage:  profileImageUrl
            },
            {
              memberId: 4,
              nickname: "박민수",
              profileImage:  profileImageUrl
            },
        ], 
        splitMethod: "equal",
        settled: true, 
        isDeposit : true,
        totalBalance : 1203000,
        createdAt: "2024-09-01T12:34:56Z", 
      },
    ];



export const detailDataByEqualBeforeSettle = {
      "transactionId": "001",
      "place": "스타벅스",
      "adress": "광주광역시 광산구 00로 00번길",
      "details":  [
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
      "totalAmount": 12000,
      "participants": [
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
      ],  // 정산에 참여한 사용자 ID
      "splitMethod": "equal",  // 정산 방식: "equal" (N분의 1) 또는 "custom" (사용자 지정)
      "settled": "false",   // "true" (정산 완료) 또는 "false" (정산 전)
      "createdAt": "2024-09-01T12:34:56Z"
    }


// 정산 완료 영수증 정산 settled:'true' splitMethod: 'eqaul'

export const detailDataByEqualAfterSettle = {
      "transactionId": "002",
      "place": "스타벅스",
      "adress": "광주광역시 광산구 00로 00번길",
      "description":  [
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
      "amount": 12000,
      "details":   [
        {
           "orderItemTitle": "아아",
           "orderItemAmount": 3000,
           "participants": [
             {
               "memberId": 1,
               "nickname": "김훈민",
               "profileImage": profileImageUrl
             }
           ]
         },
         {
           "orderItemTitle": "라떼",
           "orderItemAmount": 4000,
           "participants": [
             {
               "memberId": 1,
               "nickname": "김훈민",
               "profileImage": profileImageUrl
             },
             {
               "memberId": 2,
               "nickname": "이수민",
               "profileImage": profileImageUrl
             }
           ]
         },
       {
         "orderItemTitle": "샌드위치",
         "orderItemAmount": 5000,
         "participants": [
           {
             "memberId": 3,
             "nickname": "박지현",
             "profileImage": profileImageUrl
          }
         ]
        }
     ]
         ,
      "splitMethod": "equal",  // 정산 방식
      "settled": "true",     // 정산 완료
      "createdAt": "2024-09-01T12:34:56Z"
    }

// 정산 완료 직접 정산 settled:'true' splitMethod: 'custom'
export const detailDataByCustomAfterSettle = {
      "transactionId": "002",
      "place": "스타벅스",
      "adress": "광주광역시 광산구 00로 00번길",
      "amount": 12000,
      "details": [
        {
          "participant" : {
            "memberId": 1,
            "nickname": "김훈민",
            "profileImage": profileImageUrl
          },
          "amount" : 24000
        },
        {
          "participant" : {
            "memberId": 2,
            "nickname": "강두홍",
            "profileImage": profileImageUrl
          },
          "amount" : 24000
        },
        {
          "participant" : {
            "memberId": 3,
            "nickname": "전가현",
            "profileImage": profileImageUrl
          },
          "amount" : 24000
        }
      ],
      "splitMethod": "custom",  // 정산 방식
      "settled": "true",     // 정산 완료
      "createdAt": "2024-09-01T12:34:56Z"
    }