import UserService from "../services/userService";

export const userResolver = {
  Query: {
    userProfile: () => UserService.getProfile(),
  },
  Mutation: {
    updateUserProfile: (_: any, args: any) => UserService.updateUser(args),
  },
};
