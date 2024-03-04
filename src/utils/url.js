import dotenv from 'dotenv'
dotenv.config()

const urlstandart = process.env.REACT_APP_IP + process.env.REACT_APP_PORT + process.env.REACT_APP_CONTEXTROOT + process.env.REACT_APP_FASE2_BASE
const urllogin = process.env.REACT_APP_IP + process.env.REACT_APP_PORT  + process.env.REACT_APP_CONTEXTROOT 

export { urlstandart , urllogin }



