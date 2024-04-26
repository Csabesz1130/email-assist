import { LanguageServiceClient } from '@google-cloud/language';

const client = new LanguageServiceClient();

async function analyzeText(text) {
  const [result] = await client.analyzeEntities({ document: { content: text, type: 'PLAIN_TEXT' } });
  return result.entities;
}

async function extractEventDetails(emailText) {
  const entities = await analyzeText(emailText);
  const title = entities.find(entity => entity.type === 'EVENT')?.name || '';
  const date = entities.find(entity => entity.type === 'DATE')?.name || '';
  const time = entities.find(entity => entity.type === 'TIME')?.name || '';
  const location = entities.find(entity => entity.type === 'LOCATION')?.name || '';
  const attendees = entities.filter(entity => entity.type === 'PERSON').map(entity => entity.name);
  const links = extractLinksFromText(emailText); // New function to extract links

  return {
    title,
    date,
    time,
    location,
    attendees,
    links // Include extracted links in the return object
  };
}

function generateNotesFromEntities(entities) {
  return entities.map(entity => `${entity.name} is a ${entity.type.toLowerCase()}`).join('\n');
}

function extractLinksFromText(text) {
  const linkRegex = /https?:\/\/[^\s]+/g;
  return text.match(linkRegex) || [];
}

export { extractEventDetails };
