/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext} from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import FileUploader from '../../../../../components/FileUploader';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';

const LoadImg = (props) => {
  const {queryFile} = useContext(DashboardContext);
  const [temas, setTemas] = useState([]);
  const [validated, setValidated] = useState(false);

  const guardar = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (validated) {
      if (temas.selectedFile) {
        const datosfiles = {
          accion: props.accion,
          tipo: props.tipo,
          idApu: props.IdApu,
          opcion: props.opcion,
          NombreApu: props.NombreApu,
          filename: temas.selectedFile[0].name,
          size: temas.selectedFile[0].size,
          formattedSize: temas.selectedFile[0].formattedSize,
          lastModified: temas.selectedFile[0].lastModified,
          type: temas.selectedFile[0].type,
        };
        const queryDatos = datosfiles
          ? Object.keys(datosfiles)
            .map((key) => key + '=' + datosfiles[key])
            .join('&')
          : '';
        const file = temas.selectedFile[0];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        // Cuando la lectura del archivo termine
        reader.onload = function () {
          // Convertir el contenido del archivo a una cadena base64
          const base64String = btoa(
            new Uint8Array(reader.result)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          queryFile(queryDatos, base64String)
        };

      }
    }
  }
  return (
    <>
      <div className="text-left mt-2 mb-4 btn-success text-white mx-auto">
        <div class="row">
          <div class="col-md-auto ml-auto font-13 mt-2 mb-2">{props?.producto}-{props?.NombreApu}</div>
        </div>
      </div>
      <Form validated={validated}>
        <Row>
          <Col sm={6}>
            <p className="text-muted font-13 m-b-30">
              En esta sección puedes cargarle una imagen a la APU
            </p>
            <Form.Group className="mb-3" controlId="Imagen">
              <Form.Label>Cargar Documento</Form.Label>
              <FileUploader
                setFiles={props.setFiles}
                onFileUpload={(e) => {
                  const files = Array.from(e);
                  //const file = JSON.stringify(files);
                  setTemas({ ...temas, selectedFile: files });
                }}
              />

            </Form.Group>
          </Col><Col sm={6}>
            <Form.Group className="mb-3 mb-3 mb-3 ">
              <Button type="button" onClick={guardar}>
                +
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default LoadImg;
