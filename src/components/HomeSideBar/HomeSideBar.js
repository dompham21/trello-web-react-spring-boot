import React from 'react'
import "./HomeSideBar.scss"
import {MdOutlineDashboard, MdWorkspacesOutline, MdOutlineMapsHomeWork} from 'react-icons/md';

function HomeSideBar() {
  return (
    <div className="home-sidebar">
        <ul>
            <li className="is-active">
                <MdOutlineDashboard/>
                <span>Boards</span>
            </li>
            <li>
                <MdWorkspacesOutline/>
                <span>My workspace</span>
            </li>
            <li>
                <MdOutlineMapsHomeWork/>
                <span>Home</span>
            </li>
        </ul>
    </div>
  )
}

export default HomeSideBar