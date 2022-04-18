export const data = {
  receiptData: {
    invoiceDate: {
      kind: 'date',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [180, 422, 234, 418, 234, 433, 181, 436],
        },
      ],
      content: '15/07/2017',
      spans: [
        {
          offset: 408,
          length: 10,
        },
      ],
      confidence: 0.995,
    },
    vendorName: {
      kind: 'string',
      value: 'UNI',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [282, 56, 313, 57, 312, 72, 281, 70],
        },
      ],
      content: 'UNI',
      spans: [
        {
          offset: 0,
          length: 3,
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
          boundingBox: [219, 136, 306, 134, 306, 159, 220, 161],
        },
      ],
      content: '68 Orchard Road Singapore 238839',
      spans: [
        {
          offset: 65,
          length: 15,
        },
        {
          offset: 89,
          length: 16,
        },
      ],
      confidence: 0.995,
    },
    vendorAddressRecipient: {
      kind: 'string',
      value: 'UNIQLO Plaza Singapura #03-53 to 62',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [199, 113, 318, 113, 318, 137, 199, 137],
        },
      ],
      content: 'UNIQLO Plaza Singapura #03-53 to 62',
      spans: [
        {
          offset: 29,
          length: 35,
        },
      ],
      confidence: 0.995,
    },
    totalTax: {
      kind: 'number',
      value: 3.26,
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [362, 375, 385, 375, 385, 387, 362, 388],
        },
      ],
      content: '3.26',
      spans: [
        {
          offset: 361,
          length: 4,
        },
      ],
      confidence: 0.995,
    },
    invoiceTotal: {
      kind: 'number',
      value: 49.8,
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [348, 307, 374, 306, 375, 319, 349, 320],
        },
      ],
      content: '49.80',
      spans: [
        {
          offset: 279,
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
              value: 19.9,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [343, 190, 368, 190, 368, 203, 343, 204],
                },
              ],
              content: '19.90',
              spans: [
                {
                  offset: 177,
                  length: 5,
                },
              ],
              confidence: 0.725,
            },
            description: {
              kind: 'string',
              value: '2000096835331',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [168, 197, 241, 195, 241, 208, 168, 210],
                },
              ],
              content: '2000096835331',
              spans: [
                {
                  offset: 147,
                  length: 13,
                },
              ],
              confidence: 0.407,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [168, 190, 379, 190, 379, 210, 168, 210],
            },
          ],
          content: '2000096835331 x 1 19.90 T',
          spans: [
            {
              offset: 147,
              length: 13,
            },
            {
              offset: 173,
              length: 11,
            },
          ],
          confidence: 0.429,
        },
        {
          kind: 'object',
          properties: {
            description: {
              kind: 'string',
              value: "W's sweater",
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [166, 209, 230, 209, 230, 222, 166, 222],
                },
              ],
              content: "W's sweater",
              spans: [
                {
                  offset: 161,
                  length: 11,
                },
              ],
              confidence: 0.577,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [166, 209, 230, 209, 230, 222, 166, 222],
            },
          ],
          content: "W's sweater",
          spans: [
            {
              offset: 161,
              length: 11,
            },
          ],
          confidence: 0.309,
        },
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 29.9,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [345, 238, 372, 237, 372, 250, 345, 251],
                },
              ],
              content: '29.90',
              spans: [
                {
                  offset: 228,
                  length: 5,
                },
              ],
              confidence: 0.597,
            },
            description: {
              kind: 'string',
              value: '2000098393013',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [170, 246, 242, 243, 242, 256, 171, 259],
                },
              ],
              content: '2000098393013',
              spans: [
                {
                  offset: 210,
                  length: 13,
                },
              ],
              confidence: 0.198,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [170, 244, 382, 236, 383, 251, 170, 259],
            },
          ],
          content: '2000098393013 x 1 29.90 T',
          spans: [
            {
              offset: 210,
              length: 25,
            },
          ],
          confidence: 0.352,
        },
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 49.8,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [346, 284, 374, 283, 375, 296, 347, 297],
                },
              ],
              content: '49.80',
              spans: [
                {
                  offset: 264,
                  length: 5,
                },
              ],
              confidence: 0.601,
            },
            description: {
              kind: 'string',
              value: "W's sweater",
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [170, 257, 232, 257, 232, 271, 170, 271],
                },
              ],
              content: "W's sweater",
              spans: [
                {
                  offset: 236,
                  length: 11,
                },
              ],
              confidence: 0.6,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [170, 257, 375, 257, 375, 300, 170, 300],
            },
          ],
          content: "W's sweater 2 49.80",
          spans: [
            {
              offset: 236,
              length: 11,
            },
            {
              offset: 262,
              length: 7,
            },
          ],
          confidence: 0.455,
        },
      ],
    },
  },
};
export default { data };
