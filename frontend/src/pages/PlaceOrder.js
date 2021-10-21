import React, { useEffect, useState } from 'react'
import { Accordion, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getCollections } from '../redux/actions/collectionActions'
import { destinataire } from '../components/Modal'

import Collection from '../components/Collection'
const PlaceOrder = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  // load user Info
  const { userInfo, error: authError } = useSelector(
    (state) => state.loginState
  )
  // load collections
  const { loading, error, collections } = useSelector(
    (state) => state.collectionsState
  )
  // accordion active key
  const [activeKey, setActiveKey] = useState('')

  useEffect(() => {
    const isAuthorised = (...roles) => {
      return !userInfo
        ? false
        : roles.includes(userInfo.user.role)
    }
    if (
      !userInfo ||
      isAuthorised('admin', 'service3') === false
    ) {
      history.push('/')
    } else {
      dispatch(getCollections())
    }
  }, [userInfo, history, authError, error, dispatch])

  // set filteredColls
  const [filteredColls, setFilteredColls] = useState(
    []
  )

  useEffect(() => {
    setFilteredColls(
      collections?.filter(
        (coll) => coll.status === 'sorted'
      )
    )
  }, [collections, userInfo.user.role])

  return loading ? (
    <>loading ..</>
  ) : (
    <>
      <h1>ordres reçus</h1>
      {error && (
        <Alert variant="danger">{error}</Alert>
      )}
      {filteredColls?.length === 0 && (
        <Alert variant="info">no ordres</Alert>
      )}
      <Accordion onSelect={(e) => setActiveKey(e)}>
        {filteredColls?.map((coll) => (
          <div key={coll._id}>
            <Collection
              coll={coll}
              activeKey={activeKey}
              categories={[]}
            />
          </div>
        ))}
      </Accordion>
      {/*  */}
    </>
  )
}

export default PlaceOrder
