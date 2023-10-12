/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import PermisoAlert from '../../components/PermisoAlert/PermisoAlert';
import Usuarios from './Usuarios/Usuarios';
import Roles from './Roles/Roles';
const AdminUsuarios = (props) => {
  const permisos = props?.permisos || {};

  return (
    <>
      {(() => {
        switch (props?.tipo) {
          case 'Usuarios':
            return <>
              {permisos?.query?.length === 1 ?
                (<Usuarios
                  accion={'AdminUsuarios'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                /> ): <PermisoAlert />}
            </>
          case 'Roles':
            return <>
              {permisos?.query?.length === 1 ?
                <Roles
                  accion={'AdminUsuarios'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                /> : <PermisoAlert />}
            </>
          default:
            return (
              <>{''}</>
            );
        }
      })()}
    </>
  );
};

export default AdminUsuarios;
