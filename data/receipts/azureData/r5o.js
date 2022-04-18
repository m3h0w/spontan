export const data = {
  receiptData: {
    invoiceId: {
      kind: 'string',
      value: '428332xxxxxx6763',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [486, 1191, 683, 1194, 681, 1221, 485, 1214],
        },
      ],
      content: '428332xxxxxx6763',
      spans: [
        {
          offset: 505,
          length: 16,
        },
      ],
      confidence: 0.523,
    },
    invoiceDate: {
      kind: 'date',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [270, 1374, 394, 1375, 393, 1403, 270, 1403],
        },
      ],
      content: '20/12/2014',
      spans: [
        {
          offset: 591,
          length: 10,
        },
      ],
      confidence: 0.989,
    },
    vendorName: {
      kind: 'string',
      value: 'UNI QLO',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [587, 29, 655, 28, 657, 106, 589, 108],
        },
      ],
      content: 'UNI QLO',
      spans: [
        {
          offset: 0,
          length: 7,
        },
      ],
      confidence: 0.982,
    },
    vendorAddress: {
      kind: 'string',
      value:
        'G-11, 12 & 13, Ground Floor, Resort, 62502 Putraja Uniqlo (Malaysia) Sdn. Bhd.',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [366, 197, 769, 207, 766, 321, 363, 311],
        },
      ],
      content:
        'G-11, 12 & 13, Ground Floor, Resort, 62502 Putraja Uniqlo (Malaysia) Sdn. Bhd.',
      spans: [
        {
          offset: 44,
          length: 28,
        },
        {
          offset: 92,
          length: 21,
        },
        {
          offset: 120,
          length: 27,
        },
      ],
      confidence: 0.995,
    },
    vendorAddressRecipient: {
      kind: 'string',
      value: 'UNIQLO 101 City Mall IOI City Mall, IOI',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [283, 165, 658, 175, 656, 263, 281, 253],
        },
      ],
      content: 'UNIQLO 101 City Mall IOI City Mall, IOI',
      spans: [
        {
          offset: 23,
          length: 20,
        },
        {
          offset: 73,
          length: 18,
        },
      ],
      confidence: 0.946,
    },
    totalTax: {
      kind: 'number',
      value: 0,
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [691, 1302, 739, 1305, 738, 1332, 690, 1329],
        },
      ],
      content: '0.00',
      spans: [
        {
          offset: 581,
          length: 4,
        },
      ],
      confidence: 0.414,
    },
    invoiceTotal: {
      kind: 'number',
      value: 349.4,
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [658, 1088, 734, 1088, 733, 1115, 658, 1114],
        },
      ],
      content: '349.40',
      spans: [
        {
          offset: 473,
          length: 6,
        },
      ],
      confidence: 0.988,
    },
    items: {
      kind: 'array',
      values: [
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 79.9,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [688, 369, 773, 370, 773, 397, 688, 396],
                },
              ],
              content: '79.90 N',
              spans: [
                {
                  offset: 196,
                  length: 7,
                },
              ],
              confidence: 0.359,
            },
            description: {
              kind: 'string',
              value: '2000059690793',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [291, 359, 452, 364, 450, 392, 291, 385],
                },
              ],
              content: '2000059690793',
              spans: [
                {
                  offset: 159,
                  length: 13,
                },
              ],
              confidence: 0.558,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [291, 359, 773, 359, 773, 397, 291, 397],
            },
          ],
          content: '2000059690793 × 1 * 79.90 N',
          spans: [
            {
              offset: 159,
              length: 13,
            },
            {
              offset: 190,
              length: 13,
            },
          ],
          confidence: 0.624,
        },
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: -30,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [677, 451, 747, 449, 745, 474, 676, 471],
                },
              ],
              content: '-30.00',
              spans: [
                {
                  offset: 222,
                  length: 6,
                },
              ],
              confidence: 0.9,
            },
            description: {
              kind: 'string',
              value: "W's rayon blouse Single Item",
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [290, 386, 486, 391, 484, 472, 288, 467],
                },
              ],
              content: "W's rayon blouse Single Item",
              spans: [
                {
                  offset: 173,
                  length: 16,
                },
                {
                  offset: 204,
                  length: 11,
                },
              ],
              confidence: 0.408,
            },
            unitPrice: {
              kind: 'number',
              value: 49.9,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [531, 442, 593, 442, 593, 471, 531, 470],
                },
              ],
              content: '49.90',
              spans: [
                {
                  offset: 216,
                  length: 5,
                },
              ],
              confidence: 0.562,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [289, 386, 748, 392, 747, 474, 288, 468],
            },
          ],
          content: "W's rayon blouse Single Item 49.90 -30.00",
          spans: [
            {
              offset: 173,
              length: 16,
            },
            {
              offset: 204,
              length: 24,
            },
          ],
          confidence: 0.682,
        },
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 59.9,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [686, 498, 770, 501, 769, 530, 685, 527],
                },
              ],
              content: '59.90 N',
              spans: [
                {
                  offset: 247,
                  length: 7,
                },
              ],
              confidence: 0.361,
            },
            description: {
              kind: 'string',
              value: '2000064188872 HEATTECH T',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [288, 492, 449, 494, 448, 549, 288, 547],
                },
              ],
              content: '2000064188872 HEATTECH T',
              spans: [
                {
                  offset: 229,
                  length: 13,
                },
                {
                  offset: 255,
                  length: 10,
                },
              ],
              confidence: 0.6,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [288, 492, 769, 496, 769, 551, 288, 547],
            },
          ],
          content: '2000064188872 × 1 59.90 N HEATTECH T',
          spans: [
            {
              offset: 229,
              length: 36,
            },
          ],
          confidence: 0.573,
        },
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 59.9,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [682, 605, 770, 610, 768, 640, 680, 635],
                },
              ],
              content: '59.90 N',
              spans: [
                {
                  offset: 284,
                  length: 7,
                },
              ],
              confidence: 0.42,
            },
            description: {
              kind: 'string',
              value: '2000066321604',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [289, 601, 445, 604, 446, 632, 289, 628],
                },
              ],
              content: '2000066321604',
              spans: [
                {
                  offset: 266,
                  length: 13,
                },
              ],
              confidence: 0.499,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [289, 598, 769, 609, 768, 640, 288, 630],
            },
          ],
          content: '2000066321604 × 1 59.90 N',
          spans: [
            {
              offset: 266,
              length: 25,
            },
          ],
          confidence: 0.512,
        },
        {
          kind: 'object',
          properties: {
            description: {
              kind: 'string',
              value: 'HEATTECH tights',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [288, 628, 469, 631, 468, 660, 287, 657],
                },
              ],
              content: 'HEATTECH tights',
              spans: [
                {
                  offset: 292,
                  length: 15,
                },
              ],
              confidence: 0.551,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [288, 628, 469, 631, 468, 660, 287, 657],
            },
          ],
          content: 'HEATTECH tights',
          spans: [
            {
              offset: 292,
              length: 15,
            },
          ],
          confidence: 0.185,
        },
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 59.9,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [681, 716, 765, 718, 764, 747, 680, 745],
                },
              ],
              content: '59.90 N',
              spans: [
                {
                  offset: 347,
                  length: 7,
                },
              ],
              confidence: 0.446,
            },
            description: {
              kind: 'string',
              value: '2000061091946',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [285, 709, 443, 712, 442, 738, 286, 735],
                },
              ],
              content: '2000061091946',
              spans: [
                {
                  offset: 308,
                  length: 13,
                },
              ],
              confidence: 0.547,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [285, 708, 765, 718, 764, 747, 284, 737],
            },
          ],
          content: '2000061091946 X 1 59.90 N',
          spans: [
            {
              offset: 308,
              length: 17,
            },
            {
              offset: 347,
              length: 7,
            },
          ],
          confidence: 0.523,
        },
        {
          kind: 'object',
          properties: {
            description: {
              kind: 'string',
              value: "W's HEATTECH T-shirt",
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [285, 734, 526, 739, 525, 768, 284, 762],
                },
              ],
              content: "W's HEATTECH T-shirt",
              spans: [
                {
                  offset: 326,
                  length: 20,
                },
              ],
              confidence: 0.626,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [285, 734, 526, 739, 525, 768, 284, 762],
            },
          ],
          content: "W's HEATTECH T-shirt",
          spans: [
            {
              offset: 326,
              length: 20,
            },
          ],
          confidence: 0.43,
        },
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 59.9,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [677, 824, 762, 826, 761, 854, 676, 851],
                },
              ],
              content: '59.90 N',
              spans: [
                {
                  offset: 393,
                  length: 7,
                },
              ],
              confidence: 0.437,
            },
            description: {
              kind: 'string',
              value: '2000058657193',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [281, 817, 440, 820, 439, 845, 280, 842],
                },
              ],
              content: '2000058657193',
              spans: [
                {
                  offset: 355,
                  length: 13,
                },
              ],
              confidence: 0.596,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [280, 816, 762, 825, 761, 854, 280, 844],
            },
          ],
          content: '2000058657193 x 1 59.90 N',
          spans: [
            {
              offset: 355,
              length: 13,
            },
            {
              offset: 389,
              length: 11,
            },
          ],
          confidence: 0.489,
        },
        {
          kind: 'object',
          properties: {
            description: {
              kind: 'string',
              value: 'W HEATTECH leggings',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [282, 841, 513, 849, 512, 878, 281, 870],
                },
              ],
              content: 'W HEATTECH leggings',
              spans: [
                {
                  offset: 369,
                  length: 19,
                },
              ],
              confidence: 0.307,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [282, 841, 513, 849, 512, 878, 281, 870],
            },
          ],
          content: 'W HEATTECH leggings',
          spans: [
            {
              offset: 369,
              length: 19,
            },
          ],
          confidence: 0.242,
        },
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 59.9,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [677, 930, 759, 933, 758, 961, 676, 958],
                },
              ],
              content: '59.90 N',
              spans: [
                {
                  offset: 437,
                  length: 7,
                },
              ],
              confidence: 0.546,
            },
            description: {
              kind: 'string',
              value: '2000063127872',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [280, 924, 437, 927, 437, 953, 280, 948],
                },
              ],
              content: '2000063127872',
              spans: [
                {
                  offset: 401,
                  length: 13,
                },
              ],
              confidence: 0.588,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [280, 917, 759, 933, 758, 964, 279, 948],
            },
          ],
          content: '2000063127872 X 1 59.90 N',
          spans: [
            {
              offset: 401,
              length: 13,
            },
            {
              offset: 433,
              length: 11,
            },
          ],
          confidence: 0.46,
        },
        {
          kind: 'object',
          properties: {
            description: {
              kind: 'string',
              value: "K's fleece jacket",
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [279, 947, 484, 951, 483, 981, 278, 977],
                },
              ],
              content: "K's fleece jacket",
              spans: [
                {
                  offset: 415,
                  length: 17,
                },
              ],
              confidence: 0.503,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [279, 947, 484, 951, 483, 981, 278, 977],
            },
          ],
          content: "K's fleece jacket",
          spans: [
            {
              offset: 415,
              length: 17,
            },
          ],
          confidence: 0.41,
        },
      ],
    },
  },
};
export default { data };
