import { useCallback } from "react"
import type { Note, CreateNoteData } from "@/types"
import { useAuth } from "@clerk/react"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"


function useNotesAPI() {
  const { getToken } = useAuth()

  const getAllNotes = useCallback(async (): Promise<Note[]> => {
    const token = await getToken()
    if (!token) {
      console.error("No token found")
      return []
    }

    const response = await fetch(API_BASE_URL + "/api/notes", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    const data: { notes: Note[] } = await response.json()
    return data.notes
  }, [getToken])

  const createNote = async (note: CreateNoteData) => {
    const token = await getToken() 

    if(!token){
      console.error("No token found")
      return null
    }

    const res = await fetch(API_BASE_URL + "/api/notes", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(note)
    })
    const data: { note: Note } = await res.json()
    return data.note
  }

  return { getAllNotes, createNote }
}

export default useNotesAPI