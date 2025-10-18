import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Animated, Easing, Text, View } from 'react-native';

type ToastType = 'info' | 'success' | 'error';

type ShowToastInput = {
  message: string;
  type?: ToastType;
  durationMs?: number;
};

type ToastState = {
  id: number;
  message: string;
  type: ToastType;
  durationMs: number;
};

type ToastContextValue = {
  showToast: (toast: ShowToastInput) => void;
  hideToast: () => void;
};

const DEFAULT_DURATION = 3000;

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const hideToast = useCallback(() => setToast(null), []);

  const showToast = useCallback((input: ShowToastInput) => {
    setToast({
      id: Date.now(),
      message: input.message,
      type: input.type ?? 'info',
      durationMs: input.durationMs ?? DEFAULT_DURATION,
    });
  }, []);

  const value = useMemo(() => ({ showToast, hideToast }), [showToast, hideToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toast={toast} onComplete={hideToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}

function ToastViewport({
  toast,
  onComplete,
}: {
  toast: ToastState | null;
  onComplete: () => void;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!toast) {
      return;
    }

    // clear any existing timer
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    opacity.setValue(0);
    translateY.setValue(20);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 180,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    timer.current = setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: -10,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          onComplete();
        }
      });
    }, toast.durationMs);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, [toast, opacity, translateY, onComplete]);

  if (!toast) {
    return null;
  }

  const variantClasses = TOAST_VARIANT_CLASSES[toast.type];

  return (
    <View pointerEvents="none" className="absolute inset-0">
      <View className="flex-1 items-center justify-start pt-15">
        <Animated.View
          className={`max-w-[90%] rounded-xl px-5 py-3 shadow-lg ${variantClasses.background}`}
          style={{
            transform: [{ translateY }],
            opacity,
          }}
        >
          <Text className={`text-base font-semibold ${variantClasses.text}`}>{toast.message}</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const TOAST_VARIANT_CLASSES: Record<ToastType, { background: string; text: string }> = {
  info: {
    background: 'bg-feedback-info',
    text: 'text-text-inverse',
  },
  success: {
    background: 'bg-feedback-success',
    text: 'text-text',
  },
  error: {
    background: 'bg-feedback-error',
    text: 'text-text-inverse',
  },
};
