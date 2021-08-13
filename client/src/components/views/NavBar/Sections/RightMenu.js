import React from 'react';
import { Menu } from 'antd';
import { useSelector } from "react-redux";


function RightMenu(props) {
  const user = useSelector(state => state.user)
  
  const logoutHandler = () => {
    props.logoutHandler()
    
  }

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default RightMenu;