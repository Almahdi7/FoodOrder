import React, { useState } from 'react'
import type { Product } from '../types/Product'
import useProducts from '../hooks/useProducts';
import { addProduct, updateProduct, deleteProduct } from '../api/productService';
import ProductModal from '../components/ProductModal';
import ProductsTable from '../components/ProductsTable';

const initialProductState: Product = {
    title: '',
    price: 0,
    category: '',
    thumbnail: '',
    stock: 0,
    restaurantId: 1
};

const ManageProdusts = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [currentProduct, setCurrentProduct] = useState<Product>(initialProductState);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const { products, loading, error } = useProducts();

    const handleOpenAddModal = () => {
        setModalMode('add');
        setCurrentProduct(initialProductState);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (product: Product) => {
        setModalMode('edit');
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (modalMode === 'add') {
        await addProduct(currentProduct);
        alert('تم إضافة المنتج بنجاح!');
      } else {
        if (!currentProduct.id) return;
        await updateProduct(currentProduct.id, currentProduct);
        alert('تم تحديث المنتج بنجاح!');
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء حفظ البيانات');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      try {
        await deleteProduct(id);
        alert('تم حذف المنتج بنجاح!');
      } catch (err) {
        console.error(err);
        alert('حدث خطأ أثناء الحذف');
      }
    }
  };
  
  if (loading) return <div className="text-center p-6 text-gray-600">جاري تحميل المنتجات...</div>;
  if (error) return <div className="text-center p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Products</h1>
        <button 
          onClick={handleOpenAddModal}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium shadow transition"
        >
          add new products +
        </button>
      </div>

      <ProductsTable 
        products={products} 
        onEdit={handleOpenEditModal} 
        onDelete={handleDelete} 
      />

      <ProductModal 
        isOpen={isModalOpen}
        title={modalMode === 'add' ? 'Add New Product' : 'Edit Product'}
        product={currentProduct}
        onChange={setCurrentProduct}
        onSubmit={handleSubmit}
        onClose={() => setIsModalOpen(false)}
        loading={submitting}
      />
    </div>
  )
}

export default ManageProdusts
