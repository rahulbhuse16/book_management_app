import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const BookListLoader: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">
        <Skeleton width={300} height={40} />
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
            <tr>
              {Array(6).fill(0).map((_, i) => (
                <th key={i} className="px-6 py-3">
                  <Skeleton width={80} />
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {Array(10).fill(0).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {Array(6).fill(0).map((_, colIdx) => (
                  <td key={colIdx} className="px-6 py-4 whitespace-nowrap">
                    <Skeleton width="100%" height={20} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Placeholder Pagination */}
      <div className="flex justify-center items-center space-x-3 mt-4">
        <Skeleton width={80} height={30} />
        <Skeleton width={100} height={30} />
        <Skeleton width={80} height={30} />
      </div>
    </div>
  )
}

export default BookListLoader
