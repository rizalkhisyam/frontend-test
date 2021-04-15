import React, { useEffect, useState } from 'react'
import ReactRouter from './router'
import { useSetRecoilState } from 'recoil'
import { authenticatedUser } from './store'
import axios from 'axios'

export default function App() {
  // const auth = useRecoilValue(authenticatedUser);
  const [mounted, setMounted] = useState(true);
  const setAuth = useSetRecoilState(authenticatedUser);
  
  useEffect(() => {
    const getUser = async () => {
      setMounted(false);
      try {
        let { data } = await axios.get('/api/me')
        setAuth({
          user: data.data,
          check: true,
        })
        setMounted(true);
      } catch (error) {
        setMounted(true);
        console.log('Your are not log in');
      }
    }

    getUser();
  }, [setAuth])

  if (!mounted) {
    return <div className="d-flex justify-content-center align-items-center min-vh-100">Loading ... </div>
  }

  return (
    <div>
      <ReactRouter/>
    </div>
  )
}
