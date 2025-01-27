"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { categories } from "@/constatnts/Categories";
import React, { useState, ChangeEvent, FormEvent } from "react";

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
    const [budgetCategories] = useState<Category[]>(categories); // Use predefined categories
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>();
    const [budgetAmount, setBudgetAmount] = useState<number | "">("");
    const [budgetDescription, setBudgetDescription] = useState<string>("");
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
        setSelectedSubcategory(undefined);
    };

    const handleSubcategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubcategory(event.target.value);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        // Validation
        if (!selectedCategory || !selectedSubcategory || !budgetAmount || !budgetDescription) {
            alert("Please fill in all fields with valid data.");
            return;
        }

        console.log("Budget Item:", {
            category: selectedCategory,
            subcategory: selectedSubcategory,
            amount: budgetAmount,
            description: budgetDescription,
        });

        // Show success message
        setIsSuccess(true);

        // Reset form after submission
        setTimeout(() => setIsSuccess(false), 3000);
        setSelectedCategory(undefined);
        setSelectedSubcategory(undefined);
        setBudgetAmount("");
        setBudgetDescription("");
    };

    return (
        <DefaultLayout>
            <form
                onSubmit={handleSubmit}
                className="space-y-4 max-w-lg mx-auto block font-medium mb-40"
            >
                <h1 className="text-xl font-semibold text-gray-800 mb-4">
                    Create Budget Item
                </h1>

                {isSuccess && (
                    <div className="p-2 bg-green-100 text-green-700 rounded text-sm">
                        Budget item added successfully!
                    </div>
                )}

                <div>
                    <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-600 mb-1"
                    >
                        Category:
                    </label>
                    <select
                        id="category"
                        value={selectedCategory ?? ""}
                        onChange={handleCategoryChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        <option value="">Select Category</option>
                        {budgetCategories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="subcategory"
                        className="block text-sm font-medium text-gray-600 mb-1"
                    >
                        Subcategory:
                    </label>
                    <select
                        id="subcategory"
                        value={selectedSubcategory ?? ""}
                        onChange={handleSubcategoryChange}
                        disabled={!selectedCategory}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        <option value="">Select Subcategory</option>
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
                    <label
                        htmlFor="amount"
                        className="block text-sm font-medium text-gray-600 mb-1"
                    >
                        Amount:
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={budgetAmount}
                        onChange={(e) => setBudgetAmount(e.target.value ? Number(e.target.value) : "")}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-600 mb-1"
                    >
                        Description:
                    </label>
                    <textarea
                        id="description"
                        value={budgetDescription}
                        onChange={(e) => setBudgetDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
                >
                    Add Budget Item
                </button>
            </form>
        </DefaultLayout>
    );
};

export default BudgetCreationForm;
