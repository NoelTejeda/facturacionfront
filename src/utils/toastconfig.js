import { toast } from 'react-toastify'

export const successtoast = {
  autoClose: 1600,
  type: toast.TYPE.SUCCESS,
  hideProgressBar: false,
  position: toast.POSITION.TOP_RIGHT
}

export const errortoast = {
  autoClose: 1600,
  type: toast.TYPE.ERROR,
  hideProgressBar: false,
  position: toast.POSITION.TOP_RIGHT
}