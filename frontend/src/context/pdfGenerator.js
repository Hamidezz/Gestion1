import React,{
    createContext,
    useContext,
    useState,
} from 'react'

import jsPDF from 'jspdf'
import 'jspdf-autotable'

export const PdfContext = createContext()

export const PdfProvider = ({ children }) => {
    const [done, setDone] = useState(false)

    const generatePdf = (docs) => {
      // console.log(docs)
      const docsToArray = docs.map((doc) => [
          doc.documentNum,
          doc.objet,
          `${doc.firstName} ${doc.lastName}`,
          doc.cin,
          `${doc.city} ${doc.province}`,
          doc.profession , doc.resumé
      ])

      setDone(true)
      const doc = new jsPDF('p', 'pt', 'a4')
      doc.autoTable({
          theme : 'grid',
          startY: 30,
          pageBreak: 'auto',
          rowPageBreak: 'auto',
          headStyles: { fillColor: [52, 58, 64] },
          bodyStyle: { cellPadding: 8 },
          head: [
              [
                  'document nombre',
                  'objet',
                  'nom/Prenom',
                  'cin',
                  'ville/Province',
                  'fonction' , 'resumé'
              ],
            ],
            body: docsToArray,
          })
          doc.save('Documents.pdf')
          setDone(false)
    }

    return (
        <PdfContext.Provider value={{generatePdf, done }} >
            {children}
        </PdfContext.Provider>
    )
}

export const usePdfGenerator = () =>
   useContext(PdfContext)