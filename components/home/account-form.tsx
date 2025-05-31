"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountType, Account } from "@prisma/client";
import {
  frontendErrorResponse,
  frontendSuccessResponse,
} from "@/lib/frontend-response-toast";

const accountSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.nativeEnum(AccountType),
});

type AccountInput = z.infer<typeof accountSchema>;

const AccountForm = ({
  isThisForCreateAccount,
  account,
  setRevalidateData,
  setIsOpen,
}: {
  isThisForCreateAccount: boolean;
  account?: Account;
  setRevalidateData: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AccountInput>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: account?.name || "",
      type: account?.type || AccountType.ASSET,
    },
  });

  const onSubmit = async (data: AccountInput) => {
    try {
      const url = isThisForCreateAccount
        ? "/api/accounts"
        : `/api/accounts/${account?.id}`;
      const method = isThisForCreateAccount ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();
      if (!result.success) {
        return frontendErrorResponse({ message: result?.message });
      }
      reset();
      setIsOpen(false);
      setRevalidateData(true);
      return frontendSuccessResponse({ message: result?.message });
    } catch (error) {
      console.error("Submission error", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          {...register("name")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          {...register("type")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          {Object.values(AccountType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={() => {
            reset();
            setIsOpen(false);
          }}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {isSubmitting
            ? isThisForCreateAccount
              ? "Creating..."
              : "Updating..."
            : isThisForCreateAccount
            ? "Create"
            : "Update"}
        </button>
      </div>
    </form>
  );
};

export default AccountForm;
