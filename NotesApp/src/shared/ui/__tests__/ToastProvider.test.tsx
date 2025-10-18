import React, { useEffect } from 'react';
import { act, render, waitFor } from '@testing-library/react-native';
import { ToastProvider, useToast } from '../ToastProvider';

describe('ToastProvider', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('shows and hides a toast message', async () => {
    const MessageTrigger = () => {
      const { showToast } = useToast();

      useEffect(() => {
        showToast({ message: 'Toast success', type: 'success', durationMs: 800 });
      }, [showToast]);

      return null;
    };

    const { getByText, queryByText } = render(
      <ToastProvider>
        <MessageTrigger />
      </ToastProvider>,
    );

    await waitFor(() => {
      expect(getByText('Toast success')).toBeTruthy();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(queryByText('Toast success')).toBeNull();
    });
  });

  it('throws when useToast is used outside provider', () => {
    const OutsideConsumer = () => {
      useToast();
      return null;
    };

    expect(() => render(<OutsideConsumer />)).toThrow(
      'useToast must be used within a ToastProvider',
    );
  });
});
