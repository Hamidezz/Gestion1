import React, { useCallback, useState } from 'react'
import {
  Table,
  Button,
  Row,
  Alert,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addDocsToCollection } from '../redux/actions/collectionActions'
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa'
import {
  GrCheckbox,
  GrCheckboxSelected,
} from 'react-icons/gr'
import { useSocketValue } from '../context/socket'
import { Link } from 'react-router-dom'
import { usePdfGenerator } from '../context/pdfGenerator'
const Documents = ({
  documents,
  filterBy,
  ondeleteDocument,
}) => {
  // socket context
  const socket = useSocketValue()
  const { generatePdf } = usePdfGenerator()

  // change min length of documents to send
  const minDocsLength = 2

  const [docs, setDocs] = useState([])
  const [pdfDocs, setPdfDocs] = useState([])
  const dispatch = useDispatch()

  // check if id is checked
  const isChecked = (documentId) =>
    docs.some(({ doc }) => doc === documentId)

  // load user info
  const { userInfo } = useSelector(
    (state) => state.loginState
  )

  //Check if user is authorized to do certain thing
  const isAuthorised =  (...roles) => {
    return !userInfo
    ? false 
    : roles.includes(userInfo.user.role)
  }
  
  // toggle check
  const toggleCheck = ({ doc }) => {
    if (isChecked(doc._id)) {
      const newDocs = docs.filter(
        (d) => d.doc !== doc._id
      )
      const newPdfDocs = pdfDocs.filter(
          (d) => d._id !== doc._id
      )
      setDocs(newDocs)
      setPdfDocs(newPdfDocs)
    }else{
      setDocs((prevState) => [
        ...prevState,
        { doc: doc._id },
      ])
      setPdfDocs((prevState) => [...prevState, doc])
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
      {filteredDocuments?.length === 0 ? (
        <Alert variant="info">
          no {filterBy.toLowerCase()} documents
        </Alert>
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
                {isAuthorised('service1', 'admin') &&
                ['new', 'all'].includes(
                  filterBy.toLowerCase()
                ) && <th></th>}
                <th> Numéro du document</th>
                <th>Date</th>
                <th>objet</th>
                <th>Resumé</th>
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
                  {['new', 'all'].includes(
                    filterBy.toLowerCase()
                      ) && (
                      <td
                        className="align-middle text-center"
                        onClick={() =>
                          toggleCheck({
                            doc: document,
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
                    {document.date}
                  </td>
                  <td className="align-middle">
                    {document.objet}
                  </td>
                  <td className="align-middle">
                    {document.resume}
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
          {['new', 'all'].includes(
            filterBy.toLowerCase()
          ) &&
          isAuthorised('service1', 'admin') && (
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
                onClick={() => generatePdf(pdfDocs)}
                disabled={
                  pdfDocs.length > 0 ? false : true
                }
                variant="dark"
                className="btn h-100 py-2 rounded-pill mr-2"
                >
                  export as pdf
                </Button>
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
