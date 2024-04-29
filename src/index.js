import { readFile } from 'fs/promises';
import { join } from 'path';
import { extractEventDetails } from './services/nlpService.mjs';
import { parseEmail } from './utils/emailParser.mjs';
import { storeEventDetails } from './models/eventModel.mjs';

async function main() {
  try {
    const emailPath = 'path/to/email.eml';
    const emailText = await readFile(emailPath, 'utf-8');
    const emailParseResult = parseEmail(emailText);
    if (emailParseResult.errors.length > 0) {
      console.error('Error in email parsing process:', emailParseResult.errors);
      return;
    }
    const eventDetails = await extractEventDetails(emailParseResult.text);
    await storeEventDetails(eventDetails);
    console.log('Event extraction and storage process completed successfully.');
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

main();