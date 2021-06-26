import React /*, { useEffect, useState }*/ from 'react'
import { Row, Col } from 'react-bootstrap'

import {
  RiMenuFoldLine,
  RiMenuUnfoldLine,
} from 'react-icons/ri'
import { useSideBarValue } from '../context/sideBar'

import { IoMdLogIn, IoMdLogOut } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../redux/actions/userActions'
// import { MdNotificationsActive } from 'react-icons/md'

const Header = () => {
  const { show, setShow } = useSideBarValue()

  const dispatch = useDispatch()
  const history = useHistory()

  // load user Info
  const { userInfo } = useSelector(
    (state) => state.loginState
  )

  return (
    <Row className="justify-content-between w-100 mb-4 header">
      <Col>
        <div onClick={() => setShow(!show)}>
          {show ? (
            <RiMenuFoldLine />
          ) : (
            <RiMenuUnfoldLine />
          )}
        </div>
      </Col>
      <Col className="d-flex justify-content-end">
        <div className="notification">
          {userInfo ? (
            <IoMdLogOut
              onClick={() => dispatch(logout(history))}
            />
          ) : (
            <Link to="/login">
              <IoMdLogIn />
            </Link>
          )}
          {/* <MdNotificationsActive /> */}
        </div>
      </Col>
    </Row>
  )
}

export default Header
