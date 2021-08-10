import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Modal,
  Form,
  Row,
} from 'react-bootstrap'
import { addCateToColl } from '../redux/actions/collectionActions'
import { placeOrder } from '../redux/actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'
import { useMessageValue } from '../context/message'

const CateModal = ({
  show,
  handleClose,
  coll,
  categories,
  userInfo,
}) => {
  // active category
  const [category, setCategory] = useState(
    categories[0]
  )
  const [authority, setAuthority] = useState('')
  const [followed, setFollowed] = useState('')
  const [recipient, setRecipient] = useState('')

  const dispatch = useDispatch()

  //load update category
  const { loading, success, error } = useSelector(
    (state) => state.addCollToCateState
  )

  //load update category
  const {
    loading: orderLoading,
    success: orderSuccess,
    error: orderError,
  } = useSelector((state) => state.createOrderState)

  // message cntext
  const { setMessage, setShowMessage, setVariant } =
    useMessageValue()

  // show message
  useEffect(() => {
    if (success) {
      setMessage('collection envoyée avec succès')
      setVariant('success')
      setShowMessage(true)
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

  useEffect(() => {
    if (orderSuccess) {
      setMessage('a new order placed successfully')
      setVariant('success')
      setShowMessage(true)
    }
    if (orderError) {
      setMessage(orderError)
      setVariant('danger')
      setShowMessage(true)
    }
  }, [
    orderSuccess,
    orderError,
    setMessage,
    setShowMessage,
    setVariant,
  ])

  // handel submit
  const handelSubmit = (e) => {
    e.preventDefault()
    if (category === null) {
      setMessage('please choose a category ')
      setVariant('danger')
      setShowMessage(true)
    } else {
      dispatch(
        addCateToColl(
          coll._id,
          category._id,
          authority,
          followed
        )
      )
      handleClose()
    }
  }

  // handel cate change
  const handelCtaeChange = (e) => {
    const cate = categories?.filter(
      (cate) => cate._id === e.target.value
    )
    setCategory(cate[0])
  }

  // useEffect(() => {
  //   console.log(category)
  // }, [category])

  const handlePlaceOrder = () => {
    if (recipient === '') {
      setMessage('veuillez remplir toutes les entrées')
      setVariant('danger')
      setShowMessage(true)
    } else {
      dispatch(placeOrder(coll, recipient))
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{coll.title}</Modal.Title>
        </Modal.Header>
        {loading || orderLoading ? (
          <>updating ...</>
        ) : (
          <>
            {categories.length !== 0 ||
            userInfo.user.role === 'service3' ? (
              <>
                <Modal.Body>
                  <Form>
                    {categories.length !== 0 &&
                    userInfo.user.role ===
                      'service2' ? (
                      <>
                        <Form.Group>
                          <Form.Label
                            as={Row}
                            className="mx-2"
                          >
                            choisissez une catégorie (
                            <Link to="/new_category">
                              cliquez ici pour en créer
                              un nouveau
                            </Link>
                            )
                          </Form.Label>

                          <Row className="m-2">
                            <Form.Control
                              as="select"
                              value={category._id}
                              onChange={
                                handelCtaeChange
                              }
                            >
                              {categories?.map(
                                (cate, i) => (
                                  <option
                                    key={`${cate._id}${i}${coll._id}`}
                                    value={`${cate._id}`}
                                  >
                                    {cate.name}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Row>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label
                            as={Row}
                            className="m-2"
                          >
                            autorité
                          </Form.Label>
                          <Row className="mx-2">
                            <Form.Control
                              type="text"
                              value={authority}
                              onChange={(e) =>
                                setAuthority(
                                  e.target.value
                                )
                              }
                              placeholder="autorité"
                            />
                          </Row>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label
                            as={Row}
                            className="m-2"
                          >
                            suivie
                          </Form.Label>
                          <Row className="mx-2">
                            <Form.Control
                              type="text"
                              value={followed}
                              onChange={(e) =>
                                setFollowed(
                                  e.target.value
                                )
                              }
                              placeholder="suivie"
                            />
                          </Row>
                        </Form.Group>
                      </>
                    ) : (
                      <Form.Group>
                        <Form.Label
                          as={Row}
                          className="m-2"
                        >
                          destinataire
                        </Form.Label>
                        <Row className="mx-2">
                          <Form.Control
                            type="text"
                            onChange={(e) =>
                              setRecipient(
                                e.target.value
                              )
                            }
                            value={recipient}
                            placeholder="destinataire"
                          />
                        </Row>
                      </Form.Group>
                    )}
                  </Form>
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    variant="secondary"
                    className="btn-sm"
                    onClick={handleClose}
                  >
                    Annuler
                  </Button>
                  {userInfo.user.role ===
                    'service2' && (
                    <Button
                      variant="primary"
                      className="btn-sm"
                      onClick={handelSubmit}
                    >
                      suivant
                    </Button>
                  )}

                  {userInfo.user.role ===
                    'service3' && (
                    <Button
                      variant="primary"
                      className="btn-sm"
                      onClick={handlePlaceOrder}
                    >
                      Passer ordre
                    </Button>
                  )}
                </Modal.Footer>
              </>
            ) : (
              <Modal.Body>
                <Form.Label as={Row} className="mx-2">
                  il y a 0 catégorie (
                  <Link to="/new_category">
                    cliquez ici pour en créer un
                    nouveau
                  </Link>
                  )
                </Form.Label>
              </Modal.Body>
            )}
          </>
        )}
      </Modal>
    </>
  )
}

export default CateModal
