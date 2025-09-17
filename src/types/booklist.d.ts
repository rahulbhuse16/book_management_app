declare namespace BookListNS {
  interface IBook {
    _id: any;
    title: string;
    author: string;
    year: number;
    genre: string;
    status: "Available" | "Issued";
  }

  interface IBookListState {
    isListLoading: boolean;

    isDeleteLoading: boolean;

    isAddBookLoading: boolean;

    isEditBookLoading: boolean;

    books: IBook[];

    totalPages : number;
  }
  interface IState {
    bookState: IBookListState;
  }
}
