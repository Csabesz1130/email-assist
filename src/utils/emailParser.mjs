import { simpleParser } from 'mailparser';
import fs from 'fs';

export async function parseEmail(emailContent) {
  try {
    const parsedEmail = await simpleParser(emailContent);
    return parsedEmail.text || parsedEmail.html;
  } catch (error) {
    console.error('Error parsing email:', error);
    throw error;
  }
}