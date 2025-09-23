import { gql } from "apollo-server";

export const collectionSchema = gql`
  enum CategoryEnum {
    Book
    Movie
    Game
    Serie
    Album
  }

  type CollectionItem {
    id: ID!
    title: String!
    author: String!
    category: CategoryEnum!
    description: String
    imageUrl: String
    rating: Float

    createdAt: String!
    updatedAt: String!
  }

  type CategoryStats {
    category: CategoryEnum!
    quantity: Int!
    percentage: Float!
    averageRating: Float
  }

  type CollectionStats {
    totalItems: Int!
    averageRating: Float
    categoryPercentages: [CategoryStats!]!
  }

  type Query {
    collectionItems(
      category: CategoryEnum
      page: Int
      limit: Int
    ): [CollectionItem!]!
    collectionItem(id: ID!): CollectionItem
    collectionStats: CollectionStats!
  }

  type Mutation {
    createCollectionItem(
      title: String!
      author: String!
      category: CategoryEnum!
      description: String
      imageUrl: String
      rating: Float
    ): CollectionItem!
    updateCollectionItem(
      id: ID!
      title: String
      author: String
      category: CategoryEnum
      description: String
      imageUrl: String
      rating: Float
    ): CollectionItem!
    deleteCollectionItem(id: ID!): Boolean!
  }
`;
