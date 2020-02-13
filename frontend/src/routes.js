import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Dashboard from './views/Dashboard/index.js'
import Login from './views/Login/index.js'
import New from './views/New/index.js'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login}></Route>
                <Route path='/dashboard' component={Dashboard}></Route>
                <Route path='/new' component={New}></Route>
            </Switch>
        </BrowserRouter>
    )
}