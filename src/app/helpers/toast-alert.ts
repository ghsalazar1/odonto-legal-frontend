import Swal, { SweetAlertIcon, SweetAlertInput } from 'sweetalert2';

export class ToastAlert {
  private timerDefault: number = 2500;

  Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    customClass: {
      popup: 'swal2-toast-mobile', 
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  public showSuccess(message: string, timer?:number): void {
    this.Toast.close();
    this.Toast.fire({
      icon: 'success',
      title: message,
      timer:timer??this.timerDefault
    });
  }

  public showError(message: string, timer?:number): void {
    this.Toast.close();
    this.Toast.fire({
      icon: 'error',
      title: message,
      timer:timer??this.timerDefault
    });
  }

  public showInfo(message: string, timer?:number): void {
    this.Toast.close();
    this.Toast.fire({
      icon: 'info',
      title: message,
      timer:timer??this.timerDefault
    });
  }

  public showWarnig(message: string, timer?:number): void {
    this.Toast.close();
    this.Toast.fire({
      icon: 'warning',
      title: message,
      timer:timer??this.timerDefault
    });
  }

  public showWarnigArray(messages: Array<string>, title: string, timer?:number): void {
    for (let i = 0; i < messages.length; i++) {
      const e = messages[i];
      this.Toast.fire({
        icon: 'warning',
        title: e,
        timer:timer??this.timerDefault
      });
    }
  }

  public showWaiting(message: string = "Aguarde", timer: number = 7000): void {
    this.Toast.close();
    this.Toast.fire({
      timer: timer,
      icon: 'info',
      title: message,
    });
  }

  public close(): void{
    this.Toast.close();
  }

  public async showQuestion(
    message: string,
    timer?: number,
    showInput: boolean = false,
    inputPlaceholder?: string
  ): Promise<string | boolean> {
    const config = {
      timer: timer,
      focusConfirm: true,
      icon: 'question' as SweetAlertIcon,
      text: message,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      denyButtonText: 'Cancelar',
      cancelButtonText: 'Cancelar',
      input: showInput ? ('text' as SweetAlertInput) : undefined,
      inputPlaceholder: showInput ? inputPlaceholder : undefined,
      confirmButtonColor: '#28a745', 
      cancelButtonColor: '#dc3545',
      customClass: {
        confirmButton: 'custom-confirm-button',
        cancelButton: 'custom-cancel-button',
      },
    };

    const result = await Swal.fire(config);

    if (result.isConfirmed) {
      return showInput ? (result.value as string) : true;
    } else {
      return false;
    }
  }
}
