import Link from "next/link";
import React from "react";

interface UnsubscribeProps {
  searchParams: { success?: string; error?: string };
}
const Page = ({ searchParams }: UnsubscribeProps) => {
  const success = searchParams.success;
  const error = searchParams.error;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Unsubscribe</h1>
        {success && (
          <div>
            <p className="text-green-600 mb-4">{success}</p>
            <p className="text-gray-600 mb-4">
              You will no longer receive newsletter updates from s5.
            </p>
          </div>
        )}
        {error && (
          <div>
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-gray-600 mb-4">
              Please try again or contact support if the issue persists.
            </p>
          </div>
        )}
        <div className="mt-6">
          <Link href="/" className="text-blue-500 hover:underline">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
