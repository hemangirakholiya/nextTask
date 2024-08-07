import React from 'react'
import styled from '@emotion/styled';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import WorkOutlinedIcon from '@mui/icons-material/WorkOutlined';

const Sidebars = styled.div`
    width:300px;
    background-color:#262d34;
    padding:25px 0;
    position:fixed;
    height:100%;
    p{
        padding:5px 25px;
        color:#fff;
        display:flex;
        align-items:center;
        gap:5px;
        cursor:pointer;
        border-left:2px solid #e9b102;
        font-size:18px;
    }
`

const Logo = styled.div`
    color:#e9b102;
    font-size:30px;
    display:flex;
    align-items:center;
    justify-content:center;
    padding-bottom:20px;
    border-bottom:1px solid #9097a7;
    span{
        color:#fff
    }
`

const Sidebar = () => {
    return (
        <Sidebars>
            <Logo><WorkOutlinedIcon fontSize="large"/><span>Ecommerce</span></Logo>
            <p><CheckroomOutlinedIcon />Products</p>
        </Sidebars>
    )
}

export default Sidebar