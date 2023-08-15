'use client';

import { useState, type ButtonHTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';
import { Notification, DefaultToast } from '../Notification';
import { XButton } from '@/components/common';
import { Route } from '@/constants';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const CloseQuizButton = (props: Props) => {
  const [isShowNotification, setIsShowNotification] = useState(false);

  const router = useRouter();

  const showNotificationHandler = () => {
    setIsShowNotification(true);
  };

  const hideNotification = () => {
    setIsShowNotification(false);
  };

  const closeHandler = () => {
    router.replace(Route.WIGWAM);
  };

  return (
    <>
      <XButton {...props} onClick={showNotificationHandler} />
      {isShowNotification && (
        <Notification backdrop>
          <DefaultToast onAction={hideNotification} onClose={closeHandler} />
        </Notification>
      )}
    </>
  );
};

export default CloseQuizButton;
