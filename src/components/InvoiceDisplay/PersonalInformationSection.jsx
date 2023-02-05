import React from 'react'
import { StateContext } from '../../context/StateContext'
import { useContext, useState } from 'react'

export default function PersonalInformation() {
  const { masterState, setMasterState } = useContext(StateContext)
  const {
    name,
    email,
    addressLine1,
    addressLine2,
    city,
    county,
    postalCode,
    country,
  } = masterState.personalInformation

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full py-3">
        <div className="flex items-center">
          <div className="flex-shrink-0"></div>
          <div className="ml-5 w-0 flex-1">
            <div className="text-lg font-medium text-slate-900">
              Personal Information
            </div>
            <div className="truncate text-sm font-medium text-gray-700">
              {name && email ? (
                <>
                  {name} <br></br>
                  {email} <br></br>
                  {addressLine1 ? addressLine1 : ''}{' '}
                  {addressLine1 ? <br></br> : ''}
                  {addressLine2 ? addressLine2 : ''}{' '}
                  {addressLine2 ? <br></br> : ''}
                  {`${city} ${county} ${postalCode}`}{' '}
                  {city || county || postalCode ? <br></br> : ''}
                  {country ? country : ''} {country ? <br></br> : ''}
                </>
              ) : (
                <>
                  John Smith <br></br>
                  John@Smith.com <br></br>
                  123 Metaverse Lane <br></br>
                </>
              )}
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
