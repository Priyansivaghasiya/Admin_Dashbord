import { useState } from 'react'
import './App.css'
import { Dashboard } from '@mui/icons-material'
import List from './list'
import {Navbar} from './navbar'
import { Userboard } from './userdashborde'

function App() {
  const [id, setId] = useState(null)

  return (
    <>
      <div className='first'>
        <div className='yore'>
            <h4 className='h'>YORE LOGO</h4>
            <div className='icon'>
              <Dashboard ></Dashboard>
              <h5 style={{color:'#4A85F6'}}>Dashboard</h5>
            </div>
        </div>
        <div className='dashboard2'>
          <Navbar></Navbar>
          <Userboard id={id} setId={setId}></Userboard>
          <List setId={setId}></List>
        </div>
        

          
          
      </div>

       
    </>
  )
}

export default App
