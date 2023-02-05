import React from 'react'

export default function RecipientInformation() {
  return (
    <div className="w-full py-3">
      <div className="flex items-center">
        <div className="flex-shrink-0"></div>
        <div className="ml-5 w-0 flex-1">
          <div className="text-lg font-medium text-slate-900">
            Recipient Information
          </div>
          <div className="truncate text-sm font-medium text-gray-700">
            Name of individual or company <br></br>
            Email address<br></br>
          </div>
        </div>
      </div>
    </div>
  )
}
