import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
export const useBusinessData = (businessId) => {
  return useQuery({
    queryKey: ['business', businessId],
    queryFn: async () => {
      if (!businessId) return null;
      const docRef = doc(db, 'businesses', businessId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    },
    enabled: !!businessId,
  });
};

export const useUserBusinesses = (userId) => {
  return useQuery({
    queryKey: ['businesses', userId],
    queryFn: async () => {
      if (!userId) return [];
      const q = query(collection(db, 'businesses'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    enabled: !!userId,
  });
};

export const useSaveBusinessData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ businessId, data }) => {
      const docRef = doc(db, 'businesses', businessId);
      await setDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString(),
      }, { merge: true });
      return businessId;
    },
    onSuccess: (businessId) => {
      queryClient.invalidateQueries({ queryKey: ['business', businessId] });
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
    },
  });
};
