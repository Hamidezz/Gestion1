import React from 'react'
import { Table, Alert } from 'react-bootstrap'
import moment from 'moment'
import 'moment/locale/fr'
const History = ({
  histories, //histories
  filterBy,
  userInfo,
}) => {
  return (
    <>
      {histories?.length === 0 ? (
        <Alert variant="info">no {filterBy}</Alert>
      ) : (
        <Table
          bordered
          responsive
          className="table-sm"
        >
          <thead>
            <tr>
              {filterBy === 'documents' && (
                <>
                  <th>document nombre</th>
                  <th>objet</th>
                  <th>nom/Prenom</th>
                  <th>cin</th>
                  <th>ville/Province</th>
                  <th>créé à</th>
                </>
              )}
              {filterBy === 'categories' && (
                <>
                  <th>nom de catégory</th>
                  <th>créé à</th>
                </>
              )}
              {filterBy === 'orders' && (
                <>
                  <th>id</th>
                  <th>documents</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {filterBy === 'documents' &&
              histories?.map(
                (hs) =>
                  hs.document && (
                    <tr key={hs._id}>
                      <td className="align-middle">
                        {hs.document.documentNum}
                      </td>
                      <td className="align-middle">
                        {hs.document.object}
                      </td>
                      <td className="align-middle">
                        {hs.document.firstName}{' '}
                        {hs.document.lastName}
                      </td>
                      <td className="align-middle">
                        {hs.document.cin}
                      </td>
                      <td className="align-middle">
                        {hs.document.city}{' '}
                        {hs.document.province}
                      </td>
                      <td className="align-middle">
                        {moment(hs.document.createdAt)
                          .locale('fr')
                          .format('LLL')}
                      </td>
                    </tr>
                  )
              )}
            {filterBy === 'categories' &&
              histories?.map(
                (hs) =>
                  hs.category && (
                    <tr key={hs._id}>
                      <td className="align-middle">
                        {hs.category.name}
                      </td>
                      <td className="align-middle">
                        {moment(hs.category.createdAt)
                          .locale('fr')
                          .format('LLL')}
                      </td>
                    </tr>
                  )
              )}
            {filterBy === 'orders' &&
              histories?.map(
                (hs) =>
                  hs.order && (
                    <tr key={hs._id}>
                      <td className="align-middle">
                        {hs.order._id}
                      </td>
                      <td className="align-middle">
                        {moment(hs.order.createdAt)
                          .locale('fr')
                          .format('LLL')}
                      </td>
                    </tr>
                  )
              )}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default History
