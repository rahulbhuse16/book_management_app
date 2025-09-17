import React from 'react'
import { X, Trash2 } from 'lucide-react'
import Spinner from '../components/Spinner'



const ConfirmDeleteBookModal: React.FC<DeletBookModalNS.ConfirmDeleteBookModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  bookTitle = 'this book',
  isLoading
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-red-600 flex items-center space-x-2">
            <Trash2 size={24} /> Confirm Delete
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-700 mb-6">
          Are you sure you want to delete <span className="font-semibold">{bookTitle}</span>? This action cannot be undone.
        </p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded hover:from-red-600 hover:to-pink-600"
          >
            {
                isLoading ? (<Spinner color='#fff' size={30}/>):
            
            "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteBookModal
