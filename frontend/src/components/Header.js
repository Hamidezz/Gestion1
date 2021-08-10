import React /*, { useEffect, useState }*/ from 'react'
import { Row, Col } from 'react-bootstrap'
<<<<<<< HEAD
=======

import {
  RiMenuFoldLine,
  RiMenuUnfoldLine,
} from 'react-icons/ri'
>>>>>>> 1f89c9805bb741da3be9f3279792c0db90078101
import { useSideBarValue } from '../context/sideBar'
import { RiMenuFoldLine, RiMenuUnfoldLine,} from 'react-icons/ri'
import { useSelector , useDispatch } from 'react-redux'
import { Link , useHistory } from 'react-router-dom'
import { logout } from '../redux/actions/userActions'
import { Button } from 'react-bootstrap'

import { IoMdLogIn, IoMdLogOut } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../redux/actions/userActions'
// import { MdNotificationsActive } from 'react-icons/md'

const Header = () => {
  const { show, setShow } = useSideBarValue()
<<<<<<< HEAD
  const dispatch = useDispatch()
  const history = useHistory()

  // load user info
=======

  const dispatch = useDispatch()
  const history = useHistory()

  // load user Info
>>>>>>> 1f89c9805bb741da3be9f3279792c0db90078101
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
<<<<<<< HEAD
          {userInfo ?(
            <Button
                  onClick={() => dispatch(logout(history))}
                  variant="dark"
                  className="py-2 mt-2 rounded"
                  >
                    Se Déconnecter
                    </Button>
          ) : (
            <Link to="/login">
              <Button
              variant="dark"
              className="py-2 mt-2 rounded"
              >
                 Connexion
                 </Button>
            </Link>
          )}
=======
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
>>>>>>> 1f89c9805bb741da3be9f3279792c0db90078101
        </div>
      </Col>
    </Row>
  )
}

export default Header
