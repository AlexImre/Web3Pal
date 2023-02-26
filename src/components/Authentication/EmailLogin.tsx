import React from 'react';

function EmailLogin() {
  return (
    <div className="flex items-center">
      <button
        type="button"
        className="font-small inline-flex w-full items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-700 shadow-sm hover:bg-gray-50"
      >
        <div className="ml-4">Sign in with email</div>
      </button>
    </div>
  );
}

export default EmailLogin;
