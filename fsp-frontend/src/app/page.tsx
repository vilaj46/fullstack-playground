"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function Home() {
  const [res, setRes] = useState("")

  useEffect(() => {
    const fetchHelloWorld = async () => {
      try {
        const response = await axios({
          baseURL:
            process.env.NEXT_PUBLIC_NODE_ENV === "development"
              ? process.env.NEXT_PUBLIC_BACKEND_BASE_URL
              : process.env.NEXT_PUBLIC_API_URL,
          method: "GET",
        })
        setRes(response.data.result)
      } catch (err) {
        setRes(`${err}`)
      }
    }

    fetchHelloWorld()
  }, [])

  return (
    <div>
      <h1>Home :|</h1>
      <p>{res}</p>
    </div>
  )
}
