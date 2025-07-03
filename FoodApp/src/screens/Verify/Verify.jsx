import { useContext, useEffect } from 'react'
import './verify.css'
import axios from 'axios'
import { storeContext } from '../../context/storeContext'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'

const Verify = () => {
  const [searchParams] = useSearchParams()
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
  const navigate = useNavigate()
  const { url, token } = useContext(storeContext)

  useEffect(() => {
    const verifyPayment = async () => {
      // If no parameters, go home
      if (!success || !orderId) {
        navigate('/')
        return
      }

      try {
        const response = await axios.post(
          `${url}/api/order/verify`,
          { success, orderId },
          { headers: { Authorization: `Bearer ${token}` } } // Try Bearer format
        )
        
        if (response.data.message === 'Not Paid') {
          window.location.href = '/' // Force navigation
        } else {
          window.location.href = '/myorders' // Force navigation
        }
      } catch (error) {
        console.log("Verify payment error:", error)
        window.location.href = '/' // Force navigation on error
      }
    }

    // Add a small delay to ensure context is loaded
    const timer = setTimeout(verifyPayment, 1000)
    return () => clearTimeout(timer)
  }, [success, orderId, url, token, navigate])

  useEffect(()=>{
        verifyPayment()
        navigate('/myorders')
    },[])

  return <Loader />
}

export default Verify
