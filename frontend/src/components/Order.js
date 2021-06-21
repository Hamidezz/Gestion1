import React, { useState } from 'react'
import { Accordion, Row, Table } from 'react-bootstrap'
import moment from 'moment'
import 'moment/locale/fr'
import {
  FaRegArrowAltCircleDown,
  FaRegArrowAltCircleUp,
} from 'react-icons/fa'
// import { useSelector } from 'react-redux'

const Order = ({ order, activeKey }) => {
  // accordion handler
  const [open, setOpen] = useState('non')

  return (
    <div className="border mb-2">
      <Row className="collHeader justify-content-between w-100 mt-4 px-4 pb-4">
        <h5 className="f">
          {order._id}{' '}
          <small className="text-info">
            {moment(order.createdAt)
              .locale('fr')
              .format('LLL')}
          </small>{' '}
          [{order.documents.length}]
        </h5>

        <div className="d-flex flex-grow-1 justify-content-end">
          <Accordion.Toggle
            onClick={() => setOpen(order._id)}
            eventKey={order._id}
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
      <Accordion.Collapse eventKey={order._id}>
        <>
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
              {/* {coll.documents.length} */}
              {order.documents?.map((document, i) => (
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
              ))}
            </tbody>
          </Table>
        </>
      </Accordion.Collapse>
    </div>
  )
}

export default Order
