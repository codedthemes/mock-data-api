import { v4 as UIDV4 } from "uuid";
import fs from "fs";
import _ from "lodash";
import { messages } from "../utils";

export const getEvents = async (req: any, res: any) => {
  try {
    const events = require("../data/calendar-events");
    return res.status(200).json({
      events,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const newEvents = async (req: any, res: any) => {
  try {
    const { allDay, description, color, textColor, end, start, title } =
      req.body;
    let events = require("../data/calendar-events");
    const event = {
      id: UIDV4(),
      allDay,
      description,
      color,
      textColor,
      end,
      start,
      title,
    };

    events = [...events, event];
    await fs.writeFile(
      "src/data/calendar-events.json",
      JSON.stringify(events),
      async (err) => {
        if (err) throw err;
        return res.status(200).json(events);
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const updateEvent = async (req: any, res: any) => {
  try {
    const { eventId, update } = req.body;
    let events = require("../data/calendar-events");

    events = _.map(events, (_event) => {
      if (_event.id === eventId) {
        _.assign(_event, { ...update });
      }
      return _event;
    });

    await fs.writeFile(
      "src/data/calendar-events.json",
      JSON.stringify(events),
      async (err) => {
        if (err) throw err;
        return res.status(200).json({ events });
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const removeEvent = async (req: any, res: any) => {
  try {
    const { eventId } = req.body;
    let events = require("../data/calendar-events");
    events = _.reject(events, { id: eventId });

    await fs.writeFile(
      "src/data/calendar-events.json",
      JSON.stringify(events),
      async (err) => {
        if (err) throw err;
        return res.status(200).json(events);
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};
