import EmailField from './Fields/EmailField'
import TextFieldRequired from './Fields/TextFieldWithValidation'
import CountriesField from './Fields/CountriesField'
import { useState } from 'react'
import TextField from './Fields/TextField'

export default function PersonalInformationForm() {
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
                  Personal Information
                </h3>
                <p className="mt-1 mb-5 text-sm text-gray-500">
                  Enter your personal information that will appear on the
                  invoice.
                </p>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <TextFieldRequired
                      label="First name"
                      name="firstName"
                      width="w-full"
                      onChange={handleChange}
                      value={tempFromObject.firstName}
                      error={error}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <TextFieldRequired
                      label="Last name"
                      name="lastName"
                      width="w-full"
                      onChange={handleChange}
                      value={tempFromObject.lastName}
                      error={error}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <EmailField
                      label="Email address"
                      name="email"
                      width="w-full"
                      onChange={handleChange}
                      value={tempFromObject.email}
                      error={error}
                    />
                  </div>

                  <br></br>

                  <div className="col-span-6 sm:col-span-3">
                    <CountriesField />
                  </div>

                  <div className="col-span-6">
                    <TextField
                      label="Street address"
                      name="streetAddress"
                      width="w-full"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <TextField label="City" name="city" width="w-full" />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <TextField
                      label="State / Province"
                      name="state"
                      width="w-full"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <TextField
                      label="ZIP / Postal code"
                      name="zip"
                      width="w-full"
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
