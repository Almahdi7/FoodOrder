import React, { useState } from "react";
import type { Category } from "../types/Category";
import useCategories from "../hooks/useCategories";
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "../api/categoeyService";
import CategoriesTable from "../components/CategoriesTable";
import CategoryModal from "../components/CategoryModal";

const initialCategoryState: Category = {
  id: 0,
  name: "",
  restaurantId: 1,
};

const ManageCategories = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentCategory, setCurrentCategory] =
    useState<Category>(initialCategoryState);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const { categories, loading, error } = useCategories();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (modalMode === "add") {
        await addCategory(currentCategory);
        alert("Category added successfully!");
      } else {
        if (!currentCategory.id) return;
        await updateCategory(currentCategory.id, currentCategory);
        alert("Category updated successfully!");
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving the data");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        alert("Category deleted successfully!");
      } catch (err) {
        console.error(err);
        alert("An error occurred while deleting");
      }
    }
  };

  if (loading)
    return (
      <div className="text-center p-6 text-gray-600">Loading categories...</div>
    );
  if (error) return <div className="text-center p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Categories</h1>
        <button
          onClick={() => {
            setModalMode("add");
            setCurrentCategory(initialCategoryState);
            setIsModalOpen(true);
          }}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium shadow transition"
        >
          add new category +
        </button>
      </div>

      <CategoriesTable
        categories={categories}
        onEdit={(cat) => {
          setModalMode("edit");
          setCurrentCategory(cat);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <CategoryModal
        isOpen={isModalOpen}
        title={modalMode === "add" ? "Add New Category" : "Edit Category"}
        category={currentCategory}
        onChange={setCurrentCategory}
        onSubmit={handleSubmit}
        onClose={() => setIsModalOpen(false)}
        loading={submitting}
      />
    </div>
  );
};

export default ManageCategories;
