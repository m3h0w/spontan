export const data = {
  receiptData: {
    invoiceId: {
      kind: 'string',
      value: '768561 176',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [484, 1224, 680, 1224, 680, 1260, 484, 1260],
        },
      ],
      content: '768561 176',
      spans: [
        {
          offset: 454,
          length: 10,
        },
      ],
      confidence: 0.995,
    },
    invoiceDate: {
      kind: 'date',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [47, 1231, 210, 1229, 210, 1263, 45, 1267],
        },
      ],
      content: '30/04/2017',
      spans: [
        {
          offset: 430,
          length: 10,
        },
      ],
      confidence: 0.995,
    },
    vendorName: {
      kind: 'string',
      value: 'UNI QLO',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [409, 121, 502, 119, 504, 230, 411, 232],
        },
      ],
      content: 'UNI QLO',
      spans: [
        {
          offset: 10,
          length: 7,
        },
      ],
      confidence: 0.995,
    },
    vendorAddress: {
      kind: 'string',
      value: '68 Orchard Road Singapore 238839',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [197, 394, 448, 389, 450, 463, 198, 467],
        },
      ],
      content: '68 Orchard Road Singapore 238839',
      spans: [
        {
          offset: 79,
          length: 15,
        },
        {
          offset: 97,
          length: 16,
        },
      ],
      confidence: 0.995,
    },
    vendorAddressRecipient: {
      kind: 'string',
      value: 'UNIQLO Plaza Singapura',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [149, 322, 494, 318, 494, 358, 149, 362],
        },
      ],
      content: 'UNIQLO Plaza Singapura',
      spans: [
        {
          offset: 43,
          length: 22,
        },
      ],
      confidence: 0.995,
    },
    totalTax: {
      kind: 'number',
      value: 1.36,
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [601, 1119, 666, 1120, 666, 1155, 601, 1154],
        },
      ],
      content: '1.36',
      spans: [
        {
          offset: 394,
          length: 4,
        },
      ],
      confidence: 0.995,
    },
    invoiceTotal: {
      kind: 'number',
      value: 20.8,
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [561, 840, 644, 839, 645, 872, 561, 873],
        },
      ],
      content: '20.80',
      spans: [
        {
          offset: 266,
          length: 5,
        },
      ],
      confidence: 0.995,
    },
    items: {
      kind: 'array',
      values: [
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 7.9,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [572, 564, 665, 564, 665, 600, 572, 600],
                },
              ],
              content: '7.90 T',
              spans: [
                {
                  offset: 196,
                  length: 6,
                },
              ],
              confidence: 0.651,
            },
            description: {
              kind: 'string',
              value: '2000084715799',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [45, 567, 254, 575, 252, 609, 46, 601],
                },
              ],
              content: '2000084715799',
              spans: [
                {
                  offset: 160,
                  length: 13,
                },
              ],
              confidence: 0.5,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [45, 564, 665, 564, 665, 609, 45, 609],
            },
          ],
          content: '2000084715799 x 7.90 T',
          spans: [
            {
              offset: 160,
              length: 13,
            },
            {
              offset: 194,
              length: 8,
            },
          ],
          confidence: 0.636,
        },
        {
          kind: 'object',
          properties: {
            description: {
              kind: 'string',
              value: "W's SUPIMA COTTON T",
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [46, 597, 343, 609, 342, 647, 45, 635],
                },
              ],
              content: "W's SUPIMA COTTON T",
              spans: [
                {
                  offset: 174,
                  length: 19,
                },
              ],
              confidence: 0.596,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [46, 597, 343, 609, 342, 647, 45, 635],
            },
          ],
          content: "W's SUPIMA COTTON T",
          spans: [
            {
              offset: 174,
              length: 19,
            },
          ],
          confidence: 0.569,
        },
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 12.9,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [561, 704, 667, 704, 667, 741, 561, 741],
                },
              ],
              content: '12.90 T',
              spans: [
                {
                  offset: 250,
                  length: 7,
                },
              ],
              confidence: 0.668,
            },
            description: {
              kind: 'string',
              value: "2000090928589 W's Disney T-shirt",
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [44, 704, 334, 711, 332, 784, 42, 778],
                },
              ],
              content: "2000090928589 W's Disney T-shirt",
              spans: [
                {
                  offset: 213,
                  length: 32,
                },
              ],
              confidence: 0.407,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [44, 692, 668, 704, 666, 790, 43, 778],
            },
          ],
          content: "2000090928589 x 1 12.90 T W's Disney T-shirt",
          spans: [
            {
              offset: 213,
              length: 44,
            },
          ],
          confidence: 0.573,
        },
      ],
    },
  },
};
export default { data };
