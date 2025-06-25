import { useState } from 'react'
import Form from './components/molecules/Form'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=''>
      <Form />
    </div>
  )
}

export default App
