import Layout from './components/Layout.jsx'
import { Outlet } from 'react-router-dom'

function App() {
   return ( 
    <Layout>
      <Outlet />
    </Layout>
  )
}

export default App
