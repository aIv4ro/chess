import toast from 'react-hot-toast'

const toastConfig = {
  success: (message: string) => {
    toast.success(message, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff'
      }
    })
  },
  error: (message: string) => {
    toast.success(message, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff'
      }
    })
  }
}

export default toastConfig
