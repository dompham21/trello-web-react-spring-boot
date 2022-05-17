import AppBar from 'components/AppBar/AppBar'
import HomeSideBar from 'components/HomeSideBar/HomeSideBar'
import HomeWorkSpace from 'components/HomeWorkSpace/HomeWorkSpace'
import React, { Fragment } from 'react'
import "./HomePage.scss"


function HomePage() {
  return (
    <Fragment>
      <AppBar/>
      <div className="home-content">
          <HomeSideBar/>
          <HomeWorkSpace/>
      </div>
    </Fragment>
    
  )
}

export default HomePage