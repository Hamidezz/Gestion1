import React /*, { useEffect, useState }*/ from 'react'
import { Row, Col } from 'react-bootstrap'
import { MdNotificationsActive } from 'react-icons/md'
import {
  RiMenuFoldLine,
  RiMenuUnfoldLine,
} from 'react-icons/ri'
import { useSideBarValue } from '../context/sideBar'

const Header = () => {
  const { show, setShow } = useSideBarValue()
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
          <MdNotificationsActive />
        </div>
      </Col>
    </Row>
  )
}

export default Header
