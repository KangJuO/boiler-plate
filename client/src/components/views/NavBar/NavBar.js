import React, { useState } from 'react'
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons';
import './Sections/Navbar.css';


function NavBar(props) {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    
    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
        setVisible(true)
    };

    const onClose = () => {
        setVisible(false)
    };
    
    const logoutHandler = () => {
      
      //console.log(props)
      // //console.log(user);
      const body = {
        _id: user.userData._id
      }

      dispatch(logoutUser(body))
            .then(response => {
              
              console.log(response)
                if(response.payload.success){

                    props.history.push('/login');
                } else{
                    alert('Error');
                }
            })
    }


    return (
        <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <a href="/">Logo</a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <div className="menu_right">
          <RightMenu
            mode="horizontal"
            logoutHandler={logoutHandler} />
        </div>
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
        <MenuFoldOutlined />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu
            mode="inline"
            logoutHandler={logoutHandler} />
        </Drawer>
      </div>
    </nav>
    )
}

export default withRouter(NavBar)
