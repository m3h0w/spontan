export const data = {
  receiptData: {
    invoiceId: {
      kind: 'string',
      value: '73',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [1015, 1361, 1065, 1360, 1066, 1400, 1015, 1401],
        },
      ],
      content: '73',
      spans: [
        {
          offset: 300,
          length: 2,
        },
      ],
      confidence: 0.968,
    },
    invoiceDate: {
      kind: 'date',
      value: '2021-06-03T00:00:00.000Z',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [205, 1376, 432, 1371, 432, 1413, 205, 1416],
        },
      ],
      content: '06/03/2021',
      spans: [
        {
          offset: 267,
          length: 10,
        },
      ],
      confidence: 0.994,
    },
    vendorName: {
      kind: 'string',
      value: 'UNI QLO',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [695, 236, 809, 234, 810, 348, 697, 349],
        },
      ],
      content: 'UNI QLO',
      spans: [
        {
          offset: 0,
          length: 7,
        },
      ],
      confidence: 0.995,
    },
    vendorAddress: {
      kind: 'string',
      value: 'VIMMELSKAFTET 38 KØBENHAVN K',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [173, 1641, 544, 1633, 546, 1732, 175, 1740],
        },
      ],
      content: 'VIMMELSKAFTET 38 KØBENHAVN K',
      spans: [
        {
          offset: 345,
          length: 28,
        },
      ],
      confidence: 0.995,
    },
    vendorAddressRecipient: {
      kind: 'string',
      value: 'UNIQLO STRØGET',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [176, 1590, 499, 1583, 500, 1625, 177, 1632],
        },
      ],
      content: 'UNIQLO STRØGET',
      spans: [
        {
          offset: 330,
          length: 14,
        },
      ],
      confidence: 0.995,
    },
    subTotal: {
      kind: 'number',
      value: 9900,
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [744, 1210, 857, 1209, 857, 1248, 744, 1249],
        },
      ],
      content: '99,00',
      spans: [
        {
          offset: 224,
          length: 5,
        },
      ],
      confidence: 0.321,
    },
    invoiceTotal: {
      kind: 'number',
      value: 9900,
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [921, 954, 1030, 952, 1031, 991, 922, 993],
        },
      ],
      content: '99,00',
      spans: [
        {
          offset: 171,
          length: 5,
        },
      ],
      confidence: 0.993,
    },
    items: {
      kind: 'array',
      values: [
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 9900,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [914, 754, 1067, 751, 1068, 791, 915, 794],
                },
              ],
              content: '99,00 T',
              spans: [
                {
                  offset: 132,
                  length: 7,
                },
              ],
              confidence: 0.456,
            },
            description: {
              kind: 'string',
              value: '2000149464167',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [212, 772, 499, 766, 499, 805, 212, 809],
                },
              ],
              content: '2000149464167',
              spans: [
                {
                  offset: 114,
                  length: 13,
                },
              ],
              confidence: 0.693,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [211, 766, 1067, 751, 1068, 795, 212, 810],
            },
          ],
          content: '2000149464167 x 1 99,00 T',
          spans: [
            {
              offset: 114,
              length: 25,
            },
          ],
          confidence: 0.57,
        },
      ],
    },
  },
};
export default { data };
