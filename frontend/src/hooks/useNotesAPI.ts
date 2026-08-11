import type { Note } from "@/types"
import { useAuth } from "@clerk/react"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"


function useNotesAPI() {
const {getToken} = useAuth()

const getAllNotes = async () => {
  const token = await getToken()
  if(!token) {
    console.error("No token found")
    return []
  }

  const response = await fetch(API_BASE_URL + "/api/notes", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  const data: {notes: Note[]} = await response.json()
  return data.notes
}
return {getAllNotes}
}

export default useNotesAPI