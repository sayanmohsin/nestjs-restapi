export const userSelectApi = {
  userId: true,
  firstName: true,
  middleName: true,
  lastName: true,
  email: true,
  roles: {
    include: {
      role: true,
    },
  },
};

export const userWithPasswordSelectApi = {
  ...{ password: true },
  ...userSelectApi,
};
