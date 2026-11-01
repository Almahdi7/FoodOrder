import React from 'react'
import type { Category } from '../types/Category'

interface CategoriesTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}

const CategoriesTable = ({ categories, onEdit, onDelete }: CategoriesTableProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <table className="w-full text-right border-collapse">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="p-4">Category Name</th>
            <th className="p-4 text-center"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-sm">
          {categories.length === 0 ? (
            <tr>
              <td colSpan={2} className="p-6 text-center text-gray-500">
                There is no category
              </td>
            </tr>
          ) : (
            categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-900">{cat.name}</td>
                <td className="p-4 text-center space-x-2 space-x-reverse">
                  <button 
                    onClick={() => onEdit(cat)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 mx-1 rounded text-xs transition"
                  >
                    edit
                  </button>
                  <button 
                    onClick={() => cat.id && onDelete(cat.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 mx-1 rounded text-xs transition"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CategoriesTable
