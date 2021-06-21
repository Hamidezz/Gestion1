import React, { useState, useEffect } from 'react'
import {
  Form,
  Row,
  Col,
  Button,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useMessageValue } from '../context/message'
import { createCategory } from '../redux/actions/categoryActions'
import Message from './../components/Message'

const CreateCategory = () => {
  const [cateName, setCateName] = useState('')

  const history = useHistory()
  const dispatch = useDispatch()

  // load documents
  const { loading, error, success } = useSelector(
    (state) => state.newCateState
  )

  const handelSubmit = (e) => {
    e.preventDefault()
    dispatch(createCategory(cateName))
  }
  // reset inputs
  const reset = () => {
    setCateName('')
  }

  // message cntext
  const { setMessage, setShowMessage, setVariant } =
    useMessageValue()

  // show message
  useEffect(() => {
    if (success) {
      setMessage('nouveau catégorie créé avec succès')
      setVariant('success')
      setShowMessage(true)
      reset()
    }
    if (error) {
      setMessage(error)
      setVariant('danger')
      setShowMessage(true)
    }
  }, [
    error,
    setMessage,
    setShowMessage,
    setVariant,
    success,
  ])

  // load user Info
  const { userInfo } = useSelector(
    (state) => state.loginState
  )

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
    }
  }, [userInfo, history])

  return loading ? (
    <>Loading ...</>
  ) : (
    <>
      <h3>create new category</h3>
      {error && (
        <Message variant="danger">{error}</Message>
      )}
      {success && (
        <Message variant="danger">
          new category create successfully
        </Message>
      )}
      <Form onSubmit={handelSubmit}>
        <Row xs={1} md={1} xl={2}>
          <Col>
            <Row xs={1} md={2} xl={2}>
              <Col>
                <Form.Group className="m-2">
                  <Form.Label htmlFor="categoryNom">
                    Nom de category
                  </Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setCateName(e.target.value)
                    }
                    id="categoryNom"
                    value={cateName}
                    className="rounded-pill"
                    type="text"
                    placeholder="Nom de category"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row className="mt-4 w-100 justify-content-end">
              <Button
                type="submit"
                variant="primary"
                className="py-2 mr-2 mt-2 rounded-pill"
              >
                submit
              </Button>
              <Button
                onClick={reset}
                variant="primary"
                className="py-1 ml-2 mt-2 rounded-pill"
              >
                reset
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default CreateCategory
