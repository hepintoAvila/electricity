/* eslint-disable import/no-anonymous-default-export */
import Swal from 'sweetalert2'

class ConfirmacionUpdateStrategy {
  confirmar(cel, updateCallback) {
    Swal.fire({
      title: 'Desea actualizar el registro? ' + cel,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        updateCallback(cel);
      }
    });
  }
}
export default ConfirmacionUpdateStrategy;
