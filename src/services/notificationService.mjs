import { sendEmail } from './emailService.mjs';  // Assuming this function is implemented to send emails

export async function sendNotification(user, message) {
  try {
    if (user.preferences.emailNotifications) {
      await sendEmail(user.email, 'Notification', message);
    }
    // Extend this to handle push notifications if required
    console.log('Notification sent to:', user.email);
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
}
