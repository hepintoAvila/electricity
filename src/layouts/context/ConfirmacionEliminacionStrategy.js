/* eslint-disable import/no-anonymous-default-export */
import Swal from 'sweetalert2'

class ConfirmacionEliminacionStrategy {
  confirmar(cel, eliminarCallback) {
    Swal.fire({
      title: 'Desea eliminar el registro? ' + cel,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarCallback(cel);
      }
    });
  }
}
export default ConfirmacionEliminacionStrategy;
