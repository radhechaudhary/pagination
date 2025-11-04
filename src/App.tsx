import { useState, useEffect } from 'react'
import axios from 'axios'
import Table from './table'
import './App.css'

function App() {
  const [data, setData] = useState([])
    const [info, setInfo] = useState([])
    const [selectedProducts, setSelectedProducts] = useState([])
    useEffect(()=>{
        axios.get('https://api.artic.edu/api/v1/artworks?page=1')
        .then((res: any)=>{
            setData(res.data.data )
            setInfo(res.data.pagination)
        })
    },[])

    const onPageChange = (e:{page:number})=>{
      console.log(e.page)
      axios.get(`https://api.artic.edu/api/v1/artworks?page=${e.page+1}`)
      .then((res: {data:any})=>{
            setData(res.data.data )
            setInfo(res.data.pagination)
      })
    }

  return (
    <div className='w-full flex justify-center p-5 bg-blue-50'>
      <Table data={data} info={info} onPageChange={onPageChange} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts}/>
    </div>
        
  )
}

export default App
