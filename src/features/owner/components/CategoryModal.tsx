import React from 'react'
import type { Category } from '../types/Category';

interface CategoryModalProps {
  isOpen: boolean;
  title: string;
  category: Category;
  onChange: (category: Category) => void;
  onSubmit: (e: React.SyntheticEvent) => void;
  onClose: () => void;
  loading: boolean;
}

const CategoryModal = ({ isOpen, title, category, onChange, onSubmit, onClose, loading }: CategoryModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
            <input 
              type="text" 
              value={category.name}
              onChange={(e) => onChange({...category, name: e.target.value})}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />
          </div>
          <div>
            
          </div>
          <div className="flex justify-end space-x-2 space-x-reverse pt-2">
            <button 
              type="button"
              onClick={onClose}
              disabled={loading}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 mx-1 rounded-lg text-sm transition"
            >
              cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 mx-1 rounded-lg text-sm transition disabled:opacity-50"
            >
              {loading ? 'saving' : 'save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryModal
