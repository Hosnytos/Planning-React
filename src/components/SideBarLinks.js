import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';

export const SideBarLinks = [
    {
        title : 'Accueil',
        path : '/',
        icon : <AiIcons.AiFillHome/>,
        cName : 'sidebar-link-text'
    },
    {
        title : 'Opérateur',
        path : '/',
        icon : <IoIcons.IoMdPeople/>,
        cName : 'sidebar-link-text'
    },
    {
        title : 'Compétences',
        path : '/',
        icon : <IoIcons.IoIosSchool/>,
        cName : 'sidebar-link-text'
    },
    {
        title : 'Présence',
        path : '/',
        icon : <IoIcons.IoIosPeople/>,
        cName : 'sidebar-link-text'
    },
    {
        title : 'Dashboard',
        path : '/',
        icon : <FaIcons.FaChartPie/>,
        cName : 'sidebar-link-text'
    },
    {
        title : 'Support',
        path : '/',
        icon : <MdIcons.MdContactSupport/>,
        cName : 'sidebar-link-text'
    },
]