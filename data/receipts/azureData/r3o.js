export const data = {
  receiptData: {
    invoiceId: {
      kind: 'string',
      value: '2272439',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [351, 962, 437, 962, 437, 981, 352, 981],
        },
      ],
      content: '2272439',
      spans: [
        {
          offset: 381,
          length: 7,
        },
      ],
      confidence: 0.995,
    },
    invoiceDate: {
      kind: 'date',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [44, 962, 161, 962, 161, 982, 44, 982],
        },
      ],
      content: '16/05/2021',
      spans: [
        {
          offset: 356,
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
          boundingBox: [557, 1385, 555, 1429, 512, 1427, 514, 1383],
        },
      ],
      content: 'UNI QLO',
      spans: [
        {
          offset: 598,
          length: 7,
        },
      ],
      confidence: 0.995,
    },
    vendorAddress: {
      kind: 'string',
      value: '38, 2, SAL 1161 København, DK',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [175, 311, 424, 311, 424, 355, 175, 355],
        },
      ],
      content: '38, 2, SAL 1161 København, DK',
      spans: [
        {
          offset: 72,
          length: 10,
        },
        {
          offset: 91,
          length: 18,
        },
      ],
      confidence: 0.995,
    },
    vendorAddressRecipient: {
      kind: 'string',
      value: 'UNIQLO',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [197, 289, 267, 289, 267, 310, 197, 308],
        },
      ],
      content: 'UNIQLO',
      spans: [
        {
          offset: 43,
          length: 6,
        },
      ],
      confidence: 0.995,
    },
    invoiceTotal: {
      kind: 'number',
      value: 24800,
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [410, 719, 480, 718, 480, 738, 410, 738],
        },
      ],
      content: '248,00',
      spans: [
        {
          offset: 242,
          length: 6,
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
              value: 19900,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [396, 465, 487, 465, 487, 486, 396, 486],
                },
              ],
              content: '199,00 T',
              spans: [
                {
                  offset: 168,
                  length: 8,
                },
              ],
              confidence: 0.739,
            },
            description: {
              kind: 'string',
              value: "4420140465100 W's sweater",
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [41, 466, 197, 466, 197, 510, 41, 510],
                },
              ],
              content: "4420140465100 W's sweater",
              spans: [
                {
                  offset: 150,
                  length: 13,
                },
                {
                  offset: 177,
                  length: 11,
                },
              ],
              confidence: 0.512,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [41, 465, 487, 465, 487, 510, 41, 510],
            },
          ],
          content: "4420140465100 x 1 199,00 T W's sweater",
          spans: [
            {
              offset: 150,
              length: 38,
            },
          ],
          confidence: 0.677,
        },
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 4900,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [395, 572, 475, 572, 475, 593, 395, 593],
                },
              ],
              content: '49,00 T',
              spans: [
                {
                  offset: 207,
                  length: 7,
                },
              ],
              confidence: 0.78,
            },
            description: {
              kind: 'string',
              value: "4562014046510 PW's pants",
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [43, 572, 196, 573, 196, 617, 43, 617],
                },
              ],
              content: "4562014046510 PW's pants",
              spans: [
                {
                  offset: 189,
                  length: 13,
                },
                {
                  offset: 223,
                  length: 10,
                },
              ],
              confidence: 0.552,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [43, 571, 557, 572, 557, 631, 43, 629],
            },
          ],
          content: "4562014046510 x 1 49,00 T UNI QLO PW's pants",
          spans: [
            {
              offset: 189,
              length: 44,
            },
          ],
          confidence: 0.709,
        },
      ],
    },
  },
};
export default { data };
