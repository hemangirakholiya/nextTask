import React from 'react'
import styled from '@emotion/styled';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router';

const Navbars = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between; 
    padding:16px;
    position:sticky;
    top:0;
    h1{
        margin:0;
        font-size: 1.6rem;
    }
`

const LogOut = styled.div`
    width:40px;
    height:40px;
    background-color: #e9b102;
    color: white;
    border-radius:50%;   
    cursor:pointer;
    display:flex;
    align-items:center;
    justify-content:center;    
`

const Navbar = () => {
    const router = useRouter()
    const handleLogout = () => {
        router.push('/')
    }
    return (
        <Navbars>
            <h1>Products</h1>
            <LogOut onClick={handleLogout} title='Logout'><LogoutIcon fontSize="small" /></LogOut>
        </Navbars>
    )
}

export default Navbar