import { gql } from "apollo-server";

export const userSchema = gql`
  type UserProfile {
    name: String!
    bio: String!
    avatarUrl: String!
    totalItems: Int!
    averageRating: Float
    startYear: Int!
    categorySummary: [CategorySummary!]!
  }

  type CategorySummary {
    category: CategoryEnum!
    itemCount: Int!
  }

  extend type Query {
    userProfile: UserProfile!
  }

  extend type Mutation {
    updateUserProfile(
      name: String
      bio: String
      avatarUrl: String
      startYear: Int
    ): UserProfile!
  }
`