import { toast } from 'react-toastify';

export enum NotyficationsStatusEnum {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export const notyficationsHandler = (message: string, status: string) => {
  if (status === NotyficationsStatusEnum.SUCCESS) {
    toast.success(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  if (status === NotyficationsStatusEnum.ERROR) {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
