import Event from '../models/eventModel.mjs';

export const getEvents = async () => {
  try {
    const events = await Event.find({});
    return events;
  } catch (error) {
    throw new Error('Failed to fetch events');
  }
};

export const getEventById = async (eventId) => {
  try {
    const event = await Event.findById(eventId);

    if (!event) {
      throw new Error('Event not found');
    }

    return event;
  } catch (error) {
    throw new Error('Failed to fetch event');
  }
};

export const createEvent = async (eventData) => {
  try {
    const newEvent = await Event.create(eventData);
    return newEvent;
  } catch (error) {
    throw new Error('Failed to create event');
  }
};

export const updateEvent = async (eventId, updateData) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, updateData, { new: true });

    if (!updatedEvent) {
      throw new Error('Event not found');
    }

    return updatedEvent;
  } catch (error) {
    throw new Error('Failed to update event');
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      throw new Error('Event not found');
    }

    return deletedEvent;
  } catch (error) {
    throw new Error('Failed to delete event');
  }
};
