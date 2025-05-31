"use client";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiHome } from "react-icons/fi";

export default function NotFoundPageClientComponent() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg text-center">
        <div className="text-indigo-600">
          <svg
            className="w-20 h-20 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600">Page Not Found</p>
        <p className="text-gray-500">
          {`The page you're looking for doesn't exist or has been moved.`}
        </p>

        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Go Back
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center px-5 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            <FiHome className="mr-2" />
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
