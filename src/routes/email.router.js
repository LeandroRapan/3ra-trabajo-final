import { Router } from "express";
import { sendGmail, sendMailEthereal } from "../02-controllers/email.controllers.js";
const router = Router();
router.post('/send', sendMailEthereal);
router.post('/gmail', sendGmail)

export default router;