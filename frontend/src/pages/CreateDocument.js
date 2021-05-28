import React from 'react'
import {
  Form,
  Row,
  Col,
  Button,
} from 'react-bootstrap'

const CreateDocument = () => {
  return (
    <>
      <h3>create new document</h3>
      <Form>
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
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="m-2">
                  <Form.Label htmlFor="date">
                    Date
                  </Form.Label>
                  <Form.Control
                    id="date"
                    className="rounded-pill"
                    type="text"
                    placeholder="Date"
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
                    style={{ resize: 'none' }}
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
                  controlId="exampleForm.ControlTextarea"
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
                      resize: 'none',
                    }}
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
                    type="submit"
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
