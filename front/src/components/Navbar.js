import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import { Breadcrumb } from 'antd';
import {SidebarData} from './SIdebarData';
import './Navbar.css';


function Navbar() {
    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () =>setSidebar(!sidebar);

    return ( 
        <>
         <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
            <a href="">Application Center</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
            <a href="">Application List</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
        </>
    )
}

export default Navbar
