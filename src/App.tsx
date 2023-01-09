import React, { useEffect } from 'react'
import './App.css'
import Layout from './lib/components/Layout'
import { useGarageStore } from './lib/store/garage'

function App() {

  const store = useGarageStore();

  useEffect(() => {
    store.setOccupied(1, 3)
  }, [])
  console.log(store)

  return (
    <Layout>

    </Layout>
  )
}

export default App
