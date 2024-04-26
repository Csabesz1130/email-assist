// Import the necessary NLP library or API client
import { LanguageServiceClient } from '@google-cloud/language';

// Instantiate the client for Google Natural Language API
const client = new LanguageServiceClient();

async function analyzeText(text) {
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  const [result] = await client.analyzeEntities({document});
  const entities = result.entities;

  const eventDetails = {
    title: entities.filter(entity => entity.type === 'WORK_OF_ART')[0]?.name,
    date: entities.filter(entity => entity.type === 'DATE')[0]?.name,
    time: entities.filter(entity => entity.type === 'TIME')[0]?.name,
    location: entities.filter(entity => entity.type === 'LOCATION')[0]?.name,
    attendees: entities.filter(entity => entity.type === 'PERSON').map(person => person.name),
    links: extractLinksFromText(text) // Include extracted links
  };

  return eventDetails;
}

// Function to extract event details
export async function extractEventDetails(emailText) {
  try {
    const eventInformation = await analyzeText(emailText);
    // Here, you could add additional logic to refine or validate event details
    return eventInformation;
  } catch (error) {
    console.error('The API returned an error: ' + error);
    throw error;
  }
}

function extractLinksFromText(text) {
  const linkRegex = /https?:\/\/[^\s]+/g;
  return text.match(linkRegex) || [];
}
