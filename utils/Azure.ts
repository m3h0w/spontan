import Constants from 'expo-constants';
import {
  AzureKeyCredential,
  DocumentAnalysisClient,
  PrebuiltModels,
} from '@azure/ai-form-recognizer';
import { testResponse } from './testResponse';

const endpoint = Constants.manifest?.extra?.azureEndpoint;
const apiKey = Constants.manifest?.extra?.azureApiKey;

async function Analyze(uri: string, localUri?: boolean) {
  const client = new DocumentAnalysisClient(
    endpoint,
    new AzureKeyCredential(apiKey),
  );

  const getLocalBlob = async (uri: string) => {
    const resp = await fetch(uri);
    const blob = await resp.blob();
    return blob;
  };

  const poller = await client.beginAnalyzeDocuments(
    PrebuiltModels.Invoice,
    localUri ? await getLocalBlob(uri) : uri,
  );

  const {
    documents: [result],
  } = await poller.pollUntilDone();

  if (result) {
    const invoice = result.fields;

    console.log('Vendor Name:', invoice.vendorName?.value);
    console.log('Customer Name:', invoice.customerName?.value);
    console.log('Invoice Date:', invoice.invoiceDate?.value);
    console.log('invoice date content:', invoice.invoiceDate?.content);
    console.log('Due Date:', invoice.dueDate?.value);

    console.log('Items:');
    for (const { properties: item } of invoice.items?.values ?? []) {
      console.log('-', item.productCode?.value ?? '<no product code>');
      console.log('  Description:', item.description?.value);
      console.log('  Quantity:', item.quantity?.value);
      console.log('  Date:', item.date?.value);
      console.log('  Unit:', item.unit?.value);
      console.log('  Unit Price:', item.unitPrice?.value);
      console.log('  Tax:', item.tax?.value);
      console.log('  Amount:', item.amount?.value);
    }

    console.log('Subtotal:', invoice.subTotal?.value);
    console.log(
      'Previous Unpaid Balance:',
      invoice.previousUnpaidBalance?.value,
    );
    console.log('Tax:', invoice.totalTax?.value);
    console.log('Amount Due:', invoice.amountDue?.value);

    console.log({ invoice });

    return invoice;
  } else {
    throw new Error('Expected at least one receipt in the result.');
  }
}

export const AzureTest = async (): Promise<typeof testResponse> => {
  return testResponse;
};

export default Analyze;
