import { useCallback } from "react"
import type { Note, CreateNoteData, UpdatedNoteData } from "@/types"
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createNote = useCallback(async (note: CreateNoteData): Promise<Note | null> => {
    try {
      const token = await getToken()
      if (!token) {
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
    } catch (err) {
      console.error("Failed to create note:", err)
      return null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getNoteById = useCallback(async (id:string) => {
    const token = await getToken()
    if (!token) {
      console.error("No token found")
      return null
    }
    const res = await fetch(API_BASE_URL + `/api/notes/${id}`,{
      headers:{
        "Authorization" : `Bearer ${token}`
      }
    })
    if (!res.ok) {
      console.error("Failed to fetch note:", res)
      return null
    }
    const data:{note:Note} = await res.json()
    return data.note
  }, [getToken])

  const updateNote = async (id:string, note:UpdatedNoteData) => {
    const token = await getToken()
    if(!token){
      console.error("No token found")
      return null
    }

    const res = await fetch(API_BASE_URL + `/api/notes/${id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(note)
    })
    if (!res.ok) {
      console.error("Failed to update note:", res)
      return null
    }
    const data:{note:Note} = await res.json()
    return data.note
  }

  const deleteNote = async (id: string) => {
    const token = await getToken()
    if(!token){
      console.error("No token found")
      return false
    }
    const res = await fetch(API_BASE_URL + `/api/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    return res.ok
  }

  return { getAllNotes, createNote, getNoteById, updateNote, deleteNote }
}

export default useNotesAPI