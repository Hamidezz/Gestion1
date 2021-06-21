import React, { useState } from 'react'
import {
  Accordion,
  Button,
  Row,
  Table,
  Alert,
} from 'react-bootstrap'
import moment from 'moment'
import 'moment/locale/fr'
import CateModal from './Modal'
import {
  FaRegArrowAltCircleDown,
  FaRegArrowAltCircleUp,
} from 'react-icons/fa'
import { useSelector } from 'react-redux'

const Collection = ({
  coll,
  activeKey,
  categories,
  onDeleteColl,
}) => {
  // modal handler
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // accordion handler
  const [open, setOpen] = useState('non')

  // load user Info
  const { userInfo } = useSelector(
    (state) => state.loginState
  )

  return (
    <div className="border mb-2">
      <Row className="collHeader justify-content-between w-100 mt-4 px-4 pb-4">
        <h5 className="f">
          {coll.title}{' '}
          <small className="text-info">
            {moment(coll.createdAt)
              .locale('fr')
              .format('LLL')}
          </small>{' '}
          [{coll.documents.length}]
        </h5>

        <div className="d-flex flex-grow-1 justify-content-end">
          <Accordion.Toggle
            onClick={() => setOpen(coll._id)}
            eventKey={coll._id}
            as="i"
            className="btn btn-sm px-2 text-success"
          >
            {open === activeKey ? (
              <FaRegArrowAltCircleUp
                style={{
                  width: '22px',
                  height: '22px',
                }}
              />
            ) : (
              <FaRegArrowAltCircleDown
                style={{
                  width: '22px',
                  height: '22px',
                }}
              />
            )}
          </Accordion.Toggle>
        </div>
      </Row>
      <Accordion.Collapse eventKey={coll._id}>
        <>
          {coll.documents.length < 1 ? (
            <Alert variant="danger">
              mayb documents are deleted
            </Alert>
          ) : (
            <Table
              striped
              bordered
              hover
              responsive
              className="table-sm"
            >
              <thead>
                <tr>
                  <th>document nombre</th>
                  <th>objet</th>
                  <th>nom/Prenom</th>
                  <th>cin</th>
                  <th>ville/Province</th>
                  <th>fonction</th>
                </tr>
              </thead>
              <tbody>
                {coll.documents.length}
                <>
                  {coll.documents[0].doc &&
                    coll.documents?.map(
                      (document, i) => (
                        <tr key={i}>
                          <td className="align-middle">
                            {document.doc.documentNum}
                          </td>
                          <td className="align-middle">
                            {document.doc.object}
                          </td>
                          <td className="align-middle">
                            {document.doc.firstName}{' '}
                            {document.doc.lastName}
                          </td>
                          <td className="align-middle">
                            {document.doc.cin}
                          </td>
                          <td className="align-middle">
                            {document.doc.city}{' '}
                            {document.doc.province}
                          </td>
                          <td className="align-middle">
                            {document.doc.profession}
                          </td>
                        </tr>
                      )
                    )}
                </>
              </tbody>
            </Table>
          )}

          <Row className="d-flex justify-content-end mx-2 my-1">
            {userInfo.user.role === 'service2' && ( //change it later
              <Button
                className="btn-sm  mr-1"
                onClick={handleShow}
              >
                ajouter à la catégorie (trier)
              </Button>
            )}

            {userInfo.user.role === 'service3' && (
              <Button
                className="btn-sm  mr-1"
                onClick={handleShow}
              >
                place order
              </Button>
            )}

            {userInfo.user.role === 'service1' && (
              <Button
                variant="danger"
                className="btn-sm"
                onClick={() => onDeleteColl(coll._id)}
              >
                suprimer
              </Button>
            )}
          </Row>
          {/* modal */}
          <CateModal
            show={show}
            handleClose={handleClose}
            coll={coll}
            categories={categories}
            userInfo={userInfo}
          />
        </>
      </Accordion.Collapse>
    </div>
  )
}

export default Collection
