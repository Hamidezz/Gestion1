import React /*, { useEffect, useState }*/ from 'react'
import { Row, Col } from 'react-bootstrap'
import { useSideBarValue } from '../context/sideBar'
import { RiMenuFoldLine, RiMenuUnfoldLine,} from 'react-icons/ri'
import { useSelector , useDispatch } from 'react-redux'
import { Link , useHistory } from 'react-router-dom'
import { logout } from '../redux/actions/userActions'
import { Button } from 'react-bootstrap'

const Header = () => {
  const { show, setShow } = useSideBarValue()
  const dispatch = useDispatch()
  const history = useHistory()

  // load user info
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
        </div>
      </Col>
    </Row>
  )
}

export default Header
