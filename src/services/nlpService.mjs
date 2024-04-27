import { LanguageServiceClient } from '@google-cloud/language';

const client = new LanguageServiceClient();

async function analyzeText(text) {
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  const [result] = await client.analyzeEntities({ document });
  const entities = result.entities;

  const eventDetails = {
    title: entities.find(entity => ['WORK_OF_ART', 'EVENT'].includes(entity.type))?.name || '',
    date: entities.find(entity => entity.type === 'DATE')?.name || '',
    time: entities.find(entity => entity.type === 'TIME')?.name || '',
    location: entities.find(entity => entity.type === 'LOCATION')?.name || '',
    attendees: entities.filter(entity => entity.type === 'PERSON').map(person => person.name),
    links: extractLinksFromText(text),
  };

  return eventDetails;
}

function extractLinksFromText(text) {
  const linkRegex = /https?:\/\/[^\s]+/g;
  return text.match(linkRegex) || [];
}

function generateNotesFromEntities(entities) {
  const notes = entities.map(entity => {
    if (entity.type === 'DATE') {
      return `Event date: ${entity.name}`;
    } else if (entity.type === 'TIME') {
      return `Event time: ${entity.name}`;
    } else if (entity.type === 'LOCATION') {
      return `Event location: ${entity.name}`;
    } else if (entity.type === 'PERSON') {
      return `Attendee: ${entity.name}`;
    } else if (['WORK_OF_ART', 'EVENT'].includes(entity.type)) {
      return `Event title: ${entity.name}`;
    } else {
      return `${entity.name} (${entity.type})`;
    }
  });

  return notes.join('\n');
}

// Function to extract event details
export async function extractEventDetails(emailText) {
  if (!emailText || typeof emailText !== 'string') {
    throw new Error('Invalid email text provided.');
  }

  try {
    const eventInformation = await analyzeText(emailText);
    const notes = generateNotesFromEntities(eventInformation.entities);

    return {
      ...eventInformation,
      notes,
    };
  } catch (error) {
    console.error('Error extracting event details:', error);
    throw error;
  }
}
