import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AddBookModal from "../modals/AddBookModal";
import ConfirmDeleteBookModal from "../modals/DeleteBookModal";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  createNewBook,
  setBooksByDelete,
  setBooksByEdit,
  setBooksByFetching,
} from "../redux/thunkfunctions/book";
import EditBookModal from "../modals/EditBookModal";

const genres = ["", "Fiction", "Biography", "Science", "History"];
const statuses = ["", "Available", "Issued"];

const BookList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isBookDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);
  const [bookInfo, setBookInfo] = useState<BookListNS.IBook>({});
  const [isEditBookOpen, setIsEditBookOpen] = useState(false);

  const bookState = useAppSelector((state) => state.books.bookState);
  const dispatch = useAppDispatch();
  const books = bookState.books;

  const onOpenAddBookModal = () => {
    setIsAddBookModalOpen(true);
  };

  const onCloseAddBookModal = () => {
    setIsAddBookModalOpen(false);
  };

  const addBookToLibrary = async (data: BookListNS.IBook) => {
    await dispatch(createNewBook({ payload: data }));
    fetchBooks();
  };

  const onOpenEditBook = (item: BookListNS.IBook) => {
    setIsEditBookOpen(true);
    setBookInfo(item);
  };

  const onCloseEditBook = () => {
    setIsEditBookOpen(false);
  };

  const onEditBook = async (data: BookListNS.IBook) => {
    await dispatch(setBooksByEdit({ editId: bookInfo?._id, payload: data }));
    fetchBooks();
  };

  const onCloseConfirmDeleteModal = () => {
    setIsDeleteConfirmModalOpen(false);
  };

  const onOpenDeleteConfirmationModal = (item: any) => {
    setBookInfo(item);
    setIsDeleteConfirmModalOpen(true);
  };

  const onConfirmDelete = async () => {
    await dispatch(setBooksByDelete({ editId: bookInfo?._id }));
    fetchBooks();
    onCloseConfirmDeleteModal();
  };

  const totalPages = bookState.totalPages;

  const fetchBooks = async () => {
    await dispatch(setBooksByFetching({ page }));
  };

  useEffect(() => {
    fetchBooks();
  }, [page, search, genreFilter, statusFilter]);

  if (bookState.isListLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <Skeleton width={300} height={40} className="mb-6 mx-auto" />
        <Skeleton height={40} className="mb-4 mx-auto" />
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <tr>
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <th key={i} className="px-6 py-3">
                      <Skeleton width={100} />
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {Array(10)
                .fill(0)
                .map((_, rowIdx) => (
                  <tr key={rowIdx}>
                    {Array(6)
                      .fill(0)
                      .map((_, colIdx) => (
                        <td key={colIdx} className="px-6 py-4">
                          <Skeleton width="100%" height={20} />
                        </td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (isAddBookModalOpen) {
    return (
      <AddBookModal
        onClose={onCloseAddBookModal}
        isOpen={isAddBookModalOpen}
        onSubmit={addBookToLibrary}
      />
    );
  }

  if (isBookDeleteConfirmModalOpen) {
    return (
      <ConfirmDeleteBookModal
        isOpen={isBookDeleteConfirmModalOpen}
        onClose={onCloseConfirmDeleteModal}
        onConfirm={onConfirmDelete}
        bookTitle={bookInfo?.title}
        isLoading={bookState.isDeleteLoading}
      />
    );
  }

  if (isEditBookOpen) {
    return (
      <EditBookModal
        initialData={bookInfo}
        onClose={onCloseEditBook}
        onSubmit={onEditBook}
        isOpen={isEditBookOpen}
      />
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-purple-700">
        📚 Books Library
      </h1>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by Title or Author"
          className="p-3 border rounded-lg shadow focus:ring-purple-500 focus:outline-none w-full sm:w-1/3"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <div className="flex flex-wrap gap-4">
          <button
            onClick={onOpenAddBookModal}
            style={{
              cursor: "pointer",
            }}
            className="px-4 py-2 bg-gradient-to-r from-violet-500 to-violet-300 text-white rounded hover:from-red-600 hover:to-pink-600"
          >
            Add Book
          </button>
          <select
            className="p-3 border rounded-lg shadow focus:ring-purple-500 focus:outline-none"
            value={genreFilter}
            onChange={(e) => {
              setPage(1);
              setGenreFilter(e.target.value);
            }}
          >
            {genres.map((g, idx) => (
              <option key={idx} value={g}>
                {g === "" ? "All Genres" : g}
              </option>
            ))}
          </select>

          <select
            className="p-3 border rounded-lg shadow focus:ring-purple-500 focus:outline-none"
            value={statusFilter}
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value);
            }}
          >
            {statuses.map((s, idx) => (
              <option key={idx} value={s}>
                {s === "" ? "All Statuses" : s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Books Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-md font-semibold">
                Title
              </th>
              <th className="px-6 py-3 text-left text-md font-semibold">
                Author
              </th>
              <th className="px-6 py-3 text-left text-md font-semibold">
                Genre
              </th>
              <th className="px-6 py-3 text-left text-md font-semibold">
                Published Year
              </th>
              <th className="px-6 py-3 text-left text-md font-semibold">
                Status
              </th>
              <th className="px-6 py-3 text-center text-md font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {bookState?.books.map((book) => (
              <tr key={book.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                  {book.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {book.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {book.genre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {book.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      book.status === "Available"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {book.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center space-x-4">
                  <button
                    onClick={() => {
                      onOpenEditBook(book);
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                    className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      onOpenDeleteConfirmationModal(book);
                    }}
                    className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {books.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-medium">
          Page <span className="text-purple-600">{page}</span> of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;
