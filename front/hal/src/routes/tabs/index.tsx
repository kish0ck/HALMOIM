import React from 'react'

import Friend from './Friend'
import Chat from './Chat'
import MyInfo from './MyInfo'
import Moim from './Moim'
import ProfileUpdate from '../../components/Profile/ProfileUpdate'

import Header from '../../components/Header'
import Nav from '../../components/Nav'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import MoimContainer from '../../containers/MoimContainer'

const index = () => {
  return (
    <div>
      <Router>
        <Header />
        <Nav />
        <Switch>
          <Route path="/moim" exact component={MoimContainer} />
          <Route path="/friend" component={Friend} />
          <Route path="/chat" component={Chat} />
          <Route path="/myInfo" component={MyInfo} />
          <Route path="/profileUpdate" component={ProfileUpdate} />
          <Redirect path="*" to="/moim" />
        </Switch>
      </Router>
    </div>
  )
}
export { index, Moim, Friend, Chat, MyInfo }
