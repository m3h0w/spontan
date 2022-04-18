export const parseDate = (date: string) => {
  let parts = date.split('/');
  if (parts.length <= 1) {
    parts = date.split('-');
  }
  if (parts.length <= 1) {
    parts = date.split('.');
  }
  if (parts.length <= 1) {
    throw new Error('Failed parsing date');
  }
  return new Date(
    parseInt(parts[2], 10),
    parseInt(parts[0], 10) - 1,
    parseInt(parts[1], 10),
  );
};

export const testReceiptIdFromSource = (source: string) => {
  const n = source.split('/');
  const n1 = n[n.length - 1];
  return n1.split('.')[0];
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
const getLongestString = (input: string[]) => {
  return input.sort(function (a, b) {
    return b.length - a.length;
  })[0];
};

const expectedBrands = {
  Uniqlo: ['uni', 'qlo'],
  Ganni: ['gia', 'nni'],
};

const nameFromExpectedBrands = (string: string) => {
  const r = Object.entries(expectedBrands).map(([key, array]) => {
    if (array.some(v => string.toLowerCase().includes(v))) {
      return key;
    }
  });
  const arrays = r.filter(v => v);
  if (arrays.length > 1) {
    throw new Error('More than 1 brand detected');
  }
  return arrays[0];
};

const numberPattern = /\d+/g;
const extractSkuNumbers = (lineItems: any[]) => {
  return lineItems.map((li: any) => {
    if (!li.description) {
      return li;
    }
    const numbers = li.description.match(numberPattern);
    if (!numbers) {
      return li;
    }
    const longestNumber = getLongestString(numbers);
    if (numbers.length && longestNumber.length > 8) {
      li.SKU = Number(longestNumber);
    }
    return li;
  });
};

const applyDiscounts = (lineItems: any[]) => {
  const indicesToRemove = [];
  for (let index = 0; index < lineItems.length; index++) {
    if (index !== 0) {
      if (lineItems[index].price < 0) {
        lineItems[index - 1].price =
          Math.round(
            (lineItems[index - 1].price + lineItems[index].price) * 10,
          ) / 10;
        indicesToRemove.push(index);
      }
    }
  }
  indicesToRemove.sort(function (a, b) {
    return b - a;
  });

  for (var i = indicesToRemove.length - 1; i >= 0; i--)
    lineItems.splice(indicesToRemove[i], 1);

  return lineItems;
};

const parseReceiptData = (receiptData: any) => {
  const name = nameFromExpectedBrands(receiptData.vendorName?.value);

  let date;
  if (receiptData.invoiceDate?.value) {
    date = new Date(receiptData.invoiceDate?.value);
  } else {
    date = parseDate(receiptData.invoiceDate?.content);
  }

  const parsePrice = (content: string) => {
    return Number(
      content.replace(',', '.').replace(' T', '').replace(' N', ''),
    );
  };

  const parsedData = {
    vendorName: name ?? capitalizeFirstLetter(receiptData.vendorName?.value),
    date,
    lineItems: receiptData.items
      ? receiptData.items?.values
          .map((i: any) => ({
            description: i.properties.description?.value,
            price: i.properties.amount?.content
              ? parsePrice(i.properties.amount?.content)
              : undefined,
          }))
          .filter((v: any) => v.price)
      : [],
  };

  parsedData.lineItems = extractSkuNumbers(parsedData.lineItems);
  parsedData.lineItems = applyDiscounts(parsedData.lineItems);

  return parsedData;
};

export type ReceiptDataParsed = {
  vendorName?: string;
  date: Date;
  lineItems: {
    description?: string;
    price?: number;
    SKU?: number;
  }[];
};

export default parseReceiptData;
