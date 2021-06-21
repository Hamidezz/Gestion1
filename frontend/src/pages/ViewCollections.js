import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getCollections } from '../redux/actions/collectionActions'

import Collection from '../components/Collection'
import { getCategories } from '../redux/actions/categoryActions'
import { deleteCollection } from '../redux/actions/collectionActions'
import { useMessageValue } from '../context/message'

const ViewCollections = () => {
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
  // load categories
  const { categories, loading: cateLoad } =
    useSelector((state) => state.categoriesState)
  // load delete collection state
  const { success: deletSuccess, error: deleteError } =
    useSelector((state) => state.deleteCollState)

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
      isAuthorised('admin', 'service1', 'service2') ===
        false
    ) {
      history.push('/')
    } else {
      dispatch(getCollections())
      dispatch(getCategories())
    }
  }, [userInfo, history, authError, dispatch])

  // message cntext
  const { setMessage, setShowMessage, setVariant } =
    useMessageValue()

  // show message
  useEffect(() => {
    if (deletSuccess) {
      setMessage('collection supprimée avec succès')
      setVariant('success')
      setShowMessage(true)
    }
    if (error || deleteError) {
      setMessage(error || deleteError)
      setVariant('danger')
      setShowMessage(true)
    }
  }, [
    error,
    setMessage,
    setShowMessage,
    setVariant,
    deletSuccess,
    deleteError,
  ])

  const onDeleteColl = (id) => {
    dispatch(deleteCollection(id))
  }

  return loading || cateLoad ? (
    <>loading ..</>
  ) : (
    <>
      <h1>documents reçus</h1>

      <Accordion onSelect={(e) => setActiveKey(e)}>
        {collections
          ?.filter(({ status }) => status === 'new')
          .map((coll) => (
            <div key={coll._id}>
              <Collection
                coll={coll}
                activeKey={activeKey}
                categories={categories}
                onDeleteColl={onDeleteColl}
              />
            </div>
          ))}
      </Accordion>
      {/*  */}
    </>
  )
}

export default ViewCollections
