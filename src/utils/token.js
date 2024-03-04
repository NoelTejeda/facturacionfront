import jwtDecode from "jwt-decode";
import { TOKEN } from "./constants";

export function setToken(token) {
    localStorage.setItem(TOKEN, token)
}

export function getToken() {
    return localStorage.getItem(TOKEN)
}

export function decodeToken(token) {
    return jwtDecode(token)
}

export function removeToken() {
    localStorage.removeItem(TOKEN)
   
}

export function removeSesion(iat){
    const date = new Date(iat*1000)
    const now = new Date()
    date <= now ? removeToken() : console.log("No se ha Cerrado Sesion") 
    
    /*if (date <= now){
        removeToken()

      }else{
        return false
        setInterval("window.reload()")///No Sirve Creaun Loop  al momento de cerrar la sesion
    }*/
}