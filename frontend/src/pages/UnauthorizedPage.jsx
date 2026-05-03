import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 className="text-9xl font-extrabold text-indigo-600">403</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-900">Access Denied</h2>
        <p className="mt-2 text-gray-600">You don't have permission to view this page.</p>
        <div className="mt-6">
          <Link to="/dashboard" className="text-base font-medium text-indigo-600 hover:text-indigo-500">
            Go back to Dashboard <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
