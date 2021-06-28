import React, { useState, useEffect } from 'react'
import {
  Link,
  useHistory,
  useLocation,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/userActions'
import {
  Button,
  Col,
  Form,
  Row,
  Alert,
} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const redirect =
    useLocation().search?.split('=')[1] || '/'

  const history = useHistory()

  const dipatch = useDispatch()
  const { loading, error, userInfo } = useSelector(
    (state) => state.loginState
  )

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [userInfo, history, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dipatch(login(email, password, history))
  }

  return loading ? (
    <>loading ...</>
  ) : (
    <>
      <h1>Sign In</h1>
      <FormContainer>
        {error && (
          <Alert variant="danger">{error}</Alert>
        )}
        <Form
          onSubmit={submitHandler}
          autoComplete="off"
        >
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              className="rounded-pill"
              type="email"
              placeholder="Enter email"
              autoComplete="off"
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
              value={password}
              autoComplete="new-password"
              onChange={(e) =>
                setPassword(e.target.value)
              }
            ></Form.Control>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="rounded-pill py-2"
          >
            Sign In
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            {' '}
            create new user ?{' '}
            <Link
              to={
                redirect
                  ? `/register?redirect=${redirect}`
                  : '/register'
              }
            >
              Register
            </Link>{' '}
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}

export default Login
