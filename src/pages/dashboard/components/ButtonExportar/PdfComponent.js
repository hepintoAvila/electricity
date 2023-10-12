import React from 'react';
import jsPDF from 'jspdf';
import BtnActions from '../BtnActions';
const PdfComponent = (props) => {
  const generatePdf = () => {
    //const doc = new jsPDF();
    //doc.text('Ejemplo de PDF generado con jspdf', 10, 10);
    //doc.save('ejemplo.pdf');
    var doc = new jsPDF('l', 'mm', [1500, 1400]);
    var pdfjs = document.querySelector('.table-responsive');
    doc.html(pdfjs, {
      callback: function(doc) {
          doc.save(`${props.nombre}.pdf`);
      },
      x: 12,
      y: 12
  });
  };

  return (
    <div>
          <BtnActions
              permisos={'S'}
              key={`EDITAR`}
              toggleActions={generatePdf}
              row={1}
              titulo={'IMPRIMIR'}
              descripcion={'Genere pdf'}
              icon={'mdi mdi-printer-eye'}
            />

    </div>
  );
};

export default PdfComponent;
