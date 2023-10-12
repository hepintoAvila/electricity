import { Alert, Card } from "react-bootstrap";
import Spinner from "../../../../components/Spinner";
import { Suspense } from "react";
const loading = () => <div className="text-center"></div>;
const Spinners = () => {
  const sizes = ['sm'];
  return (
      <Card>
          <Card.Body>
              <div className="row">
                  {sizes.map((size, index) => {
                      return (
                          <div key={index} className="col-lg-6">
                              <Spinner className="text-primary m-2" color="primary" size={size} />
                          </div>
                      );
                  })}
              </div>
          </Card.Body>
      </Card>
  );
};

const PermisoAlert =() => {
  return (
  <Suspense fallback={loading()}><Spinners />
    <Alert variant="danger" className="my-2">
      <h3>Usted no tiene permisos habilitados en esta seccción...</h3>
    </Alert>
    </Suspense> )
}
export default PermisoAlert;
