import {PropsWithChildren} from 'react';

export interface ICustomButtonProps extends PropsWithChildren {
  pressEvent: () => unknown;
  text: string;
  icon: any;
}

export interface IEventModalProps extends PropsWithChildren {
  isVisible: boolean;
  // setVisible: (value: boolean) => void;
  icon: any;
  redirectFunction: () => void;
}
