import React from 'react';
import notification from 'antd/lib/notification';

require('./styles.less');

const getToastIcon = (type: string): JSX.Element => {
  switch (type) {
    case 'success':
      return <img src="/images/toastMessage/icon-toast-success.svg" alt="success" />;
    case 'error':
      return <img src="/images/toastMessage/icon-toast-error.svg" alt="error" />;
    case 'info':
      return <img src="/images/toastMessage/icon-toast-info.svg" alt="info" />;
    default:
      return <img src="/images/toastMessage/icon-toast-no-internet.svg" alt="no-internet" />;
  }
};

const ToastMessage = ({
  message,
  type = 'no-internet',
  duration = 5,
  onClick,
}: {
  message: string;
  type?: 'success' | 'error' | 'info' | 'no-internet';
  duration?: number;
  onClick?: () => void;
}): void => {
  const notiConfig: any = {
    placement: 'bottomRight',
    bottom: 0,
    duration,
  };
  notification.config(notiConfig);
  const configOpen: any = {
    className: `custom-toast-messager ${type}`,
    message: <div dangerouslySetInnerHTML={{ __html: message }} />,
    description: '',
    icon: getToastIcon(type),
    closeIcon: <img src="/images/toastMessage/icon-close.svg" alt="close" />,
  };
  if (typeof onClick === 'function') {
    configOpen.onClick = onClick;
  }
  notification.open(configOpen);
};

export default ToastMessage;
