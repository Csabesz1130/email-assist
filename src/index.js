import { extractEventDetails } from './services/nlpService.mjs';
import { parseEmail } from './utils/emailParser.mjs';
import { storeEventDetails } from './models/eventModel.mjs';

async function main() {
  try {
    const emailText = await parseEmail('path/to/email.eml');
    const eventDetails = await extractEventDetails(emailText);
    await storeEventDetails(eventDetails);
    console.log('Event extraction and storage process completed successfully.');
  } catch (error) {
    console.error('Error in event extraction process:', error);
  }
}

main();