import React, { useState, useEffect } from 'react'
import {
  Link,
  useLocation,
  useHistory,
} from 'react-router-dom'
import {
  Button,
  Col,
  Form,
  Row,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import { register } from '../redux/actions/userActions'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] =
    useState('')
  const [message, setMessage] = useState(null)

  const redirect =
    useLocation().search?.split('=')[1] || '/'

  const history = useHistory()

  const dispatch = useDispatch()

  const { loading, error, userInfo } = useSelector(
    (state) => state.registerState
  )

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [userInfo, history, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage(
        'password and confirm password do not match'
      )
    } else {
      setMessage(null)
      dispatch(register(name, email, password))
    }
  }

  return loading ? (
    <>Loading ...</>
  ) : (
    <>
      <h1>Sign Up</h1>
      <FormContainer>
        {error && (
          <Message variant="danger">{error}</Message>
        )}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Name</Form.Label>
            <Form.Control
              className="rounded-pill"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              className="rounded-pill"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="rounded-pill"
              type="password"
              placeholder="Enter password"
              autoComplete="new-password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              className={`rounded-pill ${
                message
                  ? 'is-invalid border border-danger'
                  : ''
              }`}
              type="password"
              placeholder="Confirm password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            ></Form.Control>
            {message && (
              <Form.Text className="invalid-feedback">
                {message}
              </Form.Text>
            )}
          </Form.Group>

          <Button
            type="submit"
            className="rounded-pill py-2"
            variant="primary"
          >
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            {' '}
            Have an Account ?{' '}
            <Link
              to={
                redirect
                  ? `/login?redirect=${redirect}`
                  : '/login'
              }
            >
              Login
            </Link>{' '}
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}

export default Register
