import React from 'react';
import { Row, Col, Card,Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FormInput from '../FormInput';
import * as XLSX from 'xlsx';

const ExcelToJson = ({
 ConvertButtonText = "validar",
  CleanButtonText = "Limpiar",
  JsonDataSetter,
  setSelectedFile,
  selectedFile,
  validar,
  importarDataCvs,
}) => {
  const OnchangeValue = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const CleanValues = () => {
    setSelectedFile("");
    document.getElementById("excel-to-json-input-file").value = "";
  };
  const onSubmitXLS = () => {
    let hojas = []
    //window.XLSX.utils.json_to_sheet(data, "out.xlsx");
    if (selectedFile) {
      let fileReader = new FileReader();
      fileReader.readAsArrayBuffer(selectedFile)
      fileReader.onload = (event) => {
        let datas = event.target.result;
        let data = new Uint8Array(datas);
        let workbook = XLSX.read(data, { type: "array" });
        workbook.SheetNames.forEach(function(sheetName) {
          // Here is your object
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          hojas.push({
            data: XL_row_object,
            sheetName
          })
        })

        JsonDataSetter(JSON.parse(JSON.stringify(hojas)));
      };
    }
  };
   //console.log(validar);
  return (
      <React.Fragment>
          <Row>
              <Col>
                  <Card>
                      <Card.Body>
                          <h4 className="header-title mb-3">Cargar Información a la BD</h4>

                          <p className="text-muted font-13 m-b-30"></p>
                              <FormInput
                                  onChange={OnchangeValue}
                                  label="Subir archivo"
                                  type="file"
                                  name="file"
                                  containerClass={'mb-3'}
                                  key="file"
                              />
                                  {selectedFile && (
                                      <Button variant="dark" id="button-addon2" onClick={onSubmitXLS}>
                                          {ConvertButtonText}
                                      </Button>
                                  )}
                                  {selectedFile && (
                                      <Button variant="dark" id="button-addon2" onClick={CleanValues}>
                                          {CleanButtonText}
                                      </Button>
                                  )}
                                {
                                  <Button type="button"  onClick={importarDataCvs(selectedFile)}>
                                    Importar Datos
                                </Button>
                                 }
                      </Card.Body>
                  </Card>
              </Col>
          </Row>
      </React.Fragment>
  );
};
ExcelToJson.propTypes = {
  ConvertButtonText :PropTypes.string,
  CleanButtonText :PropTypes.string,
  JsonDataSetter:PropTypes.func.isRequired
};
export default ExcelToJson;
