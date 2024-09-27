import profileImageUrl from '@/assets/images/profile.jpg'

export const profileData : ParticipantInfo[] = [
    {   
        memberId : 1,
        memberName: "김두열",
        profileImage : profileImageUrl,
    },
    {   
        memberId : 2,
        memberName: "김훈민",
        profileImage : profileImageUrl,
    },
    {   
        memberId : 3,
        memberName: "박진우",
        profileImage : profileImageUrl,
    },
    {   
        memberId : 4,
        memberName: "전가현",
        profileImage : profileImageUrl,
    },
    {   
      memberId : 5,
      memberName: "강두홍",
      profileImage : profileImageUrl,
  },
  {   
      memberId : 6,
      memberName: "유지연",
      profileImage : profileImageUrl,
  },
  ]
  
  export const transactions = [
      {
        transactionId: 2,
        paymentName: "스타벅스",
        details: [
          {
            orderItemId:1,
            orderItemTitle: "아이스아메리카노",
            orderItemQuantity:1,
            orderItemPrice: 3000,
          },
          {
            orderItemId:2,
            orderItemTitle: "카페라떼",
            orderItemQuantity:1,
            orderItemPrice: 5000,
          },
          {
            orderItemId:3,
            orderItemTitle: "샌드위치",
            orderItemQuantity:1,
            orderItemPrice: 6000,
          },
        ],
        money: 12000,
        participants: [
          {
              "memberId": 1,
              "memberName": "홍길동",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 2,
              "memberName": "김철수",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 3,
              "memberName": "이영희",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 4,
              "memberName": "박민수",
              "profileImage":  profileImageUrl
            },
           
        ], 
        splitMethod: "custom",
        transactionType : "입금",
        currentBalance : 1203000,
        createdAt: "2024-09-01T12:34:56Z", 
      },
      {
        transactionId: 3,
        paymentName: "스타벅스",
        details: [
          {
            orderItemId:1,
            orderItemTitle: "아이스아메리카노",
            orderItemQuantity:1,
            orderItemPrice: 3000,
          },
          {
            orderItemId:2,
            orderItemTitle: "카페라떼",
            orderItemQuantity:1,
            orderItemPrice: 5000,
          },
          {
            orderItemId:3,
            orderItemTitle: "샌드위치",
            orderItemQuantity:1,
            orderItemPrice: 6000,
          },
        ],
        money: 12000,
        participants: [
          {
              "memberId": 1,
              "memberName": "홍길동",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 2,
              "memberName": "김철수",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 3,
              "memberName": "이영희",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 4,
              "memberName": "박민수",
              "profileImage":  profileImageUrl
            },
           
        ], 
        splitMethod: "custom",
        transactionType : "입금",
        currentBalance : 1203000,
        createdAt: new Date(), 
      },
      {
        transactionId: 1,
        paymentName: "스타벅스",
        details: [
          {
            orderItemId:1,
            orderItemTitle: "아이스아메리카노",
            orderItemQuantity:1,
            orderItemPrice: 3000,
          },
          {
            orderItemId:2,
            orderItemTitle: "카페라떼",
            orderItemQuantity:1,
            orderItemPrice: 5000,
          },
          {
            orderItemId:3,
            orderItemTitle: "샌드위치",
            orderItemQuantity:1,
            orderItemPrice: 6000,
          },
        ],
        money: 12000,
        participants: [
          {
              "memberId": 1,
              "memberName": "홍길동",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 2,
              "memberName": "김철수",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 3,
              "memberName": "이영희",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 4,
              "memberName": "박민수",
              "profileImage":  profileImageUrl
            },
           
        ], 
        splitMethod: "custom",
        transactionType : "출금",
        currentBalance : 1203000,
        createdAt: "2024-09-01T12:34:56Z", 
      },
      {
        transactionId: 1,
        paymentName: "스타벅스",
        details: [
          {
            orderItemId:1,
            orderItemTitle: "아이스아메리카노",
            orderItemQuantity:1,
            orderItemPrice: 3000,
          },
          {
            orderItemId:2,
            orderItemTitle: "카페라떼",
            orderItemQuantity:1,
            orderItemPrice: 5000,
          },
          {
            orderItemId:3,
            orderItemTitle: "샌드위치",
            orderItemQuantity:1,
            orderItemPrice: 6000,
          },
        ],
        money: 12000,
        participants: [
          {
              "memberId": 1,
              "memberName": "홍길동",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 2,
              "memberName": "김철수",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 3,
              "memberName": "이영희",
              "profileImage":  profileImageUrl
            },
            {
              "memberId": 4,
              "memberName": "박민수",
              "profileImage":  profileImageUrl
            },
           
        ], 
        splitMethod: "custom",
        transactionType : "입금",
        currentBalance : 1203000,
        createdAt: new Date(), 
      },
    ];

    // 영수증정산
export const detailsByReceipt = {
      transactionId: 1,
      paymentName: "스타벅스",
      adress: "광주광역시 광산구 00로 00번길",
      money: 12000,
      details:   [
        {
          orderItemId:1,
           orderItemTitle: "아이스아메리카노",
           orderItemQuantity:1,
           orderItemPrice: 3000,
           participants: [
             {
               memberId: 1,
               memberName: "김훈민",
               profileImage: profileImageUrl
             }
           ]
         },
         {
            orderItemId:2,
           orderItemTitle: "라떼",
           orderItemQuantity:2,
           orderItemPrice: 4000,
           participants: [
             {
               memberId: 1,
               memberName: "김훈민",
               profileImage: profileImageUrl
             },
             {
               memberId: 2,
               memberName: "이수민",
               profileImage: profileImageUrl
             }
           ]
         },
       {  
         orderItemId:3,
         orderItemTitle: "샌드위치",
         orderItemQuantity:1,
         orderItemPrice: 5000,
         participants: [
           {
             memberId: 3,
             memberName: "박지현",
             profileImage: profileImageUrl
          }
         ]
        },
        {
         orderItemId:4,
         orderItemTitle: "카라멜마끼아또",
         orderItemQuantity:2,
         orderItemPrice: 9000,
         participants: [
           {
             memberId: 1,
             memberName: "김훈민",
             profileImage: profileImageUrl
           },
           {
             memberId: 2,
             memberName: "이수민",
             profileImage: profileImageUrl
           }
         ]
       },
     ],
      splitMethod: "receipt",  // 정산 방식
      createdAt: "2024-09-01T12:34:56Z"
    }

//  직접 정산
export const detailsByCustom = {
      transactionId: 1,
      paymentName: "스타벅스",
      adress: "광주광역시 광산구 00로 00번길",
      money: 80000,
      details: [
        // {
        //   participant : {
        //   memberId: 1,
        //   memberName: "김훈민",
        //   profileImage: profileImageUrl
        //   },
        //   money : 20000
        // },
        {
          participant : {
          memberId: 2,
          memberName: "강두홍",
          profileImage: profileImageUrl
          },
          money : 20000
        },
        {
          participant : {
          memberId: 3,
          memberName: "전가현",
          profileImage: profileImageUrl
          },
          money : 20000
        },
        {
          participant : {
          memberId: 4,
          memberName: "김두열",
          profileImage: profileImageUrl
          },
          money : 20000
        },
        {
          participant : {
          memberId: 5,
          memberName: "박진우",
          profileImage: profileImageUrl
          },
          money : 20000
        },
      ],
      splitMethod: "custom",  // 정산 방식
      settled: true,     // 정산 완료
      createdAt: "2024-09-01T12:34:56Z"
    }

const content = "```json\n{\n    \"approval_number\": \"POS 1039331\",\n    \"address\": \"광주광역시 광산구 임방울대로 347 (수완동)\",\n    \"place_name\": \"(주)아성다이소 광주수완점\",\n    \"time\": \"2024.01.27 21:56:02\",\n    \"products\": [\n        {\n            \"product_name\": \"매장용 반투명 타포린백\",\n            \"quantity\": 1,\n            \"price\": 1000\n        },\n        {\n            \"product_name\": \"코인초콜릿레몬 (100 g)\",\n            \"quantity\": 1,\n            \"price\": 2000\n        },\n        {\n            \"product_name\": \"모델링페이스트 (100 ml)\",\n            \"quantity\": 1,\n            \"price\": 1000\n        },\n        {\n            \"product_name\": \"딸기쿠키크런치 (20 g)\",\n            \"quantity\": 1,\n            \"price\": 1000\n        },\n        {\n            \"product_name\": \"딸기데코파우더 (20 g)\",\n            \"quantity\": 1,\n            \"price\": 1000\n        },\n        {\n            \"product_name\": \"캔버스스케치북 (A4/10매)\",\n            \"quantity\": 1,\n            \"price\": 2000\n        },\n        {\n            \"product_name\": \"미술용둥근붓 6개입\",\n            \"quantity\": 1,\n            \"price\": 2000\n        },\n        {\n            \"product_name\": \"비접착식선물봉투25매 (11\",\n            \"quantity\": 1,\n            \"price\": 1000\n        },\n        {\n            \"product_name\": \"다기능고급주방가위\",\n            \"quantity\": 1,\n            \"price\": 2000\n        },\n        {\n            \"product_name\": \"손잡이틈새청소솔\",\n            \"quantity\": 1,\n            \"price\": 2000\n        }\n    ]\n}\n```\n"
// 텍스트에서 불필요한 ```json과 개행 문자 제거
const cleanContent = content.replace(/```json|```|\n/g, '');
export const chatData = JSON.parse(cleanContent);


export const proportionData = {
	consumptionByCategory : [
		{
		categoryName : '액티비티',
		proportion : 20.5,
		balance:80000
		},
		{
		categoryName : '식당',
		proportion : 9.5,
		balance:121000
		},
    {
      categoryName : '카페',
      proportion : 5.0,
      balance:121000
    },
    {
      categoryName : '쇼핑',
      proportion : 3.3,
      balance:121000
      },
		{
		categoryName : '호텔',
		proportion : 9.0,
		balance:121000
		},
    {
      categoryName : '항공',
      proportion : 22.2,
      balance:121000
    },
		{
		categoryName : '기타',
		proportion : 30.5,
		balance:121000
		}
	],
	consumptionByMember: [
		{
      member : {
      memberId: 3,
      memberName: "전가현",
      profileImage: profileImageUrl
      },
		proportion : 38.3,
		balance :23000
		},
		{
      member : {
        memberId: 3,
        memberName: "강두홍",
        profileImage: profileImageUrl
        },
		proportion : 38.3,
		balance :23000
		},
    {
      member : {
        memberId: 3,
        memberName: "김훈민",
        profileImage: profileImageUrl
        },
		proportion : 38.3,
		balance :23000
		},
    {
      member : {
        memberId: 3,
        memberName: "박진우",
        profileImage: profileImageUrl
        },
		proportion : 38.3,
		balance :23000
		},
	]
}