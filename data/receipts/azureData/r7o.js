export const data = {
  receiptData: {
    invoiceId: {
      kind: 'string',
      value: '920 419 518',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [315, 643, 416, 633, 418, 652, 317, 662],
        },
      ],
      content: '920 419 518',
      spans: [
        {
          offset: 230,
          length: 11,
        },
      ],
      confidence: 0.76,
    },
    invoiceDate: {
      kind: 'date',
      value: '2019-07-11T00:00:00.000Z',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [238, 729, 330, 720, 331, 737, 239, 746],
        },
      ],
      content: '07.11.2019',
      spans: [
        {
          offset: 267,
          length: 10,
        },
      ],
      confidence: 0.963,
    },
    vendorName: {
      kind: 'string',
      value: 'GANNI',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [255, 238, 575, 227, 575, 293, 257, 302],
        },
      ],
      content: 'GANNI',
      spans: [
        {
          offset: 0,
          length: 5,
        },
      ],
      confidence: 0.741,
    },
    totalTax: {
      kind: 'number',
      value: 65980,
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [556, 605, 609, 603, 610, 621, 556, 623],
        },
      ],
      content: '659,80',
      spans: [
        {
          offset: 213,
          length: 6,
        },
      ],
      confidence: 0.681,
    },
    invoiceTotal: {
      kind: 'number',
      value: 329900,
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [486, 569, 601, 564, 601, 582, 486, 588],
        },
      ],
      content: '3299,00',
      spans: [
        {
          offset: 185,
          length: 7,
        },
      ],
      confidence: 0.557,
    },
    serviceStartDate: {
      kind: 'date',
      value: '2022-10-18T00:00:00.000Z',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [380, 362, 441, 361, 442, 381, 380, 383],
        },
      ],
      content: '10-18,',
      spans: [
        {
          offset: 54,
          length: 6,
        },
      ],
      confidence: 0.785,
    },
    serviceEndDate: {
      kind: 'date',
      value: '2022-10-19T00:00:00.000Z',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [540, 358, 590, 356, 590, 376, 541, 378],
        },
      ],
      content: '10-19',
      spans: [
        {
          offset: 71,
          length: 5,
        },
      ],
      confidence: 0.749,
    },
    items: {
      kind: 'array',
      values: [
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 329900,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [547, 485, 612, 483, 612, 501, 548, 504],
                },
              ],
              content: '3299,00',
              spans: [
                {
                  offset: 155,
                  length: 7,
                },
              ],
              confidence: 0.771,
            },
            description: {
              kind: 'string',
              value: "TIGER'S EYE 19.32",
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [223, 501, 387, 493, 388, 513, 224, 521],
                },
              ],
              content: "TIGER'S EYE 19.32",
              spans: [
                {
                  offset: 137,
                  length: 17,
                },
              ],
              confidence: 0.632,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [223, 498, 612, 482, 613, 505, 224, 521],
            },
          ],
          content: "TIGER'S EYE 19.32 3299,00",
          spans: [
            {
              offset: 137,
              length: 25,
            },
          ],
          confidence: 0.7,
        },
      ],
    },
  },
};
export default { data };
