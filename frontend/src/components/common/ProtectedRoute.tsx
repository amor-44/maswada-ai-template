import { useAuth } from "@clerk/react"
import { Loader } from "lucide-react"
import { Navigate } from "react-router-dom"




export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isSignedIn,isLoaded} = useAuth()

    if (!isLoaded) {
        return <div className="flex items-center justify-center h-screen"><Loader className="size-8 text-primary" /></div>
    }

    if (!isSignedIn) {
        return <Navigate to="/sign-in" replace={true} />
    }

    return(
        <>
          {children}
        </>
    )
}

    