import EmailField from './Fields/EmailField'
import TextFieldRequired from './Fields/TextFieldWithValidation'
import CountriesField from './Fields/CountriesField'
import { StateContext } from '../../context/stateContext'
import { useContext, useState } from 'react'
import TextField from './Fields/TextField'
import toast, { Toaster } from 'react-hot-toast'

export default function PersonalInformationForm() {
  const personalInfoToast = () => toast.success('Information updated.')
  const { masterState, setMasterState } = useContext(StateContext)
  console.log("masterState", masterState)
  const [tempRecipientInfo, setTempRecipientInfo] = useState(
    masterState.recipientInformation
  )
  const {
    name,
    email,
    addressLine1,
    addressLine2,
    city,
    county,
    postalCode,
  } = tempRecipientInfo
  const [error, setError] = useState(false)
  const handleChange = (e) => {
    setTempRecipientInfo({
      ...tempRecipientInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name === '') {
      setError(true)
      return
    } else if (email === '' || !email.includes('@')) {
      setError(true)
      return
    } else {
      setError(false)
    }
    setMasterState({
      ...masterState,
      recipientInformation: tempRecipientInfo,
    })
    personalInfoToast()
  }

  return (
    <>
    <div style={{position: "sticky"}}>
      <Toaster containerStyle={{ position: 'sticky' }} />
    </div>
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-2 md:gap-6">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form action="#" method="POST">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-white px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Recipient Information
                </h3>
                <p className="mt-1 mb-5 text-sm text-gray-500">
                  Enter information about the recipient of this invoice.
                </p>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <TextFieldRequired
                      label="Name"
                      name="name"
                      width="w-full"
                      onChange={handleChange}
                      value={name}
                      error={error}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <EmailField
                      label="Email address"
                      name="email"
                      width="w-full"
                      onChange={handleChange}
                      value={email}
                      error={error}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <CountriesField
                      tempInfo={tempRecipientInfo}
                      setTempInfo={setTempRecipientInfo}
                    />
                  </div>

                  <div className="col-span-6">
                    <TextField
                      label="Address line 1"
                      name="addressLine1"
                      width="w-full"
                      onChange={handleChange}
                      value={addressLine1}
                    />
                  </div>
                  <div className="col-span-6">
                    <TextField
                      label="Address line 2"
                      name="addressLine2"
                      width="w-full"
                      onChange={handleChange}
                      value={addressLine2}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <TextField
                      label="City"
                      name="city"
                      width="w-full"
                      onChange={handleChange}
                      value={city}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <TextField
                      label="State / Province"
                      name="county"
                      width="w-full"
                      onChange={handleChange}
                      value={county}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <TextField
                      label="ZIP / Postal code"
                      name="postalCode"
                      width="w-full"
                      onChange={handleChange}
                      value={postalCode}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
    </>
  )
}
