import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../app.css'
import {
  MdDashboard,
  //MdNotificationsActive,
} from 'react-icons/md'
import { IoMdPaper } from 'react-icons/io'
import { IoLibrarySharp } from 'react-icons/io5'
import { BsCollection } from 'react-icons/bs'
import { MdReorder } from 'react-icons/md'
import { FaHistory } from 'react-icons/fa'
import Notification from './Toast'
import { useSelector } from 'react-redux'
import { useSideBarValue } from '../context/sideBar'

// side barr
const SideBar = () => {
  const { show, setShow } = useSideBarValue()
  // load user Info
  const { userInfo } = useSelector(
    (state) => state.loginState
  )

  const isAuthorised = (...roles) => {
    return !userInfo
      ? false
      : roles.includes(userInfo.user.role)
  }

  return (
    <div className={`sidebar ${show ? 'open' : ''}`}>
      <div className="sidebar-inner">
        <div className="sidebar-layout">
          <div className="sidebar-header">
            GED For documents
          </div>
          <div style={{ flexGrow: '1' }}>
            <nav className="sidebar-menu">
              <ul>
                <MenuItem
                  title="Dashboard"
                  to="/"
                  Icon={<MdDashboard />}
                />
                {isAuthorised('admin') && (
                  <MenuItem
                    title="historique"
                    to="history"
                    Icon={<FaHistory />}
                  />
                )}
              </ul>
            </nav>
            <nav className="sidebar-menu open">
              <ul>
                {isAuthorised('service1', 'admin') && (
                  <>
                    <MenuItem
                      title="documents"
                      Icon={<IoMdPaper />}
                      slideDown={true}
                      subItems={[
                        {
                          itemTitle: 'create document',
                          linkTo: '/new_document',
                        },
                        {
                          itemTitle: 'view documents',
                          linkTo: '/documents',
                        },
                      ]}
                    />
                  </>
                )}
                {isAuthorised('service2', 'admin') && (
                  <MenuItem
                    title="Categories"
                    Icon={<IoLibrarySharp />}
                    slideDown={true}
                    subItems={[
                      {
                        itemTitle: 'view categories',
                        linkTo: '/categories',
                      },
                      {
                        itemTitle: 'create category',
                        linkTo: '/new_category',
                      },
                    ]}
                  />
                )}
                {isAuthorised(
                  'service1',
                  'service2',
                  'admin'
                ) && (
                  <MenuItem
                    title="Collections"
                    Icon={<BsCollection />}
                    slideDown={true}
                    subItems={[
                      {
                        itemTitle: 'documents reçus',
                        linkTo: '/collections',
                      },
                    ]}
                  />
                )}
                {isAuthorised('service3', 'admin') && (
                  <MenuItem
                    title="Orders"
                    Icon={<MdReorder />}
                    slideDown={true}
                    subItems={[
                      {
                        itemTitle: 'all orders',
                        linkTo: '/orders',
                      },
                      {
                        itemTitle: 'place order',
                        linkTo: '/place_orders',
                      },
                    ]}
                  />
                )}
                {/* {isAuthorised('service2') && ( */}
                <Notification />
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div
        className="overlay"
        role="button"
        tabIndex="0"
        aria-label="overlay"
        onClick={() => setShow(!show)}
      ></div>
    </div>
  )
}

export default SideBar

// menu item
const MenuItem = ({
  Icon,
  to,
  title,
  slideDown,
  subItems,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  // const { show, setShow } = useSideBarValue()
  const toggleMenu = () => {
    if (!slideDown) return
    setMenuOpen(!menuOpen)
  }

  return (
    <li style={{ fontSize: '15px' }}>
      <div
        className="sidebar-inner-item"
        tabIndex="0"
        role="button"
        onClick={() => toggleMenu()}
      >
        <span className="icon-wrapper">
          <span className="icon">{Icon}</span>
        </span>
        {to ? (
          <Link
            to={to}
            className="text-light text-decoration-none item-content"
          >
            {title}
          </Link>
        ) : (
          <span className="item-content">{title}</span>
        )}

        {slideDown && (
          <span className="arrow-wrapper">
            <span
              className={`arrow ${
                menuOpen ? 'open' : ''
              }`}
            ></span>
          </span>
        )}
      </div>
      {slideDown && (
        <div
          className={`menu-slidedown ${
            menuOpen ? 'open' : ''
          }`}
        >
          <div>
            <ul>
              {subItems.map(
                ({ itemTitle, linkTo }, i) => (
                  <li key={i} className="menu-item">
                    <div
                      className="inner-item"
                      tabIndex="0"
                      role="button"
                    >
                      <Link
                        to={`${linkTo}`}
                        className="item-content"
                      >
                        {itemTitle}
                      </Link>
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </li>
  )
}
