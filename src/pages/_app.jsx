import 'focus-visible'
import '../styles/tailwind.css'
import { StateContext } from '../context/stateContext'
import { useState, useContext } from 'react'

export default function App({ Component, pageProps }) {
  const stateContext = useContext(StateContext)
  const [masterState, setMasterState] = useState(stateContext.masterState)

  return (
    <>
      <StateContext.Provider value={{ masterState, setMasterState }}>
        <Component {...pageProps} />
      </StateContext.Provider>
    </>
  )
}
