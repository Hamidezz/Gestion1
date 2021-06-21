import React, { useCallback, useState } from 'react'
import {
  Table,
  Button,
  Row,
  Alert,
} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addDocsToCollection } from '../redux/actions/collectionActions'
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa'
import {
  GrCheckbox,
  GrCheckboxSelected,
} from 'react-icons/gr'
import Message from './Message'
import { useSocketValue } from '../context/socket'
import { Link } from 'react-router-dom'
const Documents = ({
  documents,
  filterBy,
  userInfo,
  ondeleteDocument,
}) => {
  // socket context
  const socket = useSocketValue()

  // change min length of documents to send
  const minDocsLength = 50

  const [docs, setDocs] = useState([])
  const dispatch = useDispatch()

  // check if id is checked
  const isChecked = (documentId) =>
    docs.some(({ doc }) => doc === documentId)

  // toggle check
  const toggleCheck = (document) => {
    if (isChecked(document.doc)) {
      const newDocs = docs.filter(
        ({ doc }) => doc !== document.doc
      )
      setDocs(newDocs)
    } else {
      setDocs((prevState) => [...prevState, document])
    }
  }

  const sendCollection = useCallback(() => {
    dispatch(addDocsToCollection(docs))
    socket.emit('sendCollection', {
      docsLength: docs.length,
    })
  }, [dispatch, docs, socket])

  const filteredDocuments = documents?.filter((doc) =>
    filterBy.toLowerCase() === 'finished'
      ? doc.status === 'placed'
      : filterBy.toLowerCase() === 'all'
      ? doc.status !== 'all'
      : doc.status === filterBy.toLowerCase()
  )

  return (
    <>
      {filteredDocuments.length === 0 ? (
        <Message>
          no {filterBy.toLowerCase()} documents
        </Message>
      ) : (
        <>
          <Table
            //striped
            bordered
            responsive
            className="table-sm"
          >
            <thead>
              <tr>
                {userInfo?.role !== 'service1' &&
                  filterBy.toLowerCase() === 'new' && (
                    <th></th>
                  )}
                <th>document nombre</th>
                <th>objet</th>
                <th>nom/Prenom</th>
                <th>cin</th>
                <th>ville/Province</th>
                <th>fonction</th>
                {filterBy.toLowerCase() === 'all' && (
                  <th
                    style={{
                      borderTop: 'none',
                      borderRight: 'none',
                    }}
                  ></th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((document) => (
                <tr
                  key={document._id}
                  className={`${
                    isChecked(document._id)
                      ? 'row-cecked'
                      : ''
                  }`}
                >
                  {userInfo?.role !== 'service1' &&
                    filterBy.toLowerCase() ===
                      'new' && (
                      <td
                        className="align-middle text-center"
                        onClick={() =>
                          toggleCheck({
                            doc: document._id,
                          })
                        }
                        style={{
                          cursor: 'pointer',
                        }}
                      >
                        {isChecked(document._id) ? (
                          <GrCheckboxSelected
                            style={{
                              width: '20px',
                              height: '20px',
                            }}
                          />
                        ) : (
                          <GrCheckbox
                            style={{
                              width: '20px',
                              height: '20px',
                            }}
                          />
                        )}
                      </td>
                    )}

                  <td className="align-middle">
                    {document.documentNum}
                  </td>
                  <td className="align-middle">
                    {document.object}
                  </td>
                  <td className="align-middle">
                    {document.firstName}{' '}
                    {document.lastName}
                  </td>
                  <td className="align-middle">
                    {document.cin}
                  </td>
                  <td className="align-middle">
                    {document.city} {document.province}
                  </td>
                  <td className="align-middle">
                    {document.profession}
                  </td>
                  {filterBy.toLowerCase() ===
                    'all' && (
                    <td className="align-middle">
                      <div
                        style={{ cursor: 'pointer' }}
                        onClick={() =>
                          ondeleteDocument(
                            document._id
                          )
                        }
                        className="icon bg-danger text-light"
                      >
                        <FaTrashAlt />
                      </div>
                      <Link
                        to={`documents/${document._id}`}
                        style={{ cursor: 'pointer' }}
                        className="icon bg-success text-light"
                      >
                        <FaPenAlt />
                      </Link>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
          {filterBy.toLowerCase() === 'new' &&
            userInfo?.role !== 'service1' && (
              <Row className="justify-content-end mt-3">
                <Alert variant="light">
                  vous ne pouvez pas envoyer moins de{' '}
                  <span className="text-danger h5">
                    {minDocsLength}
                  </span>{' '}
                  documents,{' '}
                  <span className="text-danger h5">{`${docs.length}`}</span>{' '}
                  sélectionné
                </Alert>
                <Button
                  onClick={sendCollection}
                  variant="dark"
                  disabled={
                    docs.length >= minDocsLength
                      ? false
                      : true
                  }
                  className="btn h-100 py-2 rounded-pill"
                >
                  send
                </Button>
              </Row>
            )}
        </>
      )}
    </>
  )
}

export default Documents
