import UserService from "../services/userService";

export const userResolver = {
  Query: {
    userProfile: () => UserService.getUser(),
  },
  Mutation: {
    updateUserProfile: (_: any, args: any) => UserService.updateUser(args),
  },
};
