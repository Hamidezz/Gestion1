import React, { useEffect, useState } from 'react'
import {
  Form,
  Row,
  Col,
  Button,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Message from '../components/Message'
import { useMessageValue } from '../context/message'
import { createNewDocument } from '../redux/actions/documentActions'
import { DOCUMENT_CREATE_RESET } from '../redux/constants/documentConstants'

const CreateDocument = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [city, setCity] = useState('')
  const [documentNum, setDocumentNum] = useState('')
  const [cin, setCin] = useState('')
  const [date, setDate] = useState(
    new Date(Date.now()).toISOString().slice(0, 10)
  )
  const [province, setProvince] = useState('')
  const [profession, setProfession] = useState('')
  const [objet, setObjet] = useState('')
  const [address, setAddress] = useState('')
  const [resume, setResume] = useState('')

  const history = useHistory()

  const dispatch = useDispatch()

  // load user Info
  const { userInfo } = useSelector(
    (state) => state.loginState
  )

  // load documents
  const { loading, error, success } = useSelector(
    (state) => state.newDocState
  )

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
    }
  }, [userInfo, history])

  useEffect(() => {
    if (success) {
      dispatch({ type: DOCUMENT_CREATE_RESET })
    }
  }, [success, dispatch])

  // reset inputs
  const reset = () => {
    setFirstName('')
    setLastName('')
    setCity('')
    setDocumentNum('')
    setCin('')
    setProvince('')
    setProfession('')
    setObjet('')
    setAddress('')
    setResume('')
  }

  // message cntext
  const { setMessage, setShowMessage, setVariant } =
    useMessageValue()

  // show message
  useEffect(() => {
    if (success) {
      setMessage('nouveau document créé avec succès')
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

  const handelSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createNewDocument({
        firstName,
        lastName,
        city,
        documentNum,
        cin,
        date,
        province,
        profession,
        objet,
        resume,
        address,
      })
    )
  }

  return loading ? (
    <>Loading ...</>
  ) : (
    <>
      <h3>create new document</h3>
      {error && (
        <Message variant="danger">{error}</Message>
      )}
      <Form onSubmit={handelSubmit}>
        <Row xs={1} md={1} xl={2}>
          <Col>
            <Row xs={1} md={2} xl={2}>
              <Col>
                <Form.Group className="m-2">
                  <Form.Label htmlFor="nom">
                    nom
                  </Form.Label>
                  <Form.Control
                    id="nom"
                    className="rounded-pill"
                    type="text"
                    placeholder="nom"
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="m-2">
                  <Form.Label htmlFor="ville">
                    ville
                  </Form.Label>
                  <Form.Control
                    id="ville"
                    className="rounded-pill"
                    type="text"
                    placeholder="ville"
                    value={city}
                    onChange={(e) =>
                      setCity(e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row xs={1} md={2} xl={2}>
              <Col>
                <Form.Group className="m-2">
                  <Form.Label htmlFor="prenom">
                    Prenom
                  </Form.Label>
                  <Form.Control
                    id="prenom"
                    className="rounded-pill"
                    type="text"
                    placeholder="Prenom"
                    value={lastName}
                    onChange={(e) =>
                      setLastName(e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="m-2">
                  <Form.Label htmlFor="numDossier">
                    Num de dossier
                  </Form.Label>
                  <Form.Control
                    id="numDossier"
                    className="rounded-pill"
                    type="text"
                    placeholder="Num de dossier"
                    value={documentNum}
                    onChange={(e) =>
                      setDocumentNum(e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row xs={1} md={2} xl={2}>
              <Col>
                <Form.Group className="m-2">
                  <Form.Label htmlFor="cin">
                    CIN
                  </Form.Label>
                  <Form.Control
                    id="cin"
                    className="rounded-pill"
                    type="text"
                    placeholder="CIN"
                    value={cin}
                    onChange={(e) =>
                      setCin(e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="m-2">
                  <Form.Label htmlFor="date">
                    Date (yyyy-mm-dd)
                  </Form.Label>
                  <Form.Control
                    id="date"
                    disabled
                    className="rounded-pill"
                    type="text"
                    placeholder="Date"
                    value={date}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row xs={1} md={2} xl={2}>
              <Col>
                <Form.Group className="m-2">
                  <Form.Label htmlFor="province">
                    Province
                  </Form.Label>
                  <Form.Control
                    id="province"
                    className="rounded-pill"
                    type="text"
                    placeholder="Province"
                    value={province}
                    onChange={(e) =>
                      setProvince(e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="m-2">
                  <Form.Label htmlFor="fonction">
                    fonction
                  </Form.Label>
                  <Form.Control
                    id="fonction"
                    className="rounded-pill"
                    type="text"
                    placeholder="fonction"
                    value={profession}
                    onChange={(e) =>
                      setProfession(e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="m-2">
                  <Form.Label htmlFor="objet">
                    Objet
                  </Form.Label>
                  <Form.Control
                    id="objet"
                    className="rounded-pill"
                    type="text"
                    placeholder="Objet"
                    value={objet}
                    onChange={(e) =>
                      setObjet(e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="m-2">
                  <Form.Label htmlFor="address">
                    Address
                  </Form.Label>
                  <Form.Control
                    id="address"
                    className="rounded"
                    placeholder="Address"
                    as="textarea"
                    rows={4}
                    style={{
                      resize: 'vertical',
                      maxHeight: '150px',
                    }}
                    value={address}
                    onChange={(e) =>
                      setAddress(e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row
              style={{
                height: '100%',
              }}
            >
              <Col xs={8}>
                <Form.Group
                  style={{
                    height: '94%',
                  }}
                >
                  <Form.Label htmlFor="resume">
                    Resume
                  </Form.Label>
                  <Form.Control
                    id="resume"
                    as="textarea"
                    placeholder="Resume"
                    rows={3}
                    className="rounded"
                    style={{
                      height: '100%',
                      maxHeight: '624px',
                      resize: 'vertical',
                    }}
                    value={resume}
                    onChange={(e) =>
                      setResume(e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                <Row className="mt-4 w-100 justify-content-end">
                  <Button
                    type="submit"
                    variant="primary"
                    className="py-2 mt-2 rounded-pill"
                  >
                    submit
                  </Button>
                </Row>
                <Row className="mt-3 w-100 justify-content-end">
                  <Button
                    onClick={reset}
                    variant="primary"
                    className="py-2 rounded-pill"
                  >
                    reset
                  </Button>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default CreateDocument
