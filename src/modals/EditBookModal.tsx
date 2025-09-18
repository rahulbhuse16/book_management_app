import React from "react";
import { useForm } from "react-hook-form";
import { X, BookPlus } from "lucide-react";
import Spinner from "../components/Spinner";

const genres = ["Fiction", "Biography", "Science", "History"];
const statuses = ["Available", "Issued"];

const EditBookModal: React.FC<AddBookModalNS.BookModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddBookModalNS.BookFormData>({
    defaultValues: initialData || {
      title: "",
      author: "",
      genre: "",
      year: new Date().getFullYear(),
      status: "Available",
    },
  });

  const submitHandler = (data: AddBookModalNS.BookFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-600 flex items-center space-x-2">
            <BookPlus size={24} /> {initialData ? "Edit Book" : "Add New Book"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full p-2 border rounded shadow focus:ring-purple-500 focus:outline-none"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              {...register("author", { required: "Author is required" })}
              className="w-full p-2 border rounded shadow focus:ring-purple-500 focus:outline-none"
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Genre
            </label>
            <select
              {...register("genre", { required: "Genre is required" })}
              className="w-full p-2 border rounded shadow focus:ring-purple-500 focus:outline-none"
            >
              <option value="">Select Genre</option>
              {genres.map((g, i) => (
                <option key={i} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {errors.genre && (
              <p className="text-red-500 text-sm mt-1">
                {errors.genre.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Published Year
            </label>
            <input
              type="number"
              {...register("year", {
                required: "Year is required",
                min: 1900,
                max: new Date().getFullYear(),
              })}
              className="w-full p-2 border rounded shadow focus:ring-purple-500 focus:outline-none"
            />
            {errors.year && (
              <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              {...register("status", { required: "Status is required" })}
              className="w-full p-2 border rounded shadow focus:ring-purple-500 focus:outline-none"
            >
              {statuses.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded hover:from-purple-600 hover:to-indigo-600"
            >
              {isLoading ? <Spinner color="#fff" size={30} /> : "Update Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
