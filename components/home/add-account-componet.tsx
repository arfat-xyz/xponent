"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import AccountForm from "./account-form";

const AddAccountComponent = ({
  setRevalidateData,
}: {
  setRevalidateData: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Add New Account
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-xl font-bold mb-4">Add New Account</h2>

            <AccountForm
              isThisForCreateAccount={true}
              setRevalidateData={setRevalidateData}
              setIsOpen={setIsOpen}
            />

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddAccountComponent;
