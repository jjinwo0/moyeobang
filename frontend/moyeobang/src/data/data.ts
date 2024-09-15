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
      "settled": false,   // "true" (정산 완료) 또는 "false" (정산 전)
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
        }
      ],
      "splitMethod": "custom",  // 정산 방식
      "settled": true,     // 정산 완료
      "createdAt": "2024-09-01T12:34:56Z"
    }


export const receipts = [
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1693.0,
                  "y": 184.0
              },
              {
                  "x": 1719.0,
                  "y": 184.0
              },
              {
                  "x": 1719.0,
                  "y": 224.0
              },
              {
                  "x": 1693.0,
                  "y": 224.0
              }
          ]
      },
      "inferText": "\"",
      "inferConfidence": 0.957,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1707.0,
                  "y": 179.0
              },
              {
                  "x": 1999.0,
                  "y": 171.0
              },
              {
                  "x": 2001.0,
                  "y": 257.0
              },
              {
                  "x": 1709.0,
                  "y": 265.0
              }
          ]
      },
      "inferText": "국민가게,",
      "inferConfidence": 0.9905,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2025.0,
                  "y": 163.0
              },
              {
                  "x": 2264.0,
                  "y": 163.0
              },
              {
                  "x": 2264.0,
                  "y": 255.0
              },
              {
                  "x": 2025.0,
                  "y": 255.0
              }
          ]
      },
      "inferText": "다이소\"",
      "inferConfidence": 0.9993,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1218.0,
                  "y": 332.0
              },
              {
                  "x": 1698.0,
                  "y": 323.0
              },
              {
                  "x": 1700.0,
                  "y": 406.0
              },
              {
                  "x": 1219.0,
                  "y": 415.0
              }
          ]
      },
      "inferText": "매장:광주광역시",
      "inferConfidence": 0.9567,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1219.0,
                  "y": 255.0
              },
              {
                  "x": 1688.0,
                  "y": 255.0
              },
              {
                  "x": 1688.0,
                  "y": 342.0
              },
              {
                  "x": 1219.0,
                  "y": 342.0
              }
          ]
      },
      "inferText": "(주)아성다이소",
      "inferConfidence": 0.9995,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1681.0,
                  "y": 250.0
              },
              {
                  "x": 2004.0,
                  "y": 241.0
              },
              {
                  "x": 2006.0,
                  "y": 324.0
              },
              {
                  "x": 1683.0,
                  "y": 333.0
              }
          ]
      },
      "inferText": "광주수완점",
      "inferConfidence": 0.9986,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1709.0,
                  "y": 321.0
              },
              {
                  "x": 1911.0,
                  "y": 307.0
              },
              {
                  "x": 1917.0,
                  "y": 391.0
              },
              {
                  "x": 1715.0,
                  "y": 405.0
              }
          ]
      },
      "inferText": "광산구",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1930.0,
                  "y": 309.0
              },
              {
                  "x": 2263.0,
                  "y": 295.0
              },
              {
                  "x": 2267.0,
                  "y": 383.0
              },
              {
                  "x": 1934.0,
                  "y": 398.0
              }
          ]
      },
      "inferText": "임방울대로",
      "inferConfidence": 0.9997,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2280.0,
                  "y": 301.0
              },
              {
                  "x": 2397.0,
                  "y": 301.0
              },
              {
                  "x": 2397.0,
                  "y": 377.0
              },
              {
                  "x": 2280.0,
                  "y": 377.0
              }
          ]
      },
      "inferText": "347",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2412.0,
                  "y": 291.0
              },
              {
                  "x": 2672.0,
                  "y": 291.0
              },
              {
                  "x": 2672.0,
                  "y": 377.0
              },
              {
                  "x": 2412.0,
                  "y": 377.0
              }
          ]
      },
      "inferText": "(수완동)",
      "inferConfidence": 0.9998,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1218.0,
                  "y": 402.0
              },
              {
                  "x": 1580.0,
                  "y": 393.0
              },
              {
                  "x": 1582.0,
                  "y": 474.0
              },
              {
                  "x": 1219.0,
                  "y": 482.0
              }
          ]
      },
      "inferText": "대표 김기호",
      "inferConfidence": 0.9723,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1223.0,
                  "y": 470.0
              },
              {
                  "x": 1514.0,
                  "y": 462.0
              },
              {
                  "x": 1516.0,
                  "y": 541.0
              },
              {
                  "x": 1224.0,
                  "y": 548.0
              }
          ]
      },
      "inferText": "본사 서울",
      "inferConfidence": 0.9729,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1532.0,
                  "y": 459.0
              },
              {
                  "x": 1733.0,
                  "y": 451.0
              },
              {
                  "x": 1737.0,
                  "y": 535.0
              },
              {
                  "x": 1536.0,
                  "y": 543.0
              }
          ]
      },
      "inferText": "강남구",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1594.0,
                  "y": 394.0
              },
              {
                  "x": 1989.0,
                  "y": 383.0
              },
              {
                  "x": 1991.0,
                  "y": 459.0
              },
              {
                  "x": 1596.0,
                  "y": 470.0
              }
          ]
      },
      "inferText": "213-81-52063",
      "inferConfidence": 0.9995,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1743.0,
                  "y": 448.0
              },
              {
                  "x": 2075.0,
                  "y": 441.0
              },
              {
                  "x": 2077.0,
                  "y": 525.0
              },
              {
                  "x": 1745.0,
                  "y": 531.0
              }
          ]
      },
      "inferText": "남부순환로",
      "inferConfidence": 0.9998,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2091.0,
                  "y": 434.0
              },
              {
                  "x": 2239.0,
                  "y": 434.0
              },
              {
                  "x": 2239.0,
                  "y": 515.0
              },
              {
                  "x": 2091.0,
                  "y": 515.0
              }
          ]
      },
      "inferText": "2748",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2254.0,
                  "y": 433.0
              },
              {
                  "x": 2509.0,
                  "y": 433.0
              },
              {
                  "x": 2509.0,
                  "y": 515.0
              },
              {
                  "x": 2254.0,
                  "y": 515.0
              }
          ]
      },
      "inferText": "(도곡동)",
      "inferConfidence": 0.9996,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1539.0,
                  "y": 587.0
              },
              {
                  "x": 2137.0,
                  "y": 574.0
              },
              {
                  "x": 2138.0,
                  "y": 657.0
              },
              {
                  "x": 1541.0,
                  "y": 669.0
              }
          ]
      },
      "inferText": "소비자중심경영(CCM)",
      "inferConfidence": 0.9953,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2157.0,
                  "y": 571.0
              },
              {
                  "x": 2422.0,
                  "y": 571.0
              },
              {
                  "x": 2422.0,
                  "y": 653.0
              },
              {
                  "x": 2157.0,
                  "y": 653.0
              }
          ]
      },
      "inferText": "인증기업",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1464.0,
                  "y": 643.0
              },
              {
                  "x": 1601.0,
                  "y": 643.0
              },
              {
                  "x": 1601.0,
                  "y": 729.0
              },
              {
                  "x": 1464.0,
                  "y": 729.0
              }
          ]
      },
      "inferText": "ISO",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1586.0,
                  "y": 648.0
              },
              {
                  "x": 1749.0,
                  "y": 648.0
              },
              {
                  "x": 1749.0,
                  "y": 729.0
              },
              {
                  "x": 1586.0,
                  "y": 729.0
              }
          ]
      },
      "inferText": "9001",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1760.0,
                  "y": 648.0
              },
              {
                  "x": 2203.0,
                  "y": 648.0
              },
              {
                  "x": 2203.0,
                  "y": 719.0
              },
              {
                  "x": 1760.0,
                  "y": 719.0
              }
          ]
      },
      "inferText": "품질경영시스템",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2224.0,
                  "y": 632.0
              },
              {
                  "x": 2489.0,
                  "y": 632.0
              },
              {
                  "x": 2489.0,
                  "y": 714.0
              },
              {
                  "x": 2224.0,
                  "y": 714.0
              }
          ]
      },
      "inferText": "인증기업",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1504.0,
                  "y": 765.0
              },
              {
                  "x": 1795.0,
                  "y": 765.0
              },
              {
                  "x": 1795.0,
                  "y": 836.0
              },
              {
                  "x": 1504.0,
                  "y": 836.0
              }
          ]
      },
      "inferText": "교환/환불",
      "inferConfidence": 0.9998,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1810.0,
                  "y": 765.0
              },
              {
                  "x": 2407.0,
                  "y": 765.0
              },
              {
                  "x": 2407.0,
                  "y": 836.0
              },
              {
                  "x": 1810.0,
                  "y": 836.0
              }
          ]
      },
      "inferText": "14일(02월10일)이내,",
      "inferConfidence": 0.9994,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1224.0,
                  "y": 826.0
              },
              {
                  "x": 1627.0,
                  "y": 826.0
              },
              {
                  "x": 1627.0,
                  "y": 898.0
              },
              {
                  "x": 1224.0,
                  "y": 898.0
              }
          ]
      },
      "inferText": "(전자)영수증,",
      "inferConfidence": 0.9717,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1663.0,
                  "y": 826.0
              },
              {
                  "x": 1923.0,
                  "y": 826.0
              },
              {
                  "x": 1923.0,
                  "y": 898.0
              },
              {
                  "x": 1663.0,
                  "y": 898.0
              }
          ]
      },
      "inferText": "결제카드",
      "inferConfidence": 0.9995,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1938.0,
                  "y": 821.0
              },
              {
                  "x": 2081.0,
                  "y": 821.0
              },
              {
                  "x": 2081.0,
                  "y": 898.0
              },
              {
                  "x": 1938.0,
                  "y": 898.0
              }
          ]
      },
      "inferText": "지참",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2086.0,
                  "y": 821.0
              },
              {
                  "x": 2188.0,
                  "y": 821.0
              },
              {
                  "x": 2188.0,
                  "y": 908.0
              },
              {
                  "x": 2086.0,
                  "y": 908.0
              }
          ]
      },
      "inferText": "후",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2188.0,
                  "y": 816.0
              },
              {
                  "x": 2581.0,
                  "y": 816.0
              },
              {
                  "x": 2581.0,
                  "y": 903.0
              },
              {
                  "x": 2188.0,
                  "y": 903.0
              }
          ]
      },
      "inferText": "구입매장에서",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2601.0,
                  "y": 821.0
              },
              {
                  "x": 2739.0,
                  "y": 821.0
              },
              {
                  "x": 2739.0,
                  "y": 903.0
              },
              {
                  "x": 2601.0,
                  "y": 903.0
              }
          ]
      },
      "inferText": "가능",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1438.0,
                  "y": 887.0
              },
              {
                  "x": 1729.0,
                  "y": 887.0
              },
              {
                  "x": 1729.0,
                  "y": 959.0
              },
              {
                  "x": 1438.0,
                  "y": 959.0
              }
          ]
      },
      "inferText": "포장/가격",
      "inferConfidence": 0.9993,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1749.0,
                  "y": 887.0
              },
              {
                  "x": 2045.0,
                  "y": 887.0
              },
              {
                  "x": 2045.0,
                  "y": 959.0
              },
              {
                  "x": 1749.0,
                  "y": 959.0
              }
          ]
      },
      "inferText": "택 훼손시",
      "inferConfidence": 0.9994,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2060.0,
                  "y": 882.0
              },
              {
                  "x": 2372.0,
                  "y": 882.0
              },
              {
                  "x": 2372.0,
                  "y": 969.0
              },
              {
                  "x": 2060.0,
                  "y": 969.0
              }
          ]
      },
      "inferText": "교환/환불",
      "inferConfidence": 0.9998,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2377.0,
                  "y": 887.0
              },
              {
                  "x": 2519.0,
                  "y": 887.0
              },
              {
                  "x": 2519.0,
                  "y": 964.0
              },
              {
                  "x": 2377.0,
                  "y": 964.0
              }
          ]
      },
      "inferText": "불가",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1494.0,
                  "y": 943.0
              },
              {
                  "x": 1759.0,
                  "y": 943.0
              },
              {
                  "x": 1759.0,
                  "y": 1025.0
              },
              {
                  "x": 1494.0,
                  "y": 1025.0
              }
          ]
      },
      "inferText": "체크카드",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1780.0,
                  "y": 949.0
              },
              {
                  "x": 2014.0,
                  "y": 949.0
              },
              {
                  "x": 2014.0,
                  "y": 1025.0
              },
              {
                  "x": 1780.0,
                  "y": 1025.0
              }
          ]
      },
      "inferText": "취소 시",
      "inferConfidence": 0.9985,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2030.0,
                  "y": 949.0
              },
              {
                  "x": 2173.0,
                  "y": 949.0
              },
              {
                  "x": 2173.0,
                  "y": 1025.0
              },
              {
                  "x": 2030.0,
                  "y": 1025.0
              }
          ]
      },
      "inferText": "최대",
      "inferConfidence": 0.9997,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2183.0,
                  "y": 949.0
              },
              {
                  "x": 2305.0,
                  "y": 949.0
              },
              {
                  "x": 2305.0,
                  "y": 1035.0
              },
              {
                  "x": 2183.0,
                  "y": 1035.0
              }
          ]
      },
      "inferText": "7일",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2315.0,
                  "y": 949.0
              },
              {
                  "x": 2458.0,
                  "y": 949.0
              },
              {
                  "x": 2458.0,
                  "y": 1025.0
              },
              {
                  "x": 2315.0,
                  "y": 1025.0
              }
          ]
      },
      "inferText": "소요",
      "inferConfidence": 0.9994,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1219.0,
                  "y": 1076.0
              },
              {
                  "x": 1357.0,
                  "y": 1076.0
              },
              {
                  "x": 1357.0,
                  "y": 1148.0
              },
              {
                  "x": 1219.0,
                  "y": 1148.0
              }
          ]
      },
      "inferText": "[POS",
      "inferConfidence": 0.9997,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1372.0,
                  "y": 1076.0
              },
              {
                  "x": 1632.0,
                  "y": 1076.0
              },
              {
                  "x": 1632.0,
                  "y": 1153.0
              },
              {
                  "x": 1372.0,
                  "y": 1153.0
              }
          ]
      },
      "inferText": "1039331]",
      "inferConfidence": 0.9996,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2122.0,
                  "y": 1081.0
              },
              {
                  "x": 2463.0,
                  "y": 1081.0
              },
              {
                  "x": 2463.0,
                  "y": 1153.0
              },
              {
                  "x": 2122.0,
                  "y": 1153.0
              }
          ]
      },
      "inferText": "2024.01.27",
      "inferConfidence": 0.9956,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2468.0,
                  "y": 1086.0
              },
              {
                  "x": 2744.0,
                  "y": 1086.0
              },
              {
                  "x": 2744.0,
                  "y": 1158.0
              },
              {
                  "x": 2468.0,
                  "y": 1158.0
              }
          ]
      },
      "inferText": "21:56:02",
      "inferConfidence": 0.9951,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1209.0,
                  "y": 1204.0
              },
              {
                  "x": 1413.0,
                  "y": 1204.0
              },
              {
                  "x": 1413.0,
                  "y": 1285.0
              },
              {
                  "x": 1209.0,
                  "y": 1285.0
              }
          ]
      },
      "inferText": "매장용",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1428.0,
                  "y": 1204.0
              },
              {
                  "x": 1632.0,
                  "y": 1204.0
              },
              {
                  "x": 1632.0,
                  "y": 1285.0
              },
              {
                  "x": 1428.0,
                  "y": 1285.0
              }
          ]
      },
      "inferText": "반투명",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1652.0,
                  "y": 1209.0
              },
              {
                  "x": 1979.0,
                  "y": 1209.0
              },
              {
                  "x": 1979.0,
                  "y": 1285.0
              },
              {
                  "x": 1652.0,
                  "y": 1285.0
              }
          ]
      },
      "inferText": "타포린백(1",
      "inferConfidence": 0.9889,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2157.0,
                  "y": 1214.0
              },
              {
                  "x": 2331.0,
                  "y": 1214.0
              },
              {
                  "x": 2331.0,
                  "y": 1290.0
              },
              {
                  "x": 2157.0,
                  "y": 1290.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9998,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2412.0,
                  "y": 1214.0
              },
              {
                  "x": 2458.0,
                  "y": 1214.0
              },
              {
                  "x": 2458.0,
                  "y": 1285.0
              },
              {
                  "x": 2412.0,
                  "y": 1285.0
              }
          ]
      },
      "inferText": "1",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2566.0,
                  "y": 1212.0
              },
              {
                  "x": 2746.0,
                  "y": 1219.0
              },
              {
                  "x": 2743.0,
                  "y": 1295.0
              },
              {
                  "x": 2563.0,
                  "y": 1288.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1219.0,
                  "y": 1270.0
              },
              {
                  "x": 1511.0,
                  "y": 1277.0
              },
              {
                  "x": 1509.0,
                  "y": 1347.0
              },
              {
                  "x": 1218.0,
                  "y": 1341.0
              }
          ]
      },
      "inferText": "[1025721]",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1214.0,
                  "y": 1336.0
              },
              {
                  "x": 1795.0,
                  "y": 1336.0
              },
              {
                  "x": 1795.0,
                  "y": 1418.0
              },
              {
                  "x": 1214.0,
                  "y": 1418.0
              }
          ]
      },
      "inferText": "코인초콜릿레몬(100",
      "inferConfidence": 0.9996,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1800.0,
                  "y": 1336.0
              },
              {
                  "x": 1887.0,
                  "y": 1336.0
              },
              {
                  "x": 1887.0,
                  "y": 1423.0
              },
              {
                  "x": 1800.0,
                  "y": 1423.0
              }
          ]
      },
      "inferText": "g)",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2152.0,
                  "y": 1341.0
              },
              {
                  "x": 2331.0,
                  "y": 1341.0
              },
              {
                  "x": 2331.0,
                  "y": 1423.0
              },
              {
                  "x": 2152.0,
                  "y": 1423.0
              }
          ]
      },
      "inferText": "2,000",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2412.0,
                  "y": 1346.0
              },
              {
                  "x": 2448.0,
                  "y": 1346.0
              },
              {
                  "x": 2448.0,
                  "y": 1413.0
              },
              {
                  "x": 2412.0,
                  "y": 1413.0
              }
          ]
      },
      "inferText": "1",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2560.0,
                  "y": 1341.0
              },
              {
                  "x": 2739.0,
                  "y": 1341.0
              },
              {
                  "x": 2739.0,
                  "y": 1423.0
              },
              {
                  "x": 2560.0,
                  "y": 1423.0
              }
          ]
      },
      "inferText": "2,000",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1209.0,
                  "y": 1397.0
              },
              {
                  "x": 1581.0,
                  "y": 1397.0
              },
              {
                  "x": 1581.0,
                  "y": 1484.0
              },
              {
                  "x": 1209.0,
                  "y": 1484.0
              }
          ]
      },
      "inferText": "[926940987]",
      "inferConfidence": 0.9998,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1219.0,
                  "y": 1474.0
              },
              {
                  "x": 1795.0,
                  "y": 1474.0
              },
              {
                  "x": 1795.0,
                  "y": 1545.0
              },
              {
                  "x": 1219.0,
                  "y": 1545.0
              }
          ]
      },
      "inferText": "모델링페이스트(100",
      "inferConfidence": 0.9601,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1800.0,
                  "y": 1464.0
              },
              {
                  "x": 1892.0,
                  "y": 1464.0
              },
              {
                  "x": 1892.0,
                  "y": 1550.0
              },
              {
                  "x": 1800.0,
                  "y": 1550.0
              }
          ]
      },
      "inferText": "ml",
      "inferConfidence": 0.9965,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2157.0,
                  "y": 1479.0
              },
              {
                  "x": 2326.0,
                  "y": 1479.0
              },
              {
                  "x": 2326.0,
                  "y": 1550.0
              },
              {
                  "x": 2157.0,
                  "y": 1550.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2407.0,
                  "y": 1479.0
              },
              {
                  "x": 2453.0,
                  "y": 1479.0
              },
              {
                  "x": 2453.0,
                  "y": 1550.0
              },
              {
                  "x": 2407.0,
                  "y": 1550.0
              }
          ]
      },
      "inferText": "1",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2560.0,
                  "y": 1474.0
              },
              {
                  "x": 2739.0,
                  "y": 1474.0
              },
              {
                  "x": 2739.0,
                  "y": 1550.0
              },
              {
                  "x": 2560.0,
                  "y": 1550.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1219.0,
                  "y": 1533.0
              },
              {
                  "x": 1511.0,
                  "y": 1540.0
              },
              {
                  "x": 1509.0,
                  "y": 1607.0
              },
              {
                  "x": 1218.0,
                  "y": 1601.0
              }
          ]
      },
      "inferText": "[1046032]",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1214.0,
                  "y": 1596.0
              },
              {
                  "x": 1668.0,
                  "y": 1596.0
              },
              {
                  "x": 1668.0,
                  "y": 1678.0
              },
              {
                  "x": 1214.0,
                  "y": 1678.0
              }
          ]
      },
      "inferText": "딸기쿠키크런치",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1663.0,
                  "y": 1601.0
              },
              {
                  "x": 1765.0,
                  "y": 1601.0
              },
              {
                  "x": 1765.0,
                  "y": 1673.0
              },
              {
                  "x": 1663.0,
                  "y": 1673.0
              }
          ]
      },
      "inferText": "(20",
      "inferConfidence": 0.9986,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1770.0,
                  "y": 1596.0
              },
              {
                  "x": 1856.0,
                  "y": 1596.0
              },
              {
                  "x": 1856.0,
                  "y": 1683.0
              },
              {
                  "x": 1770.0,
                  "y": 1683.0
              }
          ]
      },
      "inferText": "g)",
      "inferConfidence": 0.9993,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2157.0,
                  "y": 1606.0
              },
              {
                  "x": 2326.0,
                  "y": 1606.0
              },
              {
                  "x": 2326.0,
                  "y": 1678.0
              },
              {
                  "x": 2157.0,
                  "y": 1678.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2407.0,
                  "y": 1601.0
              },
              {
                  "x": 2448.0,
                  "y": 1601.0
              },
              {
                  "x": 2448.0,
                  "y": 1668.0
              },
              {
                  "x": 2407.0,
                  "y": 1668.0
              }
          ]
      },
      "inferText": "1",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2565.0,
                  "y": 1606.0
              },
              {
                  "x": 2739.0,
                  "y": 1606.0
              },
              {
                  "x": 2739.0,
                  "y": 1678.0
              },
              {
                  "x": 2565.0,
                  "y": 1678.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9998,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1219.0,
                  "y": 1663.0
              },
              {
                  "x": 1571.0,
                  "y": 1663.0
              },
              {
                  "x": 1571.0,
                  "y": 1734.0
              },
              {
                  "x": 1219.0,
                  "y": 1734.0
              }
          ]
      },
      "inferText": "[926940897]",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1214.0,
                  "y": 1724.0
              },
              {
                  "x": 1765.0,
                  "y": 1724.0
              },
              {
                  "x": 1765.0,
                  "y": 1800.0
              },
              {
                  "x": 1214.0,
                  "y": 1800.0
              }
          ]
      },
      "inferText": "딸기데코파우더(20",
      "inferConfidence": 0.9962,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1770.0,
                  "y": 1724.0
              },
              {
                  "x": 1856.0,
                  "y": 1724.0
              },
              {
                  "x": 1856.0,
                  "y": 1810.0
              },
              {
                  "x": 1770.0,
                  "y": 1810.0
              }
          ]
      },
      "inferText": "g)",
      "inferConfidence": 0.9995,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2157.0,
                  "y": 1729.0
              },
              {
                  "x": 2326.0,
                  "y": 1729.0
              },
              {
                  "x": 2326.0,
                  "y": 1805.0
              },
              {
                  "x": 2157.0,
                  "y": 1805.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2407.0,
                  "y": 1734.0
              },
              {
                  "x": 2443.0,
                  "y": 1734.0
              },
              {
                  "x": 2443.0,
                  "y": 1795.0
              },
              {
                  "x": 2407.0,
                  "y": 1795.0
              }
          ]
      },
      "inferText": "1",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2560.0,
                  "y": 1729.0
              },
              {
                  "x": 2734.0,
                  "y": 1729.0
              },
              {
                  "x": 2734.0,
                  "y": 1805.0
              },
              {
                  "x": 2560.0,
                  "y": 1805.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1209.0,
                  "y": 1785.0
              },
              {
                  "x": 1581.0,
                  "y": 1785.0
              },
              {
                  "x": 1581.0,
                  "y": 1872.0
              },
              {
                  "x": 1209.0,
                  "y": 1872.0
              }
          ]
      },
      "inferText": "[926940902]",
      "inferConfidence": 0.9997,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1219.0,
                  "y": 1853.0
              },
              {
                  "x": 1664.0,
                  "y": 1862.0
              },
              {
                  "x": 1662.0,
                  "y": 1936.0
              },
              {
                  "x": 1218.0,
                  "y": 1928.0
              }
          ]
      },
      "inferText": "캔버스스케치북",
      "inferConfidence": 0.9998,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1663.0,
                  "y": 1856.0
              },
              {
                  "x": 1912.0,
                  "y": 1856.0
              },
              {
                  "x": 1912.0,
                  "y": 1928.0
              },
              {
                  "x": 1663.0,
                  "y": 1928.0
              }
          ]
      },
      "inferText": "(A4/10매",
      "inferConfidence": 0.9989,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2152.0,
                  "y": 1862.0
              },
              {
                  "x": 2326.0,
                  "y": 1862.0
              },
              {
                  "x": 2326.0,
                  "y": 1933.0
              },
              {
                  "x": 2152.0,
                  "y": 1933.0
              }
          ]
      },
      "inferText": "2,000",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2407.0,
                  "y": 1862.0
              },
              {
                  "x": 2443.0,
                  "y": 1862.0
              },
              {
                  "x": 2443.0,
                  "y": 1923.0
              },
              {
                  "x": 2407.0,
                  "y": 1923.0
              }
          ]
      },
      "inferText": "1",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2555.0,
                  "y": 1856.0
              },
              {
                  "x": 2734.0,
                  "y": 1856.0
              },
              {
                  "x": 2734.0,
                  "y": 1933.0
              },
              {
                  "x": 2555.0,
                  "y": 1933.0
              }
          ]
      },
      "inferText": "2,000",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1209.0,
                  "y": 1912.0
              },
              {
                  "x": 1520.0,
                  "y": 1912.0
              },
              {
                  "x": 1520.0,
                  "y": 1999.0
              },
              {
                  "x": 1209.0,
                  "y": 1999.0
              }
          ]
      },
      "inferText": "[1040249]",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1214.0,
                  "y": 1978.0
              },
              {
                  "x": 1602.0,
                  "y": 1984.0
              },
              {
                  "x": 1601.0,
                  "y": 2062.0
              },
              {
                  "x": 1213.0,
                  "y": 2056.0
              }
          ]
      },
      "inferText": "미술용둥근붓",
      "inferConfidence": 0.989,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1617.0,
                  "y": 1984.0
              },
              {
                  "x": 1785.0,
                  "y": 1984.0
              },
              {
                  "x": 1785.0,
                  "y": 2060.0
              },
              {
                  "x": 1617.0,
                  "y": 2060.0
              }
          ]
      },
      "inferText": "6개입",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2152.0,
                  "y": 1989.0
              },
              {
                  "x": 2326.0,
                  "y": 1989.0
              },
              {
                  "x": 2326.0,
                  "y": 2060.0
              },
              {
                  "x": 2152.0,
                  "y": 2060.0
              }
          ]
      },
      "inferText": "2,000",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2407.0,
                  "y": 1989.0
              },
              {
                  "x": 2443.0,
                  "y": 1989.0
              },
              {
                  "x": 2443.0,
                  "y": 2050.0
              },
              {
                  "x": 2407.0,
                  "y": 2050.0
              }
          ]
      },
      "inferText": "1",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2555.0,
                  "y": 1989.0
              },
              {
                  "x": 2734.0,
                  "y": 1989.0
              },
              {
                  "x": 2734.0,
                  "y": 2060.0
              },
              {
                  "x": 2555.0,
                  "y": 2060.0
              }
          ]
      },
      "inferText": "2,000",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1209.0,
                  "y": 2040.0
              },
              {
                  "x": 1454.0,
                  "y": 2040.0
              },
              {
                  "x": 1454.0,
                  "y": 2127.0
              },
              {
                  "x": 1209.0,
                  "y": 2127.0
              }
          ]
      },
      "inferText": "[85626]",
      "inferConfidence": 0.9996,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1219.0,
                  "y": 2116.0
              },
              {
                  "x": 1851.0,
                  "y": 2116.0
              },
              {
                  "x": 1851.0,
                  "y": 2188.0
              },
              {
                  "x": 1219.0,
                  "y": 2188.0
              }
          ]
      },
      "inferText": "비접착식선물봉투25매",
      "inferConfidence": 0.9974,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1836.0,
                  "y": 2106.0
              },
              {
                  "x": 1953.0,
                  "y": 2106.0
              },
              {
                  "x": 1953.0,
                  "y": 2193.0
              },
              {
                  "x": 1836.0,
                  "y": 2193.0
              }
          ]
      },
      "inferText": "(11",
      "inferConfidence": 0.9996,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2157.0,
                  "y": 2116.0
              },
              {
                  "x": 2326.0,
                  "y": 2116.0
              },
              {
                  "x": 2326.0,
                  "y": 2188.0
              },
              {
                  "x": 2157.0,
                  "y": 2188.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9998,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2407.0,
                  "y": 2116.0
              },
              {
                  "x": 2443.0,
                  "y": 2116.0
              },
              {
                  "x": 2443.0,
                  "y": 2178.0
              },
              {
                  "x": 2407.0,
                  "y": 2178.0
              }
          ]
      },
      "inferText": "1",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2560.0,
                  "y": 2116.0
              },
              {
                  "x": 2734.0,
                  "y": 2116.0
              },
              {
                  "x": 2734.0,
                  "y": 2188.0
              },
              {
                  "x": 2560.0,
                  "y": 2188.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1209.0,
                  "y": 2168.0
              },
              {
                  "x": 1520.0,
                  "y": 2168.0
              },
              {
                  "x": 1520.0,
                  "y": 2254.0
              },
              {
                  "x": 1209.0,
                  "y": 2254.0
              }
          ]
      },
      "inferText": "[1007078]",
      "inferConfidence": 0.999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1219.0,
                  "y": 2239.0
              },
              {
                  "x": 1785.0,
                  "y": 2239.0
              },
              {
                  "x": 1785.0,
                  "y": 2315.0
              },
              {
                  "x": 1219.0,
                  "y": 2315.0
              }
          ]
      },
      "inferText": "다기능고급주방가위",
      "inferConfidence": 0.999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2152.0,
                  "y": 2244.0
              },
              {
                  "x": 2320.0,
                  "y": 2244.0
              },
              {
                  "x": 2320.0,
                  "y": 2315.0
              },
              {
                  "x": 2152.0,
                  "y": 2315.0
              }
          ]
      },
      "inferText": "2,000",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2402.0,
                  "y": 2244.0
              },
              {
                  "x": 2448.0,
                  "y": 2244.0
              },
              {
                  "x": 2448.0,
                  "y": 2305.0
              },
              {
                  "x": 2402.0,
                  "y": 2305.0
              }
          ]
      },
      "inferText": "1",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2555.0,
                  "y": 2244.0
              },
              {
                  "x": 2734.0,
                  "y": 2244.0
              },
              {
                  "x": 2734.0,
                  "y": 2315.0
              },
              {
                  "x": 2555.0,
                  "y": 2315.0
              }
          ]
      },
      "inferText": "2,000",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1209.0,
                  "y": 2295.0
              },
              {
                  "x": 1464.0,
                  "y": 2295.0
              },
              {
                  "x": 1464.0,
                  "y": 2382.0
              },
              {
                  "x": 1209.0,
                  "y": 2382.0
              }
          ]
      },
      "inferText": "[32638]",
      "inferConfidence": 0.9982,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1214.0,
                  "y": 2361.0
              },
              {
                  "x": 1724.0,
                  "y": 2361.0
              },
              {
                  "x": 1724.0,
                  "y": 2443.0
              },
              {
                  "x": 1214.0,
                  "y": 2443.0
              }
          ]
      },
      "inferText": "손잡이틈새청소솔",
      "inferConfidence": 0.8932,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2152.0,
                  "y": 2366.0
              },
              {
                  "x": 2320.0,
                  "y": 2366.0
              },
              {
                  "x": 2320.0,
                  "y": 2438.0
              },
              {
                  "x": 2152.0,
                  "y": 2438.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9984,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2402.0,
                  "y": 2372.0
              },
              {
                  "x": 2448.0,
                  "y": 2372.0
              },
              {
                  "x": 2448.0,
                  "y": 2433.0
              },
              {
                  "x": 2402.0,
                  "y": 2433.0
              }
          ]
      },
      "inferText": "1",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2560.0,
                  "y": 2372.0
              },
              {
                  "x": 2734.0,
                  "y": 2372.0
              },
              {
                  "x": 2734.0,
                  "y": 2443.0
              },
              {
                  "x": 2560.0,
                  "y": 2443.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1209.0,
                  "y": 2417.0
              },
              {
                  "x": 1515.0,
                  "y": 2417.0
              },
              {
                  "x": 1515.0,
                  "y": 2504.0
              },
              {
                  "x": 1209.0,
                  "y": 2504.0
              }
          ]
      },
      "inferText": "[1039205]",
      "inferConfidence": 0.9997,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1219.0,
                  "y": 2489.0
              },
              {
                  "x": 1969.0,
                  "y": 2489.0
              },
              {
                  "x": 1969.0,
                  "y": 2565.0
              },
              {
                  "x": 1219.0,
                  "y": 2565.0
              }
          ]
      },
      "inferText": "고급스텐원형손잡이거품기",
      "inferConfidence": 0.9995,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2137.0,
                  "y": 2489.0
              },
              {
                  "x": 2331.0,
                  "y": 2489.0
              },
              {
                  "x": 2331.0,
                  "y": 2576.0
              },
              {
                  "x": 2137.0,
                  "y": 2576.0
              }
          ]
      },
      "inferText": "2,000",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2402.0,
                  "y": 2499.0
              },
              {
                  "x": 2448.0,
                  "y": 2499.0
              },
              {
                  "x": 2448.0,
                  "y": 2565.0
              },
              {
                  "x": 2402.0,
                  "y": 2565.0
              }
          ]
      },
      "inferText": "1",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2555.0,
                  "y": 2499.0
              },
              {
                  "x": 2734.0,
                  "y": 2499.0
              },
              {
                  "x": 2734.0,
                  "y": 2570.0
              },
              {
                  "x": 2555.0,
                  "y": 2570.0
              }
          ]
      },
      "inferText": "2,000",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1209.0,
                  "y": 2545.0
              },
              {
                  "x": 1448.0,
                  "y": 2545.0
              },
              {
                  "x": 1448.0,
                  "y": 2632.0
              },
              {
                  "x": 1209.0,
                  "y": 2632.0
              }
          ]
      },
      "inferText": "[34344]",
      "inferConfidence": 0.9998,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1214.0,
                  "y": 2611.0
              },
              {
                  "x": 1969.0,
                  "y": 2616.0
              },
              {
                  "x": 1968.0,
                  "y": 2696.0
              },
              {
                  "x": 1213.0,
                  "y": 2691.0
              }
          ]
      },
      "inferText": "픽사_토이스토리_안전지갑",
      "inferConfidence": 0.9971,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2152.0,
                  "y": 2621.0
              },
              {
                  "x": 2320.0,
                  "y": 2621.0
              },
              {
                  "x": 2320.0,
                  "y": 2693.0
              },
              {
                  "x": 2152.0,
                  "y": 2693.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2402.0,
                  "y": 2626.0
              },
              {
                  "x": 2438.0,
                  "y": 2626.0
              },
              {
                  "x": 2438.0,
                  "y": 2688.0
              },
              {
                  "x": 2402.0,
                  "y": 2688.0
              }
          ]
      },
      "inferText": "1",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2560.0,
                  "y": 2626.0
              },
              {
                  "x": 2734.0,
                  "y": 2626.0
              },
              {
                  "x": 2734.0,
                  "y": 2698.0
              },
              {
                  "x": 2560.0,
                  "y": 2698.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1209.0,
                  "y": 2672.0
              },
              {
                  "x": 1515.0,
                  "y": 2672.0
              },
              {
                  "x": 1515.0,
                  "y": 2759.0
              },
              {
                  "x": 1209.0,
                  "y": 2759.0
              }
          ]
      },
      "inferText": "[1025851]",
      "inferConfidence": 0.9998,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1209.0,
                  "y": 2731.0
              },
              {
                  "x": 1659.0,
                  "y": 2740.0
              },
              {
                  "x": 1657.0,
                  "y": 2822.0
              },
              {
                  "x": 1207.0,
                  "y": 2812.0
              }
          ]
      },
      "inferText": "LS틴인틴비스켓",
      "inferConfidence": 0.9954,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1652.0,
                  "y": 2739.0
              },
              {
                  "x": 1760.0,
                  "y": 2739.0
              },
              {
                  "x": 1760.0,
                  "y": 2815.0
              },
              {
                  "x": 1652.0,
                  "y": 2815.0
              }
          ]
      },
      "inferText": "(89",
      "inferConfidence": 0.9995,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1765.0,
                  "y": 2744.0
              },
              {
                  "x": 1851.0,
                  "y": 2744.0
              },
              {
                  "x": 1851.0,
                  "y": 2825.0
              },
              {
                  "x": 1765.0,
                  "y": 2825.0
              }
          ]
      },
      "inferText": "g)",
      "inferConfidence": 0.9998,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2152.0,
                  "y": 2749.0
              },
              {
                  "x": 2320.0,
                  "y": 2749.0
              },
              {
                  "x": 2320.0,
                  "y": 2820.0
              },
              {
                  "x": 2152.0,
                  "y": 2820.0
              }
          ]
      },
      "inferText": "1,500",
      "inferConfidence": 0.9998,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2402.0,
                  "y": 2749.0
              },
              {
                  "x": 2438.0,
                  "y": 2749.0
              },
              {
                  "x": 2438.0,
                  "y": 2815.0
              },
              {
                  "x": 2402.0,
                  "y": 2815.0
              }
          ]
      },
      "inferText": "1",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2560.0,
                  "y": 2754.0
              },
              {
                  "x": 2728.0,
                  "y": 2754.0
              },
              {
                  "x": 2728.0,
                  "y": 2825.0
              },
              {
                  "x": 2560.0,
                  "y": 2825.0
              }
          ]
      },
      "inferText": "1,500",
      "inferConfidence": 0.9998,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1219.0,
                  "y": 2804.0
              },
              {
                  "x": 1572.0,
                  "y": 2810.0
              },
              {
                  "x": 1570.0,
                  "y": 2878.0
              },
              {
                  "x": 1218.0,
                  "y": 2871.0
              }
          ]
      },
      "inferText": "[924797558]",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1214.0,
                  "y": 2866.0
              },
              {
                  "x": 1479.0,
                  "y": 2866.0
              },
              {
                  "x": 1479.0,
                  "y": 2943.0
              },
              {
                  "x": 1214.0,
                  "y": 2943.0
              }
          ]
      },
      "inferText": "벨벳리본",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1489.0,
                  "y": 2866.0
              },
              {
                  "x": 1586.0,
                  "y": 2866.0
              },
              {
                  "x": 1586.0,
                  "y": 2948.0
              },
              {
                  "x": 1489.0,
                  "y": 2948.0
              }
          ]
      },
      "inferText": "(2",
      "inferConfidence": 0.7969,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1586.0,
                  "y": 2871.0
              },
              {
                  "x": 1790.0,
                  "y": 2871.0
              },
              {
                  "x": 1790.0,
                  "y": 2943.0
              },
              {
                  "x": 1586.0,
                  "y": 2943.0
              }
          ]
      },
      "inferText": "cm) (3",
      "inferConfidence": 0.9483,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2152.0,
                  "y": 2876.0
              },
              {
                  "x": 2320.0,
                  "y": 2876.0
              },
              {
                  "x": 2320.0,
                  "y": 2948.0
              },
              {
                  "x": 2152.0,
                  "y": 2948.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2402.0,
                  "y": 2876.0
              },
              {
                  "x": 2438.0,
                  "y": 2876.0
              },
              {
                  "x": 2438.0,
                  "y": 2943.0
              },
              {
                  "x": 2402.0,
                  "y": 2943.0
              }
          ]
      },
      "inferText": "1",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2560.0,
                  "y": 2876.0
              },
              {
                  "x": 2728.0,
                  "y": 2876.0
              },
              {
                  "x": 2728.0,
                  "y": 2953.0
              },
              {
                  "x": 2560.0,
                  "y": 2953.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9997,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1224.0,
                  "y": 2932.0
              },
              {
                  "x": 1504.0,
                  "y": 2932.0
              },
              {
                  "x": 1504.0,
                  "y": 3004.0
              },
              {
                  "x": 1224.0,
                  "y": 3004.0
              }
          ]
      },
      "inferText": "[1042633]",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1219.0,
                  "y": 2999.0
              },
              {
                  "x": 1372.0,
                  "y": 2999.0
              },
              {
                  "x": 1372.0,
                  "y": 3070.0
              },
              {
                  "x": 1219.0,
                  "y": 3070.0
              }
          ]
      },
      "inferText": "픽사_",
      "inferConfidence": 0.9941,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1372.0,
                  "y": 2994.0
              },
              {
                  "x": 2009.0,
                  "y": 2994.0
              },
              {
                  "x": 2009.0,
                  "y": 3075.0
              },
              {
                  "x": 1372.0,
                  "y": 3075.0
              }
          ]
      },
      "inferText": "랏소_홀로그램스티커(",
      "inferConfidence": 0.9796,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2152.0,
                  "y": 3004.0
              },
              {
                  "x": 2320.0,
                  "y": 3004.0
              },
              {
                  "x": 2320.0,
                  "y": 3075.0
              },
              {
                  "x": 2152.0,
                  "y": 3075.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2402.0,
                  "y": 3004.0
              },
              {
                  "x": 2438.0,
                  "y": 3004.0
              },
              {
                  "x": 2438.0,
                  "y": 3065.0
              },
              {
                  "x": 2402.0,
                  "y": 3065.0
              }
          ]
      },
      "inferText": "1",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2555.0,
                  "y": 3004.0
              },
              {
                  "x": 2728.0,
                  "y": 3004.0
              },
              {
                  "x": 2728.0,
                  "y": 3080.0
              },
              {
                  "x": 2555.0,
                  "y": 3080.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1209.0,
                  "y": 3050.0
              },
              {
                  "x": 1515.0,
                  "y": 3050.0
              },
              {
                  "x": 1515.0,
                  "y": 3136.0
              },
              {
                  "x": 1209.0,
                  "y": 3136.0
              }
          ]
      },
      "inferText": "[1048959]",
      "inferConfidence": 0.9997,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1214.0,
                  "y": 3116.0
              },
              {
                  "x": 1367.0,
                  "y": 3116.0
              },
              {
                  "x": 1367.0,
                  "y": 3193.0
              },
              {
                  "x": 1214.0,
                  "y": 3193.0
              }
          ]
      },
      "inferText": "픽사_",
      "inferConfidence": 0.9871,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1367.0,
                  "y": 3121.0
              },
              {
                  "x": 1999.0,
                  "y": 3121.0
              },
              {
                  "x": 1999.0,
                  "y": 3198.0
              },
              {
                  "x": 1367.0,
                  "y": 3198.0
              }
          ]
      },
      "inferText": "토이스토리_랏소_헤어",
      "inferConfidence": 0.9997,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2142.0,
                  "y": 3121.0
              },
              {
                  "x": 2331.0,
                  "y": 3121.0
              },
              {
                  "x": 2331.0,
                  "y": 3208.0
              },
              {
                  "x": 2142.0,
                  "y": 3208.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2397.0,
                  "y": 3131.0
              },
              {
                  "x": 2443.0,
                  "y": 3131.0
              },
              {
                  "x": 2443.0,
                  "y": 3198.0
              },
              {
                  "x": 2397.0,
                  "y": 3198.0
              }
          ]
      },
      "inferText": "2",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2550.0,
                  "y": 3131.0
              },
              {
                  "x": 2728.0,
                  "y": 3131.0
              },
              {
                  "x": 2728.0,
                  "y": 3208.0
              },
              {
                  "x": 2550.0,
                  "y": 3208.0
              }
          ]
      },
      "inferText": "2,000",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1204.0,
                  "y": 3177.0
              },
              {
                  "x": 1510.0,
                  "y": 3177.0
              },
              {
                  "x": 1510.0,
                  "y": 3264.0
              },
              {
                  "x": 1204.0,
                  "y": 3264.0
              }
          ]
      },
      "inferText": "[1049205]",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1214.0,
                  "y": 3249.0
              },
              {
                  "x": 1836.0,
                  "y": 3249.0
              },
              {
                  "x": 1836.0,
                  "y": 3325.0
              },
              {
                  "x": 1214.0,
                  "y": 3325.0
              }
          ]
      },
      "inferText": "픽사_랏소_컬러쇼핑백",
      "inferConfidence": 0.9759,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2147.0,
                  "y": 3254.0
              },
              {
                  "x": 2320.0,
                  "y": 3254.0
              },
              {
                  "x": 2320.0,
                  "y": 3325.0
              },
              {
                  "x": 2147.0,
                  "y": 3325.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2397.0,
                  "y": 3254.0
              },
              {
                  "x": 2443.0,
                  "y": 3254.0
              },
              {
                  "x": 2443.0,
                  "y": 3325.0
              },
              {
                  "x": 2397.0,
                  "y": 3325.0
              }
          ]
      },
      "inferText": "3",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2545.0,
                  "y": 3254.0
              },
              {
                  "x": 2728.0,
                  "y": 3254.0
              },
              {
                  "x": 2728.0,
                  "y": 3330.0
              },
              {
                  "x": 2545.0,
                  "y": 3330.0
              }
          ]
      },
      "inferText": "3,000",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1204.0,
                  "y": 3305.0
              },
              {
                  "x": 1510.0,
                  "y": 3305.0
              },
              {
                  "x": 1510.0,
                  "y": 3392.0
              },
              {
                  "x": 1204.0,
                  "y": 3392.0
              }
          ]
      },
      "inferText": "[1048961]",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1209.0,
                  "y": 3371.0
              },
              {
                  "x": 1591.0,
                  "y": 3371.0
              },
              {
                  "x": 1591.0,
                  "y": 3448.0
              },
              {
                  "x": 1209.0,
                  "y": 3448.0
              }
          ]
      },
      "inferText": "클레이스티커",
      "inferConfidence": 0.9998,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1586.0,
                  "y": 3376.0
              },
              {
                  "x": 1846.0,
                  "y": 3376.0
              },
              {
                  "x": 1846.0,
                  "y": 3448.0
              },
              {
                  "x": 1586.0,
                  "y": 3448.0
              }
          ]
      },
      "inferText": "(6매입)A",
      "inferConfidence": 0.9606,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2147.0,
                  "y": 3381.0
              },
              {
                  "x": 2315.0,
                  "y": 3381.0
              },
              {
                  "x": 2315.0,
                  "y": 3458.0
              },
              {
                  "x": 2147.0,
                  "y": 3458.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2397.0,
                  "y": 3386.0
              },
              {
                  "x": 2443.0,
                  "y": 3386.0
              },
              {
                  "x": 2443.0,
                  "y": 3453.0
              },
              {
                  "x": 2397.0,
                  "y": 3453.0
              }
          ]
      },
      "inferText": "1",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2555.0,
                  "y": 3386.0
              },
              {
                  "x": 2728.0,
                  "y": 3386.0
              },
              {
                  "x": 2728.0,
                  "y": 3463.0
              },
              {
                  "x": 2555.0,
                  "y": 3463.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1204.0,
                  "y": 3432.0
              },
              {
                  "x": 1504.0,
                  "y": 3432.0
              },
              {
                  "x": 1504.0,
                  "y": 3519.0
              },
              {
                  "x": 1204.0,
                  "y": 3519.0
              }
          ]
      },
      "inferText": "[1046426]",
      "inferConfidence": 0.9998,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1204.0,
                  "y": 3499.0
              },
              {
                  "x": 1469.0,
                  "y": 3499.0
              },
              {
                  "x": 1469.0,
                  "y": 3575.0
              },
              {
                  "x": 1204.0,
                  "y": 3575.0
              }
          ]
      },
      "inferText": "크라프트",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1484.0,
                  "y": 3499.0
              },
              {
                  "x": 1688.0,
                  "y": 3499.0
              },
              {
                  "x": 1688.0,
                  "y": 3580.0
              },
              {
                  "x": 1484.0,
                  "y": 3580.0
              }
          ]
      },
      "inferText": "포장지",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1678.0,
                  "y": 3504.0
              },
              {
                  "x": 1877.0,
                  "y": 3504.0
              },
              {
                  "x": 1877.0,
                  "y": 3575.0
              },
              {
                  "x": 1678.0,
                  "y": 3575.0
              }
          ]
      },
      "inferText": "(70*15",
      "inferConfidence": 0.999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2147.0,
                  "y": 3509.0
              },
              {
                  "x": 2315.0,
                  "y": 3509.0
              },
              {
                  "x": 2315.0,
                  "y": 3585.0
              },
              {
                  "x": 2147.0,
                  "y": 3585.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2397.0,
                  "y": 3514.0
              },
              {
                  "x": 2438.0,
                  "y": 3514.0
              },
              {
                  "x": 2438.0,
                  "y": 3575.0
              },
              {
                  "x": 2397.0,
                  "y": 3575.0
              }
          ]
      },
      "inferText": "1",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2560.0,
                  "y": 3519.0
              },
              {
                  "x": 2734.0,
                  "y": 3519.0
              },
              {
                  "x": 2734.0,
                  "y": 3590.0
              },
              {
                  "x": 2560.0,
                  "y": 3590.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9997,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1198.0,
                  "y": 3560.0
              },
              {
                  "x": 1504.0,
                  "y": 3560.0
              },
              {
                  "x": 1504.0,
                  "y": 3646.0
              },
              {
                  "x": 1198.0,
                  "y": 3646.0
              }
          ]
      },
      "inferText": "[1026708]",
      "inferConfidence": 0.9997,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1204.0,
                  "y": 3626.0
              },
              {
                  "x": 1841.0,
                  "y": 3626.0
              },
              {
                  "x": 1841.0,
                  "y": 3708.0
              },
              {
                  "x": 1204.0,
                  "y": 3708.0
              }
          ]
      },
      "inferText": "믹싱메이크업스파츌라",
      "inferConfidence": 0.9904,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2147.0,
                  "y": 3635.0
              },
              {
                  "x": 2318.0,
                  "y": 3642.0
              },
              {
                  "x": 2315.0,
                  "y": 3714.0
              },
              {
                  "x": 2145.0,
                  "y": 3708.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9996,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2397.0,
                  "y": 3641.0
              },
              {
                  "x": 2443.0,
                  "y": 3641.0
              },
              {
                  "x": 2443.0,
                  "y": 3708.0
              },
              {
                  "x": 2397.0,
                  "y": 3708.0
              }
          ]
      },
      "inferText": "1",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2555.0,
                  "y": 3646.0
              },
              {
                  "x": 2734.0,
                  "y": 3646.0
              },
              {
                  "x": 2734.0,
                  "y": 3723.0
              },
              {
                  "x": 2555.0,
                  "y": 3723.0
              }
          ]
      },
      "inferText": "1,000",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1204.0,
                  "y": 3697.0
              },
              {
                  "x": 1489.0,
                  "y": 3697.0
              },
              {
                  "x": 1489.0,
                  "y": 3769.0
              },
              {
                  "x": 1204.0,
                  "y": 3769.0
              }
          ]
      },
      "inferText": "[1041897]",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1571.0,
                  "y": 3759.0
              },
              {
                  "x": 1708.0,
                  "y": 3759.0
              },
              {
                  "x": 1708.0,
                  "y": 3840.0
              },
              {
                  "x": 1571.0,
                  "y": 3840.0
              }
          ]
      },
      "inferText": "과세",
      "inferConfidence": 0.9976,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1765.0,
                  "y": 3759.0
              },
              {
                  "x": 1897.0,
                  "y": 3759.0
              },
              {
                  "x": 1897.0,
                  "y": 3835.0
              },
              {
                  "x": 1765.0,
                  "y": 3835.0
              }
          ]
      },
      "inferText": "합계",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2519.0,
                  "y": 3774.0
              },
              {
                  "x": 2734.0,
                  "y": 3774.0
              },
              {
                  "x": 2734.0,
                  "y": 3850.0
              },
              {
                  "x": 2519.0,
                  "y": 3850.0
              }
          ]
      },
      "inferText": "25,907",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1566.0,
                  "y": 3815.0
              },
              {
                  "x": 1658.0,
                  "y": 3815.0
              },
              {
                  "x": 1658.0,
                  "y": 3907.0
              },
              {
                  "x": 1566.0,
                  "y": 3907.0
              }
          ]
      },
      "inferText": "부",
      "inferConfidence": 0.9998,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1698.0,
                  "y": 3825.0
              },
              {
                  "x": 1780.0,
                  "y": 3825.0
              },
              {
                  "x": 1780.0,
                  "y": 3902.0
              },
              {
                  "x": 1698.0,
                  "y": 3902.0
              }
          ]
      },
      "inferText": "가",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1821.0,
                  "y": 3825.0
              },
              {
                  "x": 1897.0,
                  "y": 3825.0
              },
              {
                  "x": 1897.0,
                  "y": 3902.0
              },
              {
                  "x": 1821.0,
                  "y": 3902.0
              }
          ]
      },
      "inferText": "세",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2550.0,
                  "y": 3845.0
              },
              {
                  "x": 2734.0,
                  "y": 3845.0
              },
              {
                  "x": 2734.0,
                  "y": 3917.0
              },
              {
                  "x": 2550.0,
                  "y": 3917.0
              }
          ]
      },
      "inferText": "2,593",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1571.0,
                  "y": 3886.0
              },
              {
                  "x": 1708.0,
                  "y": 3886.0
              },
              {
                  "x": 1708.0,
                  "y": 3968.0
              },
              {
                  "x": 1571.0,
                  "y": 3968.0
              }
          ]
      },
      "inferText": "판매",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1765.0,
                  "y": 3886.0
              },
              {
                  "x": 1897.0,
                  "y": 3886.0
              },
              {
                  "x": 1897.0,
                  "y": 3968.0
              },
              {
                  "x": 1765.0,
                  "y": 3968.0
              }
          ]
      },
      "inferText": "합계",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2520.0,
                  "y": 3904.0
              },
              {
                  "x": 2736.0,
                  "y": 3912.0
              },
              {
                  "x": 2733.0,
                  "y": 3986.0
              },
              {
                  "x": 2517.0,
                  "y": 3978.0
              }
          ]
      },
      "inferText": "28,500",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1188.0,
                  "y": 4019.0
              },
              {
                  "x": 1459.0,
                  "y": 4019.0
              },
              {
                  "x": 1459.0,
                  "y": 4100.0
              },
              {
                  "x": 1188.0,
                  "y": 4100.0
              }
          ]
      },
      "inferText": "현금카드",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2515.0,
                  "y": 4027.0
              },
              {
                  "x": 2736.0,
                  "y": 4036.0
              },
              {
                  "x": 2733.0,
                  "y": 4120.0
              },
              {
                  "x": 2512.0,
                  "y": 4112.0
              }
          ]
      },
      "inferText": "28,500",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1188.0,
                  "y": 4151.0
              },
              {
                  "x": 1448.0,
                  "y": 4151.0
              },
              {
                  "x": 1448.0,
                  "y": 4228.0
              },
              {
                  "x": 1188.0,
                  "y": 4228.0
              }
          ]
      },
      "inferText": "국민은행",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2204.0,
                  "y": 4155.0
              },
              {
                  "x": 2731.0,
                  "y": 4176.0
              },
              {
                  "x": 2728.0,
                  "y": 4249.0
              },
              {
                  "x": 2201.0,
                  "y": 4228.0
              }
          ]
      },
      "inferText": "670701-04-32****",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1188.0,
                  "y": 4218.0
              },
              {
                  "x": 1459.0,
                  "y": 4218.0
              },
              {
                  "x": 1459.0,
                  "y": 4299.0
              },
              {
                  "x": 1188.0,
                  "y": 4299.0
              }
          ]
      },
      "inferText": "승인번호",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1474.0,
                  "y": 4218.0
              },
              {
                  "x": 1831.0,
                  "y": 4218.0
              },
              {
                  "x": 1831.0,
                  "y": 4294.0
              },
              {
                  "x": 1474.0,
                  "y": 4294.0
              }
          ]
      },
      "inferText": "00236971(0)",
      "inferConfidence": 0.9929,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2234.0,
                  "y": 4221.0
              },
              {
                  "x": 2501.0,
                  "y": 4229.0
              },
              {
                  "x": 2498.0,
                  "y": 4313.0
              },
              {
                  "x": 2232.0,
                  "y": 4306.0
              }
          ]
      },
      "inferText": "승인금액",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2520.0,
                  "y": 4237.0
              },
              {
                  "x": 2735.0,
                  "y": 4244.0
              },
              {
                  "x": 2733.0,
                  "y": 4321.0
              },
              {
                  "x": 2518.0,
                  "y": 4314.0
              }
          ]
      },
      "inferText": "28,500",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1183.0,
                  "y": 4345.0
              },
              {
                  "x": 1581.0,
                  "y": 4345.0
              },
              {
                  "x": 1581.0,
                  "y": 4427.0
              },
              {
                  "x": 1183.0,
                  "y": 4427.0
              }
          ]
      },
      "inferText": "다이소멤버십",
      "inferConfidence": 0.9997,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2392.0,
                  "y": 4363.0
              },
              {
                  "x": 2735.0,
                  "y": 4370.0
              },
              {
                  "x": 2733.0,
                  "y": 4448.0
              },
              {
                  "x": 2390.0,
                  "y": 4440.0
              }
          ]
      },
      "inferText": "2000234564",
      "inferConfidence": 0.9998,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1178.0,
                  "y": 4412.0
              },
              {
                  "x": 1464.0,
                  "y": 4412.0
              },
              {
                  "x": 1464.0,
                  "y": 4498.0
              },
              {
                  "x": 1178.0,
                  "y": 4498.0
              }
          ]
      },
      "inferText": "적립대상",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1474.0,
                  "y": 4412.0
              },
              {
                  "x": 1765.0,
                  "y": 4412.0
              },
              {
                  "x": 1765.0,
                  "y": 4493.0
              },
              {
                  "x": 1474.0,
                  "y": 4493.0
              }
          ]
      },
      "inferText": "결제금액:",
      "inferConfidence": 0.9995,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1785.0,
                  "y": 4412.0
              },
              {
                  "x": 1999.0,
                  "y": 4412.0
              },
              {
                  "x": 1999.0,
                  "y": 4493.0
              },
              {
                  "x": 1785.0,
                  "y": 4493.0
              }
          ]
      },
      "inferText": "28,500",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1188.0,
                  "y": 4483.0
              },
              {
                  "x": 1545.0,
                  "y": 4483.0
              },
              {
                  "x": 1545.0,
                  "y": 4559.0
              },
              {
                  "x": 1188.0,
                  "y": 4559.0
              }
          ]
      },
      "inferText": "적립포인트:",
      "inferConfidence": 0.9994,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1556.0,
                  "y": 4478.0
              },
              {
                  "x": 1658.0,
                  "y": 4478.0
              },
              {
                  "x": 1658.0,
                  "y": 4564.0
              },
              {
                  "x": 1556.0,
                  "y": 4564.0
              }
          ]
      },
      "inferText": "28",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2168.0,
                  "y": 4481.0
              },
              {
                  "x": 2532.0,
                  "y": 4496.0
              },
              {
                  "x": 2529.0,
                  "y": 4584.0
              },
              {
                  "x": 2164.0,
                  "y": 4569.0
              }
          ]
      },
      "inferText": "가용포인트:",
      "inferConfidence": 0.9994,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2550.0,
                  "y": 4503.0
              },
              {
                  "x": 2734.0,
                  "y": 4503.0
              },
              {
                  "x": 2734.0,
                  "y": 4585.0
              },
              {
                  "x": 2550.0,
                  "y": 4585.0
              }
          ]
      },
      "inferText": "1,419",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1178.0,
                  "y": 4605.0
              },
              {
                  "x": 1448.0,
                  "y": 4605.0
              },
              {
                  "x": 1448.0,
                  "y": 4687.0
              },
              {
                  "x": 1178.0,
                  "y": 4687.0
              }
          ]
      },
      "inferText": "현금카드",
      "inferConfidence": 0.9998,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1469.0,
                  "y": 4610.0
              },
              {
                  "x": 1678.0,
                  "y": 4610.0
              },
              {
                  "x": 1678.0,
                  "y": 4687.0
              },
              {
                  "x": 1469.0,
                  "y": 4687.0
              }
          ]
      },
      "inferText": "결제로",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1678.0,
                  "y": 4605.0
              },
              {
                  "x": 1851.0,
                  "y": 4605.0
              },
              {
                  "x": 1851.0,
                  "y": 4692.0
              },
              {
                  "x": 1678.0,
                  "y": 4692.0
              }
          ]
      },
      "inferText": "0.5%",
      "inferConfidence": 0.9971,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1851.0,
                  "y": 4610.0
              },
              {
                  "x": 1989.0,
                  "y": 4610.0
              },
              {
                  "x": 1989.0,
                  "y": 4692.0
              },
              {
                  "x": 1851.0,
                  "y": 4692.0
              }
          ]
      },
      "inferText": "할인",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2009.0,
                  "y": 4616.0
              },
              {
                  "x": 2218.0,
                  "y": 4616.0
              },
              {
                  "x": 2218.0,
                  "y": 4692.0
              },
              {
                  "x": 2009.0,
                  "y": 4692.0
              }
          ]
      },
      "inferText": "혜택을",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2235.0,
                  "y": 4615.0
              },
              {
                  "x": 2651.0,
                  "y": 4637.0
              },
              {
                  "x": 2646.0,
                  "y": 4722.0
              },
              {
                  "x": 2230.0,
                  "y": 4700.0
              }
          ]
      },
      "inferText": "받으셨습니다.",
      "inferConfidence": 0.999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1183.0,
                  "y": 4677.0
              },
              {
                  "x": 1321.0,
                  "y": 4677.0
              },
              {
                  "x": 1321.0,
                  "y": 4753.0
              },
              {
                  "x": 1183.0,
                  "y": 4753.0
              }
          ]
      },
      "inferText": "결제",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1341.0,
                  "y": 4677.0
              },
              {
                  "x": 1484.0,
                  "y": 4677.0
              },
              {
                  "x": 1484.0,
                  "y": 4753.0
              },
              {
                  "x": 1341.0,
                  "y": 4753.0
              }
          ]
      },
      "inferText": "취소",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1484.0,
                  "y": 4672.0
              },
              {
                  "x": 1586.0,
                  "y": 4672.0
              },
              {
                  "x": 1586.0,
                  "y": 4763.0
              },
              {
                  "x": 1484.0,
                  "y": 4763.0
              }
          ]
      },
      "inferText": "시",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1596.0,
                  "y": 4677.0
              },
              {
                  "x": 1734.0,
                  "y": 4677.0
              },
              {
                  "x": 1734.0,
                  "y": 4758.0
              },
              {
                  "x": 1596.0,
                  "y": 4758.0
              }
          ]
      },
      "inferText": "할인",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1754.0,
                  "y": 4677.0
              },
              {
                  "x": 1958.0,
                  "y": 4677.0
              },
              {
                  "x": 1958.0,
                  "y": 4758.0
              },
              {
                  "x": 1754.0,
                  "y": 4758.0
              }
          ]
      },
      "inferText": "금액은",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1974.0,
                  "y": 4682.0
              },
              {
                  "x": 2249.0,
                  "y": 4682.0
              },
              {
                  "x": 2249.0,
                  "y": 4763.0
              },
              {
                  "x": 1974.0,
                  "y": 4763.0
              }
          ]
      },
      "inferText": "제외하고",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2265.0,
                  "y": 4688.0
              },
              {
                  "x": 2624.0,
                  "y": 4702.0
              },
              {
                  "x": 2621.0,
                  "y": 4784.0
              },
              {
                  "x": 2262.0,
                  "y": 4771.0
              }
          ]
      },
      "inferText": "환불됩니다.",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1500.0,
                  "y": 4807.0
              },
              {
                  "x": 1837.0,
                  "y": 4815.0
              },
              {
                  "x": 1836.0,
                  "y": 4887.0
              },
              {
                  "x": 1498.0,
                  "y": 4880.0
              }
          ]
      },
      "inferText": "2024.01.27",
      "inferConfidence": 0.997,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1852.0,
                  "y": 4814.0
              },
              {
                  "x": 2128.0,
                  "y": 4820.0
              },
              {
                  "x": 2126.0,
                  "y": 4894.0
              },
              {
                  "x": 1850.0,
                  "y": 4888.0
              }
          ]
      },
      "inferText": "21:58:15",
      "inferConfidence": 0.9986,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2143.0,
                  "y": 4823.0
              },
              {
                  "x": 2378.0,
                  "y": 4830.0
              },
              {
                  "x": 2376.0,
                  "y": 4908.0
              },
              {
                  "x": 2140.0,
                  "y": 4901.0
              }
          ]
      },
      "inferText": "광***점",
      "inferConfidence": 0.9997,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1173.0,
                  "y": 4870.0
              },
              {
                  "x": 1321.0,
                  "y": 4870.0
              },
              {
                  "x": 1321.0,
                  "y": 4947.0
              },
              {
                  "x": 1173.0,
                  "y": 4947.0
              }
          ]
      },
      "inferText": "상품",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1336.0,
                  "y": 4870.0
              },
              {
                  "x": 1423.0,
                  "y": 4870.0
              },
              {
                  "x": 1423.0,
                  "y": 4957.0
              },
              {
                  "x": 1336.0,
                  "y": 4957.0
              }
          ]
      },
      "inferText": "및",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1433.0,
                  "y": 4870.0
              },
              {
                  "x": 1576.0,
                  "y": 4870.0
              },
              {
                  "x": 1576.0,
                  "y": 4952.0
              },
              {
                  "x": 1433.0,
                  "y": 4952.0
              }
          ]
      },
      "inferText": "기타",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1593.0,
                  "y": 4872.0
              },
              {
                  "x": 1743.0,
                  "y": 4882.0
              },
              {
                  "x": 1737.0,
                  "y": 4962.0
              },
              {
                  "x": 1587.0,
                  "y": 4951.0
              }
          ]
      },
      "inferText": "문의",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1754.0,
                  "y": 4891.0
              },
              {
                  "x": 1800.0,
                  "y": 4891.0
              },
              {
                  "x": 1800.0,
                  "y": 4942.0
              },
              {
                  "x": 1754.0,
                  "y": 4942.0
              }
          ]
      },
      "inferText": ":",
      "inferConfidence": 0.9973,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1821.0,
                  "y": 4878.0
              },
              {
                  "x": 2129.0,
                  "y": 4891.0
              },
              {
                  "x": 2126.0,
                  "y": 4964.0
              },
              {
                  "x": 1818.0,
                  "y": 4951.0
              }
          ]
      },
      "inferText": "1522-4400",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1178.0,
                  "y": 4937.0
              },
              {
                  "x": 1387.0,
                  "y": 4937.0
              },
              {
                  "x": 1387.0,
                  "y": 5018.0
              },
              {
                  "x": 1178.0,
                  "y": 5018.0
              }
          ]
      },
      "inferText": "멤버십",
      "inferConfidence": 0.9995,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1402.0,
                  "y": 4937.0
              },
              {
                  "x": 1479.0,
                  "y": 4937.0
              },
              {
                  "x": 1479.0,
                  "y": 5018.0
              },
              {
                  "x": 1402.0,
                  "y": 5018.0
              }
          ]
      },
      "inferText": "및",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1494.0,
                  "y": 4942.0
              },
              {
                  "x": 1770.0,
                  "y": 4942.0
              },
              {
                  "x": 1770.0,
                  "y": 5024.0
              },
              {
                  "x": 1494.0,
                  "y": 5024.0
              }
          ]
      },
      "inferText": "다이소몰",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1780.0,
                  "y": 4942.0
              },
              {
                  "x": 1923.0,
                  "y": 4942.0
              },
              {
                  "x": 1923.0,
                  "y": 5024.0
              },
              {
                  "x": 1780.0,
                  "y": 5024.0
              }
          ]
      },
      "inferText": "관련",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1943.0,
                  "y": 4952.0
              },
              {
                  "x": 2086.0,
                  "y": 4952.0
              },
              {
                  "x": 2086.0,
                  "y": 5034.0
              },
              {
                  "x": 1943.0,
                  "y": 5034.0
              }
          ]
      },
      "inferText": "문의",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2106.0,
                  "y": 4967.0
              },
              {
                  "x": 2147.0,
                  "y": 4967.0
              },
              {
                  "x": 2147.0,
                  "y": 5018.0
              },
              {
                  "x": 2106.0,
                  "y": 5018.0
              }
          ]
      },
      "inferText": ":",
      "inferConfidence": 0.9994,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2173.0,
                  "y": 4955.0
              },
              {
                  "x": 2476.0,
                  "y": 4965.0
              },
              {
                  "x": 2473.0,
                  "y": 5042.0
              },
              {
                  "x": 2170.0,
                  "y": 5033.0
              }
          ]
      },
      "inferText": "1599-2211",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1678.0,
                  "y": 5154.0
              },
              {
                  "x": 2216.0,
                  "y": 5173.0
              },
              {
                  "x": 2213.0,
                  "y": 5255.0
              },
              {
                  "x": 1676.0,
                  "y": 5236.0
              }
          ]
      },
      "inferText": "2341720710239331",
      "inferConfidence": 0.9996,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1423.0,
                  "y": 5330.0
              },
              {
                  "x": 1668.0,
                  "y": 5330.0
              },
              {
                  "x": 1668.0,
                  "y": 5421.0
              },
              {
                  "x": 1423.0,
                  "y": 5421.0
              }
          ]
      },
      "inferText": "[완전히",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1678.0,
                  "y": 5340.0
              },
              {
                  "x": 1953.0,
                  "y": 5340.0
              },
              {
                  "x": 1953.0,
                  "y": 5442.0
              },
              {
                  "x": 1678.0,
                  "y": 5442.0
              }
          ]
      },
      "inferText": "새로워진",
      "inferConfidence": 0.9492,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1969.0,
                  "y": 5345.0
              },
              {
                  "x": 2239.0,
                  "y": 5345.0
              },
              {
                  "x": 2239.0,
                  "y": 5432.0
              },
              {
                  "x": 1969.0,
                  "y": 5432.0
              }
          ]
      },
      "inferText": "다이소몰",
      "inferConfidence": 0.9999,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2259.0,
                  "y": 5355.0
              },
              {
                  "x": 2474.0,
                  "y": 5355.0
              },
              {
                  "x": 2474.0,
                  "y": 5447.0
              },
              {
                  "x": 2259.0,
                  "y": 5447.0
              }
          ]
      },
      "inferText": "오픈!]",
      "inferConfidence": 0.9989,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1612.0,
                  "y": 5404.0
              },
              {
                  "x": 1884.0,
                  "y": 5412.0
              },
              {
                  "x": 1882.0,
                  "y": 5496.0
              },
              {
                  "x": 1610.0,
                  "y": 5489.0
              }
          ]
      },
      "inferText": "다이소몰",
      "inferConfidence": 0.995,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1938.0,
                  "y": 5421.0
              },
              {
                  "x": 2020.0,
                  "y": 5421.0
              },
              {
                  "x": 2020.0,
                  "y": 5503.0
              },
              {
                  "x": 1938.0,
                  "y": 5503.0
              }
          ]
      },
      "inferText": "첫",
      "inferConfidence": 0.9989,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2030.0,
                  "y": 5421.0
              },
              {
                  "x": 2305.0,
                  "y": 5421.0
              },
              {
                  "x": 2305.0,
                  "y": 5503.0
              },
              {
                  "x": 2030.0,
                  "y": 5503.0
              }
          ]
      },
      "inferText": "방문하면",
      "inferConfidence": 0.9997,
      "type": "NORMAL",
      "lineBreak": true
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1515.0,
                  "y": 5469.0
              },
              {
                  "x": 1986.0,
                  "y": 5482.0
              },
              {
                  "x": 1983.0,
                  "y": 5566.0
              },
              {
                  "x": 1513.0,
                  "y": 5554.0
              }
          ]
      },
      "inferText": "배송비쿠폰x2장",
      "inferConfidence": 0.9944,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 1999.0,
                  "y": 5493.0
              },
              {
                  "x": 2147.0,
                  "y": 5493.0
              },
              {
                  "x": 2147.0,
                  "y": 5574.0
              },
              {
                  "x": 1999.0,
                  "y": 5574.0
              }
          ]
      },
      "inferText": "즉시",
      "inferConfidence": 1.0,
      "type": "NORMAL",
      "lineBreak": false
  },
  {
      "valueType": "ALL",
      "boundingPoly": {
          "vertices": [
              {
                  "x": 2162.0,
                  "y": 5498.0
              },
              {
                  "x": 2336.0,
                  "y": 5498.0
              },
              {
                  "x": 2336.0,
                  "y": 5579.0
              },
              {
                  "x": 2162.0,
                  "y": 5579.0
              }
          ]
      },
      "inferText": "증정!",
      "inferConfidence": 0.9998,
      "type": "NORMAL",
      "lineBreak": true
  }
]

export const result = ['"', '국민가게,', '다이소"', '매장:광주광역시', '(주)아성다이소', '광주수완점', '광산구', '임방울대로', '347', '(수완동)', '대표 김기호', '본사 서울', '강남구', '213-81-52063', '남부순환로', '2748', '(도곡동)', '소비자중심경영(CCM)', '인증기업', 'ISO', '9001', '품질경영시스템', '인증기업', '교환/환불', '14일(02월10일)이내,', '(전자)영수증,', '결제카드', '지참', '후', '구입매장에서', '가능', '포장/가격', '택 훼손시', '교환/환불', '불가', '체크카드', '취소 시', '최대', '7일', '소요', '[POS', '1039331]', '2024.01.27', '21:56:02', '매장용', '반투명', '타포린백(1', '1,000', '1', '1,000', '[1025721]', '코인초콜릿레몬(100', 'g)', '2,000', '1', '2,000', '[926940987]', '모델링페이스트(100', 'ml', '1,000', '1', '1,000', '[1046032]', '딸기쿠키크런치', '(20', 'g)', '1,000', '1', '1,000', '[926940897]', '딸기데코파우더(20', 'g)', '1,000', '1', '1,000', '[926940902]', '캔버스스케치북', '(A4/10매', '2,000', '1', '2,000', '[1040249]', '미술용둥근붓', '6개입', '2,000', '1', '2,000', '[85626]', '비접착식선물봉투25매', '(11', '1,000', '1', '1,000', '[1007078]', '다기능고급주방가위', '2,000', '1', '2,000', '[32638]', '손잡이틈새청소솔', ]