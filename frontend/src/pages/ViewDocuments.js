import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Tabs, Tab } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDocuments,
  deleteDocument,
} from '../redux/actions/documentActions'
import Message from '../components/Message'

import Documents from '../components/Documents'
import { useMessageValue } from '../context/message'

const ViewDocuments = () => {
  const [activeTab, setActiveTab] = useState('NEW')
  
  const history = useHistory()
  const dispatch = useDispatch()

  // load user Info
  const { userInfo, error: authError } = useSelector(
    (state) => state.loginState
  )
  // load documents
  const { loading, error, documents } = useSelector(
    (state) => state.docsState
  )
  // load documents
  const {
    success: deleteSuccess,
    error: deleteError,
  } = useSelector((state) => state.deleteDocState)

  useEffect(() => {
    const isAuthorised = (...roles) => {
      return !userInfo
        ? false
        : roles.includes(userInfo.user.role)
    }

    if (
      !userInfo ||
      isAuthorised('admin', 'service1') === false
    ) {
      history.push('/')
    } else {
      dispatch(getDocuments())
    }
  }, [
    userInfo,
    history,
    authError,
    error,
    dispatch,
    deleteSuccess,
  ])
  // deleteDocState
  const ondeleteDocument = (id) => {
    dispatch(deleteDocument(id))
  }

  const { error: sendCollError, success } =
    useSelector((state) => state.newCollectionState)
  const {
    error: deletDocError,
    success: deletDocSuccess,
  } = useSelector((state) => state.deleteDocState)

  // message cntext
  const { setMessage, setShowMessage, setVariant } =
    useMessageValue()

  // show message
  useEffect(() => {
    if (deletDocSuccess) {
      setMessage('document supreme avec succès')
      setVariant('success')
      setShowMessage(true)
    }
    if (deletDocError) {
      setMessage(deletDocError)
      setVariant('danger')
      setShowMessage(true)
    }
  }, [
    deletDocError,
    setMessage,
    setShowMessage,
    setVariant,
    deletDocSuccess,
    dispatch,
  ])

  // show message
  useEffect(() => {
    if (success) {
      setMessage(
        'nouveau collection envoyer avec succès'
      )
      setVariant('success')
      setShowMessage(true)
      dispatch(getDocuments())
    }
    if (sendCollError) {
      setMessage(sendCollError)
      setVariant('danger')
      setShowMessage(true)
    }
  }, [
    sendCollError,
    setMessage,
    setShowMessage,
    setVariant,
    success,
    dispatch,
  ])

  return loading ? (
    <>loading ..</>
  ) : (
    <>
      <h1>Documents</h1>
      {(error || deleteError) && (
        <Message variant="danger">
          {error || deleteError}
        </Message>
      )}
      {documents?.length === 0 && (
        <Message>there is no documenst</Message>
      )}

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mr-0 h5 tabs-wrapper"
      >
        <Tab eventKey="NEW" title="Nouveaux">
          <Documents
            filterBy="NEW"
            documents={documents}
            userInfo={userInfo}
            ondeleteDocument={ondeleteDocument}
          />
        </Tab>
        <Tab eventKey="PENDING" title="En Attente">
          <Documents
            filterBy="PENDING"
            documents={documents}
          />
        </Tab>
        <Tab eventKey="FINISHED" title="Finit">
          <Documents
            filterBy="FINISHED"
            documents={documents}
          />
        </Tab>
        
        <Tab eventKey="ALL" title="Tout">
          <Documents
            filterBy="ALL"
            documents={documents}
            ondeleteDocument={ondeleteDocument}
          />
        </Tab>
      </Tabs>
      
    </>
  )
}

export default ViewDocuments
