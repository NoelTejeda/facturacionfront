import { useEffect, useState } from "react"

export function useDebounce(value, delay=500){
  const [deboncedValue, setDeboncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDeboncedValue(value)
    }, delay)

    return () => { clearTimeout(timer) }
  }, [value, delay])
  
  return deboncedValue
}