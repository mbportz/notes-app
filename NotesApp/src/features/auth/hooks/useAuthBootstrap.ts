import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '@shared/store/slices/authSlice';

export default function useAuthBootstrap() {
  const dispatch = useDispatch();
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        dispatch(setAuthenticated(!!token));
      } finally {
        setBootstrapped(true);
      }
    })();
  }, [dispatch]);

  return { bootstrapped };
}
