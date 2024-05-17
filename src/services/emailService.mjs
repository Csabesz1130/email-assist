import { Router } from 'express';
import * as CalendarService from '../services/calendarService.mjs';
import { authenticateToken } from '../utils/authHelpers.mjs';

const router = Router();

router.get('/events', authenticateToken, async (req, res) => {
  try {
    const events = await CalendarService.getEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/events', authenticateToken, async (req, res) => {
  try {
    const newEvent = await CalendarService.createEvent(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/events/:id', authenticateToken, async (req, res) => {
  try {
    const updatedEvent = await CalendarService.updateEvent(req.params.id, req.body);
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/events/:id', authenticateToken, async (req, res) => {
  try {
    await CalendarService.deleteEvent(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// New route to handle user preferences
router.post('/user/preferences', authenticateToken, async (req, res) => {
  try {
    const { emailNotifications, theme } = req.body;
    // Save preferences to the database (this is a placeholder, replace with actual implementation)
    // Example: await UserPreferences.update({ userId: req.userId, emailNotifications, theme });
    res.status(200).json({ message: 'Preferences saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
