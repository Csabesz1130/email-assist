import { LanguageServiceClient } from '@google-cloud/language';

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

function generateNotesFromEntities(entities) {
  return entities.map(entity => `${entity.name} is a ${entity.type.toLowerCase()}`).join('\n');
}

async function extractEventDetails(emailText) {
  const entities = await analyzeText(emailText);
  const title = entities.find(entity => entity.type === 'EVENT')?.name || '';
  const date = entities.find(entity => entity.type === 'DATE')?.name || '';
  const time = entities.find(entity => entity.type === 'TIME')?.name || '';
  const location = entities.find(entity => entity.type === 'LOCATION')?.name || '';
  const attendees = entities.filter(entity => entity.type === 'PERSON').map(entity => entity.name);
  const links = extractLinksFromText(emailText);
  const notes = generateNotesFromEntities(entities); // Generate notes from entities

  return {
    title,
    date,
    time,
    location,
    attendees,
    links,
    notes  // Include AI-generated notes
  };
}

export { extractEventDetails };
