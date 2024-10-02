export const userValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 20,
      },
    },
    notEmpty: true,
  },
  password: {
    isLength: {
      options: {
        min: 8,
        max: 20,
      },
    },
    notEmpty: true,
  },
};
export const boardValidationSchema = {
  name: {
    isLength: {
      options: {
        min: 5,
        max: 20,
      },
    },
    notEmpty: true,
  },
  "columns.*": {
    isLength: {
      options: {
        min: 5,
        max: 20,
      },
    },
    notEmpty: true,
  },
};
export const columnValidationSchema = {
  name: {
    isLength: {
      options: {
        min: 5,
        max: 20,
      },
    },
    notEmpty: true,
  },
  boardId: {
    isMongoId: true,
  },
};
export const taskValidationSchema = {
  title: {
    isLength: {
      options: {
        min: 5,
      },
    },
    notEmpty: true,
  },
  description: {
    isLength: {
      options: {
        min: 5,
      },
    },
    notEmpty: true,
  },
  columnId: {
    isMongoId: true,
  },
  boardId: {
    isMongoId: true,
  },
  "subtasks.*": {
    isLength: {
      options: {
        min: 5,
      },
    },
    notEmpty: true,
  },
};
