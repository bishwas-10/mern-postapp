import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate,Outlet } from 'react-router-dom'
import { SignProps, SignResultProps } from '../store/authSlice'
import { RootState } from '../store/store'
const PrivateRoute = () => {
  const {currentUser}= useSelector((state:RootState)=>state.auth)
  return currentUser ? <Outlet/> :<Navigate to='auth' />
}

export default PrivateRoute