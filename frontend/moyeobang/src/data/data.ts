import profileImageUrl from '@/assets/images/profile.jpg'


export const profileData : ParticipantInfo[] = [
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
      "settled": false,   // "true" (정산 완료) 또는 "false" (정산 전)
      "createdAt": "2024-09-01T12:34:56Z"
    }


// 정산 완료 영수증 정산 settled:'true' splitMethod: 'eqaul'

export const detailDataByEqualAfterSettle = {
      "transactionId": "002",
      "place": "스타벅스",
      "adress": "광주광역시 광산구 00로 00번길",
    //   "description":  [
    //     {
    //       orderItemTitle: "아이스아메리카노",
    //       orderItemquantity:1,
    //       orderItemAmount: 2000,
    //     },
    //     {
    //       orderItemTitle: "라떼",
    //       orderItemquantity:2,
    //       orderItemAmount: 6000,
    //     },
    //     {
    //       orderItemTitle: "샌드위치",
    //       orderItemquantity:1,
    //       orderItemAmount: 6000,
    //     },
    //   ],
      "amount": 12000,
      "details":   [
        {
          orderItemId:1,
           "orderItemTitle": "아이스아메리카노",
           orderItemQuantity:1,
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
            orderItemId:2,
           "orderItemTitle": "라떼",
           orderItemQuantity:2,
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
          orderItemId:3,
         "orderItemTitle": "샌드위치",
         orderItemQuantity:1,
         "orderItemAmount": 5000,
         "participants": [
           {
             "memberId": 3,
             "nickname": "박지현",
             "profileImage": profileImageUrl
          }
         ]
        },
        {
          orderItemId:4,
         "orderItemTitle": "카라멜마끼아또",
         orderItemQuantity:2,
         "orderItemAmount": 9000,
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
     ]
         ,
      "splitMethod": "equal",  // 정산 방식
      "settled": true,     // 정산 완료
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
        },
        {
          "participant" : {
            "memberId": 4,
            "nickname": "김두열",
            "profileImage": profileImageUrl
          },
          "amount" : 2300
        },
        {
          "participant" : {
            "memberId": 5,
            "nickname": "박진우",
            "profileImage": profileImageUrl
          },
          "amount" : 2000
        }
      ],
      "splitMethod": "custom",  // 정산 방식
      "settled": true,     // 정산 완료
      "createdAt": "2024-09-01T12:34:56Z"
    }

const content = "```json\n{\n    \"approval_number\": \"POS 1039331\",\n    \"address\": \"광주광역시 광산구 임방울대로 347 (수완동)\",\n    \"place_name\": \"(주)아성다이소 광주수완점\",\n    \"time\": \"2024.01.27 21:56:02\",\n    \"products\": [\n        {\n            \"product_name\": \"매장용 반투명 타포린백\",\n            \"quantity\": 1,\n            \"price\": 1000\n        },\n        {\n            \"product_name\": \"코인초콜릿레몬 (100 g)\",\n            \"quantity\": 1,\n            \"price\": 2000\n        },\n        {\n            \"product_name\": \"모델링페이스트 (100 ml)\",\n            \"quantity\": 1,\n            \"price\": 1000\n        },\n        {\n            \"product_name\": \"딸기쿠키크런치 (20 g)\",\n            \"quantity\": 1,\n            \"price\": 1000\n        },\n        {\n            \"product_name\": \"딸기데코파우더 (20 g)\",\n            \"quantity\": 1,\n            \"price\": 1000\n        },\n        {\n            \"product_name\": \"캔버스스케치북 (A4/10매)\",\n            \"quantity\": 1,\n            \"price\": 2000\n        },\n        {\n            \"product_name\": \"미술용둥근붓 6개입\",\n            \"quantity\": 1,\n            \"price\": 2000\n        },\n        {\n            \"product_name\": \"비접착식선물봉투25매 (11\",\n            \"quantity\": 1,\n            \"price\": 1000\n        },\n        {\n            \"product_name\": \"다기능고급주방가위\",\n            \"quantity\": 1,\n            \"price\": 2000\n        },\n        {\n            \"product_name\": \"손잡이틈새청소솔\",\n            \"quantity\": 1,\n            \"price\": 2000\n        }\n    ]\n}\n```\n"
// 텍스트에서 불필요한 ```json과 개행 문자 제거
const cleanContent = content.replace(/```json|```|\n/g, '');
export const chatData = JSON.parse(cleanContent);