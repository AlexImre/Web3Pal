import React from 'react'

export default function PersonalInformation() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full p-3">
        <div className="flex items-center">
          <div className="flex-shrink-0"></div>
          <div className="ml-5 w-0 flex-1">
            <div className="text-lg font-medium text-slate-900">
              Personal Information
            </div>
            <div className="truncate text-sm font-medium text-gray-700">
              First name, last name <br></br>
              Email address <br></br>
              Company name<br></br>
              Address line 1 <br></br>
              Address line 2 <br></br>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-3">
        <div className="flex items-center">
          <div className="flex-shrink-0"></div>
          <div className="ml-5 w-0 flex-1 text-left md:text-right">
            <div className="text-lg font-medium text-slate-900">
              Invoice Information
            </div>
            <div className="truncate text-sm font-medium text-gray-700">
              Invoice number <br></br>Issue date<br></br> Due date
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
