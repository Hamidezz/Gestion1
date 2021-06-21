import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getHistories } from '../redux/actions/historyActions'
import History from '../components/History'
import { Alert, Tabs, Tab } from 'react-bootstrap'

const ViewHistory = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  // load user Info
  const { userInfo, error: authError } = useSelector(
    (state) => state.loginState
  )
  // load historiesState
  const { loading, error, histories } = useSelector(
    (state) => state.getHistoriesState
  )

  useEffect(() => {
    const isAuthorised = (...roles) => {
      return !userInfo
        ? false
        : roles.includes(userInfo.user.role)
    }
    if (!userInfo || isAuthorised('admin') === false) {
      history.push('/')
    } else {
      dispatch(getHistories())
    }
  }, [userInfo, history, authError, dispatch])

  const [activeTab, setActiveTab] =
    useState('documents')
  if (error) {
    return <Alert variant="danger">{error}</Alert>
  }
  return loading ? (
    <>loading ...</>
  ) : (
    <div>
      <h1>historique</h1>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mr-0 h5 tabs-wrapper"
      >
        <Tab eventKey="documents" title="documents">
          <History
            filterBy="documents"
            histories={histories}
            userInfo={userInfo}
          />
        </Tab>
        <Tab eventKey="categories" title="categories">
          <History
            filterBy="categories"
            histories={histories}
          />
        </Tab>
        <Tab eventKey="orders" title="orders">
          <History
            filterBy="orders"
            histories={histories}
          />
        </Tab>
      </Tabs>
    </div>
  )
}

export default ViewHistory
