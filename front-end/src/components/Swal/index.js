// SwalHelper.js
import Swal from 'sweetalert2';

const Swal_show = (status, text) => {
    if (status === 'success') {
        Swal.fire({
            icon: 'success',
            title: 'Success',
            text: text,
        });
    }
    if (status === 'error') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: text,
        });
    }
};

export default Swal_show;
