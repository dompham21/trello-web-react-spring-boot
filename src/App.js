import React,  { Suspense } from 'react'
import BoardPage from 'Page/BoardPage/BoardPage'
import PublicRouter from 'Router/PublicRouter'
import HomePage from 'Page/Home/HomePage'
import {Switch} from "react-router-dom";
import './App.scss'
import AppBar from 'components/AppBar/AppBar';

function App() {
  return (
    
    <Suspense fallback={(<div>Loading...</div>)}>
      <div className="main">
        <Switch>
          <PublicRouter restricted={true} component={BoardPage} path="/board/:id"/>
          <PublicRouter exact path="/" component={HomePage}/>
        </Switch>
      </div>
    </Suspense>
 
  )
}

export default App
