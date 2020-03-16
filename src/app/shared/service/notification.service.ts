import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }


  success(message) {
    const toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 5000,
      grow: 'column'
    })

    toast.fire({
      icon: 'success',
      title: message
    })
  }

  smallSuccess(message) {
    const toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 5000,
      grow: 'column'
    })

    toast.fire({
      icon: 'success',
      title: message
    })
  }

  smallSuccessRight(message) {
    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      grow: 'column'
    })

    toast.fire({
      icon: 'success',
      title: message
    })
  }

  smallWarning(message) {
    const toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 5000,
      grow: 'column'
    })

    toast.fire({
      icon: 'warning',
      title: message
    })
  }

  smallError(message) {
    const toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 5000,
      grow: 'column'
    })

    toast.fire({
      icon: 'error',
      title: message
    })
  }



  notAllowed(message) {
    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      grow: 'column'
    })

    toast.fire({
      icon: 'error',
      title: message
    })

    // Swal.fire({
    //   position: 'top-end',
    //   icon: 'success',
    //   title: message,
    //   showConfirmButton: false,
    //   timer: 1500
    // })

    // this.config.panelClass = ['notification', 'success'];
    // this.snackBar.open(message, '', this.config);
  }


  error(message) {
    Swal.fire({
      icon: 'error',
      title: message,
      text: "",
      timer: 7000

    })

  }


  serverError(message) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    })
  }

  confirmDialog() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }


  wrongUser(message) {
    Swal.fire({
      icon: 'error',
      title: message,
      text: "Kindly login through the mobile applications. Thanks",
      timer: 7000

    })

  }

}
