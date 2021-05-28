import React from 'react'
import {
  Form,
  Row,
  Col,
  Button,
} from 'react-bootstrap'

const CreateCategory = () => {
  return (
    <>
      <h3>create new category</h3>
      <Form>
        <Row xs={1} md={1} xl={2}>
          <Col>
            <Row xs={1} md={2} xl={2}>
              <Col>
                <Form.Group className="m-2">
                  <Form.Label htmlFor="categoryNom">
                    Nom de category
                  </Form.Label>
                  <Form.Control
                    id="categoryNom"
                    className="rounded-pill"
                    type="text"
                    placeholder="Nom de category"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="m-2">
                  <Form.Label htmlFor="authority">
                    authority
                  </Form.Label>
                  <Form.Control
                    id="authority"
                    className="rounded-pill"
                    type="text"
                    placeholder="authority"
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
                type="submit"
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
