import 'focus-visible'
import '../styles/tailwind.css'
import { StateContext } from '../context/StateContext'
import { useState, useContext } from 'react'

export default function App({ Component, pageProps }) {
  const [masterState, setMasterState] = useState(useContext(StateContext))

  return (
    <>
      <StateContext.Provider value={{ masterState, setMasterState }}>
        <Component {...pageProps} />
      </StateContext.Provider>
    </>
  )
}
