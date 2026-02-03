import { useMutation } from '@tanstack/react-query';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  return useAuthContext();
};

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      return await signInWithEmailAndPassword(auth, email, password);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      return await createUserWithEmailAndPassword(auth, email, password);
    },
  });
};

export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: async () => {
      const provider = new GoogleAuthProvider();
      return await signInWithPopup(auth, provider);
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      return await signOut(auth);
    },
  });
};
