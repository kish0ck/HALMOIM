import React from 'react'
import { NavLink } from 'react-router-dom'
import './Nav.css'

const Nav = () => {
  return (
    <div className="header">
    <NavLink exact className="item" activeClassName="active" to="/moim">
      모임
    </NavLink>
    <NavLink exact className="item" activeClassName="active" to="/friend">
      친구
    </NavLink>
    <NavLink exact className="item" activeClassName="active" to="/chat">
      채팅
    </NavLink>
    <NavLink exact className="item" activeClassName="active" to="/myInfo">
      내정보
    </NavLink>
  </div>
  )
}

export default Nav
