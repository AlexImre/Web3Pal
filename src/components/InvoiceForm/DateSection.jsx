import EmailField from './Fields/EmailField'
import TextFieldRequired from './Fields/TextFieldWithValidation'
import CountriesField from './Fields/CountriesField'
import { useState } from 'react'
import TextField from './Fields/TextField'
import NumberFieldRequired from './Fields/NumberFieldWithValidation'

export default function DateSection() {
  const [tempFromObject, setTempFromObject] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    setTempFromObject({ ...tempFromObject, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (tempFromObject.firstName === '' || tempFromObject.lastName === '') {
      setError(true)
      return
    } else if (
      tempFromObject.email === '' ||
      !tempFromObject.email.includes('@')
    ) {
      setError(true)
      return
    } else {
      setError(false)
    }
  }

  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-2 md:gap-6">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form action="#" method="POST">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Date Information
                </h3>
                <p className="mt-1 mb-5 text-sm text-gray-500">
                  Enter information about the recipient of this invoice. This
                  could be a person or a business.
                </p>
                <div className="mb-5 grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <NumberFieldRequired
                      label="Invoice number"
                      name="invoiceNumber"
                      width="w-full"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-5 grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <NumberFieldRequired
                      label="Invoice issue date"
                      name="invoiceNumber"
                      width="w-full"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <NumberFieldRequired
                      label="Invoice due date"
                      name="invoiceNumber"
                      width="w-full"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={(e) => handleSubmit(e)}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
