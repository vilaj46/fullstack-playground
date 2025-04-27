"use client"

import { useEffect, useState } from "react"
import axios from "axios"

export default function Home() {
  const [res, setRes] = useState("")

  useEffect(() => {
    const fetchHelloWorld = async () => {
      try {
        const response = await axios.get(
          process.env.NODE_ENV === "development"
            ? "http://localhost:8080/"
            : "api.julianvila.com"
        )
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
