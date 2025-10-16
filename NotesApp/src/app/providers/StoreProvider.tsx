import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../shared/store';

export default function StoreProvider({ children }: React.PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
