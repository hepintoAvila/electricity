/* eslint-disable import/no-anonymous-default-export */
import Swal from 'sweetalert2'

class ConfirmacionAddStrategy {
  confirmar(cel, addCallback) {
    Swal.fire({
      title: 'Desea adjuntar el registro? ' + cel,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        addCallback(cel);
      }
    });
  }
}
export default ConfirmacionAddStrategy;
