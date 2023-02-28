import express from "express";
import { calendarController } from "../controllers";
import { authenticateJWT } from "../middleware/auth";
const router = express.Router();

router.get("/events", authenticateJWT, calendarController.getEvents);
router.post("/events/new", authenticateJWT, calendarController.newEvents);
router.post("/events/update", authenticateJWT, calendarController.updateEvent);
router.post("/events/remove", authenticateJWT, calendarController.removeEvent);

export = router;
