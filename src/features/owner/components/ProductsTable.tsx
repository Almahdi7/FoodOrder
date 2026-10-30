import React from 'react'
import type { Product } from '../types/Product'

interface ProductsTableProps {
        products: Product[];
        onEdit: (product: Product) => void;
        onDelete: (id: number) => void;
    }

const ProductsTable = ({ products, onEdit, onDelete }: ProductsTableProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
      <table className="w-full text-right border-collapse">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="p-3"></th>
            <th className="p-3">Product Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock</th>
            <th className="p-3 text-center"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-sm">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="p-3">
                <img 
                  src={product.thumbnail} 
                  alt={product.title} 
                  className="w-12 h-12 object-cover rounded-md border" 
                />
              </td>
              <td className="p-3 font-medium text-gray-900">{product.title}</td>
              <td className="p-3 text-gray-600 capitalize">{product.category}</td>
              <td className="p-3 text-green-600 font-semibold">${product.price}</td>
              <td className="p-3 text-gray-600">{product.stock}</td>
              <td className="p-3 text-center space-x-2 space-x-reverse">
                <button 
                  onClick={() => onEdit(product)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 mx-1 rounded text-xs transition"
                >
                  edit
                </button>
                <button 
                  onClick={() => product.id && onDelete(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 mx-1 rounded text-xs transition"
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTable
