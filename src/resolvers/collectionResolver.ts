import CollectionService from "../services/collectionService";

export const collectionResolver = {
  Query: {
    collectionItems: (_: any, args: any) => CollectionService.getItems(args),
    collectionItem: (_: any, { id }: { id: string }) =>
      CollectionService.getItemById(id),
    collectionStats: () => CollectionService.getStats(),
  },
  Mutation: {
    createCollectionItem: (_: any, args: any) =>
      CollectionService.createItem(args),
    updateCollectionItem: (_: any, { id, ...args }: { id: string }) =>
      CollectionService.updateItem(id, args),
    deleteCollectionItem: (_: any, { id }: { id: string }) =>
      CollectionService.deleteItem(id),
  },
};
