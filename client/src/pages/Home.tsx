import { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
  const [test, setTest] = useState('')

  useEffect(() => {
    axios.get('/api')
      .then(response => {
        console.log(response)
        setTest(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <section className=''>
      <h1 className='text-3xl font-bold underline'>
        Saludo desde api de pqrs:
      </h1>
      <span>
        {test}
      </span>
    </section>
  )
}

export default Home