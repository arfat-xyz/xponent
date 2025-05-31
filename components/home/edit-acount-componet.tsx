"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import AccountForm from "./account-form";
import { Account } from "@prisma/client";
import {
  frontendErrorResponse,
  frontendSuccessResponse,
} from "@/lib/frontend-response-toast";

const EditAccountComponent = ({
  account,
  setRevalidateData,
}: {
  account: Account;
  setRevalidateData: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/accounts/${account.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      if (!result.success) {
        return frontendErrorResponse({ message: result?.message });
      }
      setIsDeleteOpen(false);
      setRevalidateData((prev) => !prev);
      return frontendSuccessResponse({ message: result?.message });
    } catch (error) {
      console.error("Deletion error", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsEditOpen(true)}
          className="px-2 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => setIsDeleteOpen(true)}
          className="px-2 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Delete
        </button>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-bold mb-4">Edit Account</h2>

            <AccountForm
              isThisForCreateAccount={false}
              account={account}
              setRevalidateData={setRevalidateData}
              setIsOpen={setIsEditOpen}
            />

            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-bold mb-4">Delete Account</h2>
            <p className="mb-6 w-full break-words">
              Are you sure you want to delete the account {account.name}? <br />
              This action cannot be undone.
            </p>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>

            <button
              onClick={() => setIsDeleteOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              disabled={isDeleting}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditAccountComponent;
