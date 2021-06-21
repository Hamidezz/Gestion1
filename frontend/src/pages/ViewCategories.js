import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteCategory,
  getCategories,
} from '../redux/actions/categoryActions'
import moment from 'moment'
import 'moment/locale/fr'
import Message from '../components/Message'
import { AiOutlineEye } from 'react-icons/ai'
import { FaTrashAlt } from 'react-icons/fa'

const ViewCategories = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  // load user Info
  const { userInfo, error: authError } = useSelector(
    (state) => state.loginState
  )

  // load categories
  const { categories, loading, error } = useSelector(
    (state) => state.categoriesState
  )

  // load categories
  const {
    success: deleteSuccess,
    error: deleteError,
  } = useSelector((state) => state.deleteCateState)

  useEffect(() => {
    const isAuthorised = (...roles) => {
      return !userInfo
        ? false
        : roles.includes(userInfo.user.role)
    }
    if (
      !userInfo ||
      isAuthorised('admin', 'service2') === false
    ) {
      history.push('/')
    } else {
      dispatch(getCategories())
    }
  }, [
    userInfo,
    history,
    authError,
    dispatch,
    deleteSuccess,
  ])

  const ondeleteCategory = (id) => {
    console.log(id)
    dispatch(deleteCategory(id))
  }

  return loading ? (
    <>loading ...</>
  ) : (
    <>
      <h1>Categories</h1>
      {(error || deleteError) && (
        <Message variant="danger">
          {error || deleteError}
        </Message>
      )}
      {categories?.length === 0 && (
        <Message>there is no documenst</Message>
      )}
      <Table
        bordered
        hover
        responsive
        className="table-sm"
      >
        <thead>
          <tr>
            <th>category</th>
            <th>créé à</th>
            <th
              style={{
                borderTop: 'none',
                borderRight: 'none',
              }}
            ></th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((cate, i) => (
            <tr key={i}>
              <td>{cate.name}</td>

              <td>
                {moment(cate.createdAt)
                  .locale('fr')
                  .format('LLL')}
              </td>
              <td style={{ textAlign: 'center' }}>
                <div
                  style={{ cursor: 'pointer' }}
                  className="icon bg-info text-light"
                >
                  <AiOutlineEye />
                </div>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    ondeleteCategory(cate._id)
                  }
                  className="icon bg-danger text-light"
                >
                  <FaTrashAlt />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default ViewCategories
