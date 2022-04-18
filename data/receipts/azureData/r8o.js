export const data = {
  receiptData: {
    invoiceDate: {
      kind: 'date',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [195, 119, 279, 118, 279, 136, 195, 137],
        },
      ],
      content: '29-10-2020',
      spans: [
        {
          offset: 100,
          length: 10,
        },
      ],
      confidence: 0.963,
    },
    vendorName: {
      kind: 'string',
      value: 'Dansk Outlet Holstebro ApS 3',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [226, 7, 436, 3, 437, 33, 226, 37],
        },
      ],
      content: 'Dansk Outlet Holstebro ApS 3',
      spans: [
        {
          offset: 0,
          length: 26,
        },
        {
          offset: 39,
          length: 1,
        },
      ],
      confidence: 0.954,
    },
    vendorAddress: {
      kind: 'string',
      value: 'Lundholmvej 7500 Holstebro',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [276, 18, 389, 18, 389, 50, 276, 50],
        },
      ],
      content: 'Lundholmvej 7500 Holstebro',
      spans: [
        {
          offset: 27,
          length: 11,
        },
        {
          offset: 41,
          length: 14,
        },
      ],
      confidence: 0.954,
    },
    vendorAddressRecipient: {
      kind: 'string',
      value: 'Dansk Outlet Holstebro ApS 3',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [226, 7, 436, 3, 437, 33, 226, 37],
        },
      ],
      content: 'Dansk Outlet Holstebro ApS 3',
      spans: [
        {
          offset: 0,
          length: 26,
        },
        {
          offset: 39,
          length: 1,
        },
      ],
      confidence: 0.954,
    },
    totalTax: {
      kind: 'number',
      value: -150,
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [459, 655, 516, 654, 516, 670, 459, 669],
        },
      ],
      content: '-150.00',
      spans: [
        {
          offset: 570,
          length: 7,
        },
      ],
      confidence: 0.304,
    },
    invoiceTotal: {
      kind: 'number',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [469, 702, 534, 702, 533, 718, 469, 718],
        },
      ],
      content: '1.775,00',
      spans: [
        {
          offset: 610,
          length: 8,
        },
      ],
      confidence: 0.435,
    },
    items: {
      kind: 'array',
      values: [
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 100,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [480, 335, 527, 334, 528, 350, 480, 352],
                },
              ],
              content: '100.00',
              spans: [
                {
                  offset: 328,
                  length: 6,
                },
              ],
              confidence: 0.6,
            },
            description: {
              kind: 'string',
              value: '1 Dame Tights 2 stk 150 ,-',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [184, 339, 393, 337, 393, 356, 184, 358],
                },
              ],
              content: '1 Dame Tights 2 stk 150 ,-',
              spans: [
                {
                  offset: 301,
                  length: 26,
                },
              ],
              confidence: 0.408,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [184, 337, 528, 334, 528, 355, 184, 358],
            },
          ],
          content: '100.00 1 Dame Tights 2 stk 150 ,-',
          spans: [
            {
              offset: 301,
              length: 33,
            },
          ],
          confidence: 0.774,
        },
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 75,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [488, 366, 528, 366, 528, 382, 488, 383],
                },
              ],
              content: '75.00',
              spans: [
                {
                  offset: 364,
                  length: 5,
                },
              ],
              confidence: 0.883,
            },
            description: {
              kind: 'string',
              value: '1 Dame bambus str>mper 3 pak',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [185, 369, 415, 369, 415, 388, 185, 388],
                },
              ],
              content: '1 Dame bambus str>mper 3 pak',
              spans: [
                {
                  offset: 335,
                  length: 28,
                },
              ],
              confidence: 0.478,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [185, 368, 528, 366, 528, 387, 185, 390],
            },
          ],
          content: '1 Dame bambus str>mper 3 pak 75.00',
          spans: [
            {
              offset: 335,
              length: 34,
            },
          ],
          confidence: 0.936,
        },
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 225,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [479, 399, 529, 398, 528, 415, 479, 416],
                },
              ],
              content: '225.00',
              spans: [
                {
                  offset: 385,
                  length: 6,
                },
              ],
              confidence: 0.888,
            },
            description: {
              kind: 'string',
              value: 'Jille blouse',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [205, 401, 306, 401, 306, 419, 205, 419],
                },
              ],
              content: 'Jille blouse',
              spans: [
                {
                  offset: 372,
                  length: 12,
                },
              ],
              confidence: 0.898,
            },
            quantity: {
              kind: 'number',
              value: 1,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [186, 402, 196, 402, 196, 419, 185, 419],
                },
              ],
              content: '1',
              spans: [
                {
                  offset: 370,
                  length: 1,
                },
              ],
              confidence: 0.467,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [185, 398, 529, 398, 529, 419, 185, 419],
            },
          ],
          content: '1 Jille blouse 225.00',
          spans: [
            {
              offset: 370,
              length: 21,
            },
          ],
          confidence: 0.882,
        },
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 27500,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [478, 430, 530, 429, 530, 446, 478, 447],
                },
              ],
              content: '275,00',
              spans: [
                {
                  offset: 401,
                  length: 6,
                },
              ],
              confidence: 0.9,
            },
            description: {
              kind: 'string',
              value: 'tunica',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [207, 433, 258, 433, 258, 450, 207, 450],
                },
              ],
              content: 'tunica',
              spans: [
                {
                  offset: 394,
                  length: 6,
                },
              ],
              confidence: 0.902,
            },
            quantity: {
              kind: 'number',
              value: 1,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [185, 433, 195, 433, 195, 450, 185, 450],
                },
              ],
              content: '1',
              spans: [
                {
                  offset: 392,
                  length: 1,
                },
              ],
              confidence: 0.436,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [185, 429, 530, 429, 530, 450, 185, 450],
            },
          ],
          content: '1 tunica 275,00',
          spans: [
            {
              offset: 392,
              length: 15,
            },
          ],
          confidence: 0.88,
        },
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 300,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [480, 462, 530, 462, 530, 478, 481, 478],
                },
              ],
              content: '300.00',
              spans: [
                {
                  offset: 428,
                  length: 6,
                },
              ],
              confidence: 0.9,
            },
            description: {
              kind: 'string',
              value: 'Cassiopeia Tunica',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [203, 464, 346, 463, 346, 482, 203, 483],
                },
              ],
              content: 'Cassiopeia Tunica',
              spans: [
                {
                  offset: 410,
                  length: 17,
                },
              ],
              confidence: 0.888,
            },
            quantity: {
              kind: 'number',
              value: 1,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [185, 465, 196, 465, 195, 482, 185, 483],
                },
              ],
              content: '1',
              spans: [
                {
                  offset: 408,
                  length: 1,
                },
              ],
              confidence: 0.458,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [185, 464, 530, 462, 530, 481, 185, 483],
            },
          ],
          content: '1 Cassiopeia Tunica 300.00',
          spans: [
            {
              offset: 408,
              length: 26,
            },
          ],
          confidence: 0.882,
        },
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 25000,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [481, 493, 531, 493, 531, 510, 482, 510],
                },
              ],
              content: '250,00',
              spans: [
                {
                  offset: 463,
                  length: 6,
                },
              ],
              confidence: 0.899,
            },
            description: {
              kind: 'string',
              value: 'Jam - Lotta stretch jeans',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [205, 495, 410, 495, 410, 514, 205, 514],
                },
              ],
              content: 'Jam - Lotta stretch jeans',
              spans: [
                {
                  offset: 437,
                  length: 25,
                },
              ],
              confidence: 0.888,
            },
            quantity: {
              kind: 'number',
              value: 1,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [184, 496, 195, 496, 195, 514, 184, 514],
                },
              ],
              content: '1',
              spans: [
                {
                  offset: 435,
                  length: 1,
                },
              ],
              confidence: 0.465,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [184, 493, 531, 493, 531, 514, 184, 514],
            },
          ],
          content: '1 Jam - Lotta stretch jeans 250,00',
          spans: [
            {
              offset: 435,
              length: 34,
            },
          ],
          confidence: 0.95,
        },
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 15000,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [483, 525, 531, 524, 532, 541, 483, 542],
                },
              ],
              content: '150,00',
              spans: [
                {
                  offset: 501,
                  length: 6,
                },
              ],
              confidence: 0.83,
            },
            description: {
              kind: 'string',
              value: 'Steenholt - Grace stretch je 50%',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [203, 526, 434, 526, 434, 559, 203, 559],
                },
              ],
              content: 'Steenholt - Grace stretch je 50%',
              spans: [
                {
                  offset: 472,
                  length: 28,
                },
                {
                  offset: 508,
                  length: 3,
                },
              ],
              confidence: 0.69,
            },
            quantity: {
              kind: 'number',
              value: 1,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [184, 527, 195, 527, 195, 545, 184, 546],
                },
              ],
              content: '1',
              spans: [
                {
                  offset: 470,
                  length: 1,
                },
              ],
              confidence: 0.457,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [184, 524, 532, 524, 532, 559, 184, 559],
            },
          ],
          content: '1 Steenholt - Grace stretch je 50% 150,00',
          spans: [
            {
              offset: 470,
              length: 41,
            },
          ],
          confidence: 0.867,
        },
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 20000,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [482, 558, 532, 558, 532, 574, 482, 575],
                },
              ],
              content: '200,00',
              spans: [
                {
                  offset: 525,
                  length: 6,
                },
              ],
              confidence: 0.9,
            },
            description: {
              kind: 'string',
              value: 'Cassiopeia',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [203, 560, 289, 560, 288, 578, 203, 578],
                },
              ],
              content: 'Cassiopeia',
              spans: [
                {
                  offset: 514,
                  length: 10,
                },
              ],
              confidence: 0.899,
            },
            quantity: {
              kind: 'number',
              value: 1,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [184, 560, 195, 560, 195, 578, 184, 578],
                },
              ],
              content: '1',
              spans: [
                {
                  offset: 512,
                  length: 1,
                },
              ],
              confidence: 0.454,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [184, 558, 532, 558, 532, 578, 184, 578],
            },
          ],
          content: '1 Cassiopeia 200,00',
          spans: [
            {
              offset: 512,
              length: 19,
            },
          ],
          confidence: 0.873,
        },
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 200,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [482, 590, 533, 590, 532, 607, 482, 607],
                },
              ],
              content: '200.00',
              spans: [
                {
                  offset: 541,
                  length: 6,
                },
              ],
              confidence: 0.898,
            },
            description: {
              kind: 'string',
              value: 'Bumbag',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [204, 592, 259, 593, 258, 610, 204, 610],
                },
              ],
              content: 'Bumbag',
              spans: [
                {
                  offset: 534,
                  length: 6,
                },
              ],
              confidence: 0.932,
            },
            quantity: {
              kind: 'number',
              value: 1,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [184, 592, 195, 592, 195, 610, 184, 610],
                },
              ],
              content: '1',
              spans: [
                {
                  offset: 532,
                  length: 1,
                },
              ],
              confidence: 0.437,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [184, 590, 533, 590, 533, 610, 184, 610],
            },
          ],
          content: '1 Bumbag 200.00',
          spans: [
            {
              offset: 532,
              length: 15,
            },
          ],
          confidence: 0.872,
        },
      ],
    },
  },
};
export default { data };
