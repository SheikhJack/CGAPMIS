"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

interface Subcategory {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

const BudgetCreationForm: React.FC = () => {
  const [budgetCategories] = useState<Category[]>([
    { id: "1", name: "Housing", subcategories: [{ id: "1-1", name: "Rent" }, { id: "1-2", name: "Utilities" }] },
    { id: "2", name: "Food", subcategories: [{ id: "2-1", name: "Groceries" }, { id: "2-2", name: "Dining Out" }] },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [budgetAmount, setBudgetAmount] = useState<number>(0);
  const [budgetDescription, setBudgetDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategory(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (budgetAmount <= 0) {
      toast.error("Budget amount must be greater than zero.");
      return;
    }

    const newBudgetItem = {
      category: selectedCategory,
      subcategory: selectedSubcategory,
      amount: budgetAmount,
      description: budgetDescription,
    };

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBudgetItem),
      });

      if (!response.ok) {
        throw new Error("Failed to add budget item.");
      }

      const result = await response.json();
      if (result.success) {
        toast.success("Budget item added successfully!");
        setSelectedCategory(null);
        setSelectedSubcategory(null);
        setBudgetAmount(0);
        setBudgetDescription("");
      } else {
        toast.error(result.message || "Failed to add budget item.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding the budget item.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Budget Creation" />
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto bg-white p-6 shadow rounded-lg">
        <div>
          <label htmlFor="category" className="block font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory ?? ""}
            onChange={handleCategoryChange}
            className="border p-3 w-full rounded"
            disabled={isSubmitting}
          >
            <option value="">Select a category</option>
            {budgetCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="subcategory" className="block font-medium mb-2">
            Subcategory
          </label>
          <select
            id="subcategory"
            value={selectedSubcategory ?? ""}
            onChange={handleSubcategoryChange}
            className="border p-3 w-full rounded"
            disabled={!selectedCategory || isSubmitting}
          >
            <option value="">Select a subcategory</option>
            {selectedCategory &&
              budgetCategories
                .find((category) => category.id === selectedCategory)
                ?.subcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
          </select>
        </div>

        <div>
          <label htmlFor="amount" className="block font-medium mb-2">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(Number(e.target.value))}
            className="border p-3 w-full rounded"
            placeholder="Enter amount"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={budgetDescription}
            onChange={(e) => setBudgetDescription(e.target.value)}
            className="border p-3 w-full rounded"
            placeholder="Enter a brief description"
            rows={3}
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white px-6 py-3 rounded ${
            isSubmitting ? "opacity-50" : "hover:bg-blue-700"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding Budget Item..." : "Add Budget Item"}
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </DefaultLayout>
  );
};

export default BudgetCreationForm;
