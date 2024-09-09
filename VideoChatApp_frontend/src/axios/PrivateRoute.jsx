import { Route,Navigate } from "react-router-dom";
import React, { useContext, useState } from 'react'
import AuthContext from "../context/AuthContext";


const PrivateRoute = ({element}) => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            
            {user ? element : <Navigate to="/login"/>
            }
        </div>
    )
}

export default PrivateRoute