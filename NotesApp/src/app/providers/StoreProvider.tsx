import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';

export default function StoreProvider({ children }: React.PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
