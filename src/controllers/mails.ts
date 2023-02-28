import { messages } from "../utils";

export const getEmailsList = async (req: any, res: any) => {
  try {
    const mails = require("../data/mails");
    const getInboxMails = () => mails.filter((item: any) => !item.spam);
    const getSentMails = () => mails.filter((item: any) => item.sent);
    const getDraftMails = () => mails.filter((item: any) => item.draft);
    const getSpamMails = () => mails.filter((item: any) => item.spam);
    const getTrashMails = () => mails.filter((item: any) => item.trash);
    const getStarredMails = () => mails.filter((item: any) => item.starred);
    const getImportantMails = () => mails.filter((item: any) => item.important);
    const getPromotionsMails = () =>
      mails.filter((item: any) => item.promotions);
    const getForumMails = () => mails.filter((item: any) => item.forums);
    return res.status(200).json({
      mails,
      unreadCount: {
        all: mails.filter((i: any) => !i.isRead).length,
        inbox: getInboxMails().filter((i: any) => !i.isRead).length,
        sent: getSentMails().filter((i: any) => !i.isRead).length,
        draft: getDraftMails().filter((i: any) => !i.isRead).length,
        spam: getSpamMails().filter((i: any) => !i.isRead).length,
        trash: getTrashMails().filter((i: any) => !i.isRead).length,
        starred: getStarredMails().filter((i: any) => !i.isRead).length,
        important: getImportantMails().filter((i: any) => !i.isRead).length,
        promotions: getPromotionsMails().filter((i: any) => !i.isRead).length,
        forums: getForumMails().filter((i: any) => !i.isRead).length,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const setRead = async (req: any, res: any) => {
  try {
    const { id } = req.body;
    let mails = require("../data/mails");
    const mailIndex = mails.findIndex((i: any) => i.id === id);
    mails[mailIndex] = { ...mails[mailIndex], isRead: true };
    mails = [...mails];
    return res.status(200).json([]);
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const setImportant = async (req: any, res: any) => {
  try {
    const { id } = req.body;
    let mails = require("../data/mails");
    const mailIndex = mails.findIndex((i: any) => i.id === id);
    mails[mailIndex] = {
      ...mails[mailIndex],
      important: !mails[mailIndex].important,
    };
    mails = [...mails];
    return res.status(200).json([]);
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const setStarred = async (req: any, res: any) => {
  try {
    const { id } = req.body;
    let mails = require("../data/mails");
    const mailIndex = mails.findIndex((i: any) => i.id === id);
    mails[mailIndex] = {
      ...mails[mailIndex],
      starred: !mails[mailIndex].starred,
    };
    mails = [...mails];
    return res.status(200).json([]);
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const filter = async (req: any, res: any) => {
  try {
    const { filter } = req.body;
    const mails = require("../data/mails");
    const getInboxMails = () => mails.filter((item: any) => !item.spam);
    const getSentMails = () => mails.filter((item: any) => item.sent);
    const getDraftMails = () => mails.filter((item: any) => item.draft);
    const getSpamMails = () => mails.filter((item: any) => item.spam);
    const getTrashMails = () => mails.filter((item: any) => item.trash);
    const getStarredMails = () => mails.filter((item: any) => item.starred);
    const getImportantMails = () => mails.filter((item: any) => item.important);
    const getPromotionsMails = () =>
      mails.filter((item: any) => item.promotions);
    const getForumMails = () => mails.filter((item: any) => item.forums);

    let result = [];
    switch (filter) {
      case "inbox":
        result = getInboxMails();
        break;
      case "sent":
        result = getSentMails();
        break;
      case "draft":
        result = getDraftMails();
        break;
      case "spam":
        result = getSpamMails();
        break;
      case "trash":
        result = getTrashMails();
        break;
      case "starred":
        result = getStarredMails();
        break;
      case "important":
        result = getImportantMails();
        break;
      case "promotions":
        result = getPromotionsMails();
        break;
      case "forums":
        result = getForumMails();
        break;
      case "all":
      default:
        result = mails;
        break;
    }

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};
