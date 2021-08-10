import React, {
  useState,
  useEffect,
  useCallback,
} from 'react'
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
  Alert,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { register } from '../redux/actions/userActions'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [confirmPassword, setConfirmPassword] =
    useState('')
  const [message, setMessage] = useState(null)

  const redirect =
    useLocation().search?.split('=')[1] || '/'

  const history = useHistory()

  const dispatch = useDispatch()

  const { loading, error} = useSelector(
    (state) => state.registerState
  )
  const {userInfo } = useSelector(
    (state) => state.loginState
  )
  const isAuthorised = useCallback(
    (...roles) => {
      return !userInfo
        ? false
        : roles.includes(userInfo.user.role)
    },
    [userInfo]
  )
  useEffect(() => {
    if (!userInfo  || isAuthorised('admin') === false) {
      history.push('/')
    }
  }, [userInfo, history,isAuthorised])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage(
        'password and confirm password do not match'
      )
    } else {
      setMessage(null)
      dispatch(
        register(name, email, password, role, history)
      )
    }
  }

  return loading ? (
    <>Loading ...</>
  ) : (
    <>
      <h1>Register new user </h1>
      <FormContainer>
        {error && (
          <Alert variant="danger">{error}</Alert>
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
          <Form.Group controlId="email">
            <Form.Label>role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {isAuthorised('admin') && (
                <option value="admin">admin</option>
              )}

              <option value="service1">
                service1
              </option>
              <option value="service2">
                service2
              </option>
              <option value="service3">
                service3
              </option>
            </Form.Control>
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