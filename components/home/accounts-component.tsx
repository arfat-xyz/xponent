"use client";

import { useState, useEffect, useCallback } from "react";
import AccountsTableComponent from "./accounts-table";
import { frontendErrorResponse } from "@/lib/frontend-response-toast";
import { Account } from "@prisma/client";
import AddAccountComponet from "./add-account-componet";

export default function AccountsComponent() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [revalidateData, setRevalidateData] = useState(false);

  // Memoized fetch function
  const fetchAccounts = useCallback(
    async (page: number, limitValue: number) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/accounts?page=${page}&limit=${limitValue}`
        );
        const data = await response.json();
        if (!data?.success) {
          return frontendErrorResponse({ message: data?.message });
        }
        setAccounts(data?.data?.data);
        setTotalPages(data?.data?.pagination?.totalPages);
        setCurrentPage(data?.data?.pagination?.currentPage);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Initial fetch and when revalidateData changes
  useEffect(() => {
    fetchAccounts(currentPage, limit);
  }, [fetchAccounts, revalidateData]); // Only revalidateData triggers re-fetch

  // Separate effect for pagination changes
  useEffect(() => {
    if (currentPage !== 1) {
      // Skip initial load
      fetchAccounts(currentPage, limit);
    }
  }, [currentPage, limit, fetchAccounts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value, 10);
    setLimit(newLimit);
    setCurrentPage(1); // Reset to page 1 on limit change
    setRevalidateData((prev) => !prev); // Trigger revalidation
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Chart of Accounts</h1>
        <div className="flex items-center gap-4">
          <label className="text-gray-700 text-sm">Rows per page:</label>
          <select
            value={limit}
            onChange={handleLimitChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>

          <AddAccountComponet setRevalidateData={setRevalidateData} />
        </div>
      </div>

      <AccountsTableComponent
        accounts={accounts}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        setRevalidateData={setRevalidateData}
      />
    </div>
  );
}
