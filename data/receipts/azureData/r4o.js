export const data = {
  receiptData: {
    invoiceId: {
      kind: 'string',
      value: '4388',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [1502, 2741, 1638, 2740, 1639, 2804, 1502, 2805],
        },
      ],
      content: '4388',
      spans: [
        {
          offset: 468,
          length: 4,
        },
      ],
      confidence: 0.995,
    },
    invoiceDate: {
      kind: 'date',
      value: '2022-03-12T00:00:00.000Z',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [868, 3717, 1192, 3742, 1187, 3813, 867, 3785],
        },
      ],
      content: '03/12/2022',
      spans: [
        {
          offset: 622,
          length: 10,
        },
      ],
      confidence: 0.995,
    },
    vendorName: {
      kind: 'string',
      value: 'UNI UNIQLO QLO',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [903, 459, 1513, 434, 1518, 572, 909, 597],
        },
      ],
      content: 'UNI UNIQLO QLO',
      spans: [
        {
          offset: 15,
          length: 10,
        },
        {
          offset: 31,
          length: 3,
        },
      ],
      confidence: 0.995,
    },
    vendorAddress: {
      kind: 'string',
      value: '3251 TWENTIETH AVE SPACE #148 SAN FRANCISCO, CA 94132',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [1168, 851, 1904, 809, 1916, 1007, 1179, 1049],
        },
      ],
      content: '3251 TWENTIETH AVE SPACE #148 SAN FRANCISCO, CA 94132',
      spans: [
        {
          offset: 108,
          length: 53,
        },
      ],
      confidence: 0.995,
    },
    vendorAddressRecipient: {
      kind: 'string',
      value: 'UNIQLO STONESTOWN GALLERIA',
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [1123, 787, 1939, 737, 1943, 797, 1126, 846],
        },
      ],
      content: 'UNIQLO STONESTOWN GALLERIA',
      spans: [
        {
          offset: 81,
          length: 26,
        },
      ],
      confidence: 0.995,
    },
    subTotal: {
      kind: 'number',
      value: 6.9,
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [1976, 1458, 2104, 1460, 2103, 1522, 1975, 1519],
        },
      ],
      content: '6.90',
      spans: [
        {
          offset: 263,
          length: 4,
        },
      ],
      confidence: 0.995,
    },
    totalTax: {
      kind: 'number',
      value: 0.6,
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [2002, 1683, 2134, 1683, 2134, 1744, 2002, 1745],
        },
      ],
      content: '0.60',
      spans: [
        {
          offset: 293,
          length: 4,
        },
      ],
      confidence: 0.995,
    },
    invoiceTotal: {
      kind: 'number',
      value: 7.5,
      boundingRegions: [
        {
          pageNumber: 1,
          boundingBox: [1937, 1828, 2069, 1833, 2067, 1895, 1935, 1889],
        },
      ],
      content: '7.50',
      spans: [
        {
          offset: 315,
          length: 4,
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
              value: 6.9,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [1942, 1158, 2081, 1157, 2079, 1223, 1942, 1223],
                },
              ],
              content: '6.90',
              spans: [
                {
                  offset: 200,
                  length: 4,
                },
              ],
              confidence: 0.395,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [1394, 1176, 2081, 1153, 2083, 1223, 1396, 1246],
            },
          ],
          content: '× 1 6.90',
          spans: [
            {
              offset: 196,
              length: 8,
            },
          ],
          confidence: 0.156,
        },
        {
          kind: 'object',
          properties: {
            description: {
              kind: 'string',
              value: '2000155521731',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [906, 1209, 1300, 1188, 1303, 1247, 912, 1268],
                },
              ],
              content: '2000155521731',
              spans: [
                {
                  offset: 182,
                  length: 13,
                },
              ],
              confidence: 0.603,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [906, 1209, 1300, 1188, 1303, 1247, 912, 1268],
            },
          ],
          content: '2000155521731',
          spans: [
            {
              offset: 182,
              length: 13,
            },
          ],
          confidence: 0.121,
        },
        {
          kind: 'object',
          properties: {
            amount: {
              kind: 'number',
              value: 0.6,
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [1684, 1309, 1812, 1309, 1812, 1368, 1684, 1369],
                },
              ],
              content: '0.60',
              spans: [
                {
                  offset: 237,
                  length: 4,
                },
              ],
              confidence: 0.379,
            },
            description: {
              kind: 'string',
              value: 'Boxer briefs',
              boundingRegions: [
                {
                  pageNumber: 1,
                  boundingBox: [898, 1277, 1263, 1259, 1266, 1319, 901, 1337],
                },
              ],
              content: 'Boxer briefs',
              spans: [
                {
                  offset: 207,
                  length: 12,
                },
              ],
              confidence: 0.6,
            },
          },
          boundingRegions: [
            {
              pageNumber: 1,
              boundingBox: [898, 1277, 1808, 1232, 1815, 1368, 905, 1413],
            },
          ],
          content: 'Boxer briefs 0.60',
          spans: [
            {
              offset: 207,
              length: 12,
            },
            {
              offset: 237,
              length: 4,
            },
          ],
          confidence: 0.43,
        },
      ],
    },
  },
};
export default { data };
