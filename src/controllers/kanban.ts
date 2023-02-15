import { messages } from "../utils";

export const getColumns = async (req: any, res: any) => {
  try {
    const columnsData = require("../data/kanban-columns");
    return res.status(200).json({
      columns: columnsData,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const getColumnsOrder = async (req: any, res: any) => {
  try {
    const columnsOrderData = require("../data/kanban-columns-order");
    return res.status(200).json({
      columnsOrder: columnsOrderData,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const getComments = async (req: any, res: any) => {
  try {
    const commentsData = require("../data/kanban-comments");
    return res.status(200).json({
      comments: commentsData,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const getProfiles = async (req: any, res: any) => {
  try {
    const profilesData = require("../data/kanban-profiles");
    return res.status(200).json({
      profiles: profilesData,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const getItems = async (req: any, res: any) => {
  try {
    const itemsData = require("../data/kanban-items");
    return res.status(200).json({
      items: itemsData,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const getUserstory = async (req: any, res: any) => {
  try {
    const userStoryData = require("../data/kanban-userstory");
    return res.status(200).json({
      userStory: userStoryData,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const getUserstoryOrder = async (req: any, res: any) => {
  try {
    const userStoryOrderData = require("../data/kanban-userstory-order");
    return res.status(200).json({
      userStoryOrder: userStoryOrderData,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const addColumn = async (req: any, res: any) => {
  try {
    const { column, columns, columnsOrder } = req.body;
    const result = {
      columns: [...columns, column],
      columnsOrder: [...columnsOrder, column.id],
    };

    return res.status(200).json({
      ...result,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const editColumn = async (req: any, res: any) => {
  try {
    const { column, columns } = req.body;
    columns.splice(
      columns.findIndex((c: any) => c.id === column.id),
      1,
      column
    );

    return res.status(200).json({
      columns,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const updateColumnOrder = async (req: any, res: any) => {
  try {
    const { columnsOrder } = req.body;
    return res.status(200).json({
      columnsOrder,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const deleteColumn = async (req: any, res: any) => {
  try {
    const { columnId, columnsOrder, columns } = req.body;

    columns.splice(
      columns.findIndex((column: any) => column.id === columnId),
      1
    );

    columnsOrder.splice(
      columnsOrder.findIndex((cId: string) => cId === columnId),
      1
    );

    return res.status(200).json({
      columns,
      columnsOrder,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const addItem = async (req: any, res: any) => {
  try {
    const { columnId, columns, item, items, storyId, userStory } = req.body;

    let newColumn = columns;
    if (columnId !== "0") {
      newColumn = columns.map((column: any) => {
        if (column.id === columnId) {
          return {
            ...column,
            itemIds: column.itemIds ? [...column.itemIds, item.id] : [item.id],
          };
        }
        return column;
      });
    }

    let newUserStory = userStory;
    if (storyId !== "0") {
      newUserStory = userStory.map((story: any) => {
        if (story.id === storyId) {
          return {
            ...story,
            itemIds: story.itemIds ? [...story.itemIds, item.id] : [item.id],
          };
        }
        return story;
      });
    }

    const result = {
      items: [...items, item],
      columns: newColumn,
      userStory: newUserStory,
    };

    return res.status(200).json({
      ...result,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const editItem = async (req: any, res: any) => {
  try {
    const { items, item, userStory, storyId, columns, columnId } = req.body;

    items.splice(
      items.findIndex((i: any) => i.id === item.id),
      1,
      item
    );

    let newUserStory = userStory;
    if (storyId) {
      const currentStory = userStory.filter(
        (story: any) =>
          story.itemIds.filter((itemId: string) => itemId === item.id)[0]
      )[0];
      if (currentStory !== undefined && currentStory.id !== storyId) {
        newUserStory = userStory.map((story: any) => {
          if (story.itemIds.filter((itemId: string) => itemId === item.id)[0]) {
            return {
              ...story,
              itemIds: story.itemIds.filter(
                (itemId: string) => itemId !== item.id
              ),
            };
          }
          if (story.id === storyId) {
            return {
              ...story,
              itemIds: story.itemIds ? [...story.itemIds, item.id] : [item.id],
            };
          }
          return story;
        });
      }

      if (currentStory === undefined) {
        newUserStory = userStory.map((story: any) => {
          if (story.id === storyId) {
            return {
              ...story,
              itemIds: story.itemIds ? [...story.itemIds, item.id] : [item.id],
            };
          }
          return story;
        });
      }
    }

    let newColumn = columns;
    if (columnId) {
      const currentColumn = columns.filter(
        (column: any) =>
          column.itemIds.filter((itemId: string) => itemId === item.id)[0]
      )[0];
      if (currentColumn !== undefined && currentColumn.id !== columnId) {
        newColumn = columns.map((column: any) => {
          if (
            column.itemIds.filter((itemId: string) => itemId === item.id)[0]
          ) {
            return {
              ...column,
              itemIds: column.itemIds.filter(
                (itemId: string) => itemId !== item.id
              ),
            };
          }
          if (column.id === columnId) {
            return {
              ...column,
              itemIds: column.itemIds
                ? [...column.itemIds, item.id]
                : [item.id],
            };
          }
          return column;
        });
      }

      if (currentColumn === undefined) {
        newColumn = columns.map((column: any) => {
          if (column.id === columnId) {
            return {
              ...column,
              itemIds: column.itemIds
                ? [...column.itemIds, item.id]
                : [item.id],
            };
          }
          return column;
        });
      }
    }

    const result = {
      items,
      columns: newColumn,
      userStory: newUserStory,
    };

    return res.status(200).json({
      ...result,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const updateItemOrder = async (req: any, res: any) => {
  try {
    const { columns } = req.body;

    return res.status(200).json({
      columns,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const selectItem = async (req: any, res: any) => {
  try {
    const { selectedItem } = req.body;
    return res.status(200).json({
      selectedItem,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const addItemComment = async (req: any, res: any) => {
  try {
    const { items, itemId, comment, comments } = req.body;

    const newItems = items.map((item: any) => {
      if (item.id === itemId) {
        return {
          ...item,
          commentIds: item.commentIds
            ? [...item.commentIds, comment.id]
            : [comment.id],
        };
      }
      return item;
    });

    const result = {
      items: newItems,
      comments: [...comments, comment],
    };

    return res.status(200).json({
      ...result,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const deleteItem = async (req: any, res: any) => {
  try {
    const { columns, itemId, userStory, items } = req.body;

    const newColumn = columns.map((column: any) => {
      const itemIds = column.itemIds.filter((id: string) => id !== itemId);
      return {
        ...column,
        itemIds,
      };
    });

    const newUserStory = userStory.map((story: any) => {
      const itemIds = story.itemIds.filter((id: string) => id !== itemId);
      return {
        ...story,
        itemIds,
      };
    });

    items.splice(
      items.findIndex((item: any) => item.id === itemId),
      1
    );

    const result = {
      items,
      columns: newColumn,
      userStory: newUserStory,
    };

    return res.status(200).json({
      ...result,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const addStory = async (req: any, res: any) => {
  try {
    const { userStory, story, userStoryOrder } = req.body;

    const result = {
      userStory: [...userStory, story],
      userStoryOrder: [...userStoryOrder, story.id],
    };

    return res.status(200).json({
      ...result,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const editStory = async (req: any, res: any) => {
  try {
    const { userStory, story } = req.body;

    userStory.splice(
      userStory.findIndex((s: any) => s.id === story.id),
      1,
      story
    );

    const result = {
      userStory,
    };

    return res.status(200).json({
      ...result,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const updateStoryOrder = async (req: any, res: any) => {
  try {
    const { userStoryOrder } = req.body;
    return res.status(200).json({
      userStoryOrder,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const updateStoryitemOrder = async (req: any, res: any) => {
  try {
    const { userStory } = req.body;
    return res.status(200).json({
      userStory,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const addStoryComment = async (req: any, res: any) => {
  try {
    const { userStory, storyId, comment, comments } = req.body;

    const newUserStory = userStory.map((story: any) => {
      if (story.id === storyId) {
        return {
          ...story,
          commentIds: story.commentIds
            ? [...story.commentIds, comment.id]
            : [comment.id],
        };
      }
      return story;
    });

    const result = {
      userStory: newUserStory,
      comments: [...comments, comment],
    };

    return res.status(200).json({
      ...result,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};

export const deleteStory = async (req: any, res: any) => {
  try {
    const { userStory, storyId, userStoryOrder } = req.body;

    userStory.splice(
      userStory.findIndex((story: any) => story.id === storyId),
      1
    );

    userStoryOrder.splice(
      userStoryOrder.findIndex((s: string) => s === storyId),
      1
    );

    const result = {
      userStory,
      userStoryOrder,
    };

    return res.status(200).json({
      ...result,
    });
  } catch (err) {
    return res.status(500).json({
      message: messages.errorMessages.serverError,
    });
  }
};
