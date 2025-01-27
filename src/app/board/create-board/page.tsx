'use client'

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export default function CreateBoard() {
  const [boardName, setBoardName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([{ name: "", role: "" }]);
  const [loading, setLoading] = useState(false); // State for button loading

  const handleMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setMembers(updatedMembers);
  };

  const addMember = () => {
    setMembers([...members, { name: "", role: "" }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const newBoard = {
      name: boardName,
      description,
      members,
    };

    try {
      const response = await fetch("/api/board/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBoard),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create board");
      }

      // Success message
      toast.success("Board created successfully!");

      // Clear form after submission
      setBoardName("");
      setDescription("");
      setMembers([{ name: "", role: "" }]);
    } catch (error) {
      // Error message
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <DefaultLayout>
      <div className="p-6 mb-15">
        <h1 className="text-2xl font-bold mb-4">Create Board</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Board Name */}
          <div>
            <label htmlFor="boardName" className="block font-medium">
              Board Name
            </label>
            <input
              type="text"
              id="boardName"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 w-full rounded"
              rows={4}
              required
            ></textarea>
          </div>

          {/* Members */}
          <div>
            <label className="block font-medium">Members</label>
            {members.map((member, index) => (
              <div key={index} className="flex space-x-4 mb-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={member.name}
                  onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                  className="border p-2 flex-1 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={member.role}
                  onChange={(e) => handleMemberChange(index, "role", e.target.value)}
                  className="border p-2 flex-1 rounded"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addMember}
              className="text-blue-500 underline"
            >
              + Add Member
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading} // Disable the button when loading
          >
            {loading ? "Creating..." : "Create Board"}
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
}
