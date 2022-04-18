import parseReceiptData, { parseDate } from 'utils/parseReceiptData';

const cases = [1, 2, 3, 4, 5, 6, 7, 8];

describe(`all is amazing`, () => {
  cases.forEach(c => {
    const expectedOutput = require(`./receipts/r${c}`).output;
    const azureData = require(`./receipts/r${c}o`).data.receiptData;
    const parsedData = parseReceiptData(azureData);

    it(`Vendor name ${c}:`, () => {
      expect(parsedData.vendorName.toLowerCase()).toBe(
        expectedOutput.brandName.toLowerCase(),
      );
    });

    it(`Date ${c}:`, () => {
      // it's important to use toDateString() because other methods
      // will try to be smart and covert the time based on timezone differences
      expect(parsedData.date.toDateString()).toBe(
        parseDate(expectedOutput.date).toDateString(),
      );
    });

    it(`Line items ${c}:`, () => {
      expectedOutput.lineItems.forEach((li: any, i: number) => {
        expect(parsedData.lineItems[i].price).toBe(li.price);
        if (li.SKU) {
          expect(parsedData.lineItems[i].SKU).toBe(li.SKU);
        }
        if (li.description) {
          expect(parsedData.lineItems[i].description).toBe(li.description);
        }
      });
    });
  });
});
