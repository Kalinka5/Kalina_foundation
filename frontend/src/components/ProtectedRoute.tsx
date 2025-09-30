import { Navigate } from "react-router-dom"

import { useAuth } from "./AuthContext"

import { ProtectedRouteProps } from "../lib/types"

function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { isAuthorized } = useAuth()

	if (isAuthorized === undefined) {
		return <div>Loading...</div> // Show a loading state while determining authorization
	}

	return isAuthorized ? <>{children}</> : <Navigate to="/login" />
}

export default ProtectedRoute
