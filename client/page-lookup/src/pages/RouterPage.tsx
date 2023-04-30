import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './MainPage'
import UserProvider from '../hooks/UserProvider'

const RouterPage = () => {

    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route index element={<MainPage />} />
                </Routes>
            </BrowserRouter>
        </UserProvider>
        
    )
}

export default RouterPage;