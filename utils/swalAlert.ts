import swal from 'sweetalert2';

type SwalAlert = {
  title: string;
  text?: string;
};

export const swalSuccess = ({ title, text }: SwalAlert) => {
  swal.fire({
    title,
    text,
    icon: 'success',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    customClass: {
      timerProgressBar: 'bg-green-500',
    },
    heightAuto: false,
  });
};

export const swalError = ({ title, text }: SwalAlert) => {
  swal.fire({
    title,
    text,
    icon: 'error',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    customClass: {
      timerProgressBar: 'bg-red-500',
    },
    heightAuto: false,
  });
};

export const swalWarning = ({ title, text }: SwalAlert) => {
  swal.fire({
    title,
    text,
    icon: 'warning',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      timerProgressBar: 'bg-orange-500',
    },
    heightAuto: false,
  });
};
