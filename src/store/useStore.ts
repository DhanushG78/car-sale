import { create } from "zustand";
import { auth, db, storage } from "@/lib/firebase";
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  setDoc,
  getDoc,
  orderBy,
  writeBatch
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL, uploadBytes } from "firebase/storage";
import { Car } from "@/modules/items/types";
import { compressImage } from "@/lib/imageUtils";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "seller" | "admin";
  createdAt: string;
};

type Store = {
  // Auth state
  user: User | null;
  authLoading: boolean;
  setUser: (user: User | null) => void;
  getUserRole: () => "buyer" | "seller" | "admin" | null;
  isSeller: () => boolean;
  isBuyer: () => boolean;
  
  // Auth Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: string) => Promise<void>;
  logout: () => Promise<void>;

  // Car state
  cars: Car[];
  carsLoading: boolean;
  addCar: (car: Omit<Car, 'id' | 'createdAt' | 'sellerId'>) => Promise<void>;
  updateCar: (id: string, car: Partial<Car>) => Promise<void>;
  deleteCar: (id: string) => Promise<void>;

  // Wishlist state
  wishlist: string[]; // Car IDs
  wishlistLoading: boolean;
  toggleWishlist: (carId: string) => Promise<void>;

  // Comparison state (Frontend only)
  compareList: Car[];
  addToCompare: (car: Car) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;

  // Initialization
  initialized: boolean;
  init: () => () => void;
};

// Optimized helper for image upload - handles hangs gracefully
const uploadImage = async (imageSource: string | File): Promise<string> => {
  if (typeof imageSource === 'string' && !imageSource.startsWith('data:')) {
    return imageSource; // Already a URL
  }

  const storageRef = ref(storage, `cars/${Date.now()}_${Math.random().toString(36).substring(7)}`);
  const isString = typeof imageSource === 'string';

  try {
    // Add a race condition: upload vs 10s timeout
    const uploadTask = isString
      ? uploadString(storageRef, imageSource, 'data_url')
      : uploadBytes(storageRef, imageSource);

    // After 10s, we stop waiting and just use the fallback if it's a string
    const timeout = new Promise<null>((resolve, reject) => 
      setTimeout(() => {
        if (isString) {
          console.warn("Storage upload taking too long, falling back to local source.");
          resolve(null); // Resolve to null to indicate a fallback
        } else {
          reject(new Error("File upload timed out."));
        }
      }, 10000)
    );

    const result = await Promise.race([uploadTask, timeout]);

    if (result === null) {
       // Timeout happened but we have a base64 fallback
       return imageSource as string;
    }

    return await getDownloadURL(result.ref);

  } catch (error: any) {
    console.error("Firebase Storage error:", error);
    if (isString) {
      // Final size check for Firestore
      if (imageSource.length > 1040000) {
        throw new Error("Image is too large. Even compressed it exceeds database limits.");
      }
      return imageSource;
    }
    throw error;
  }
};

export const useStore = create<Store>((set, get) => ({
  // Auth implementation
  user: null,
  authLoading: true,
  initialized: false,
  setUser: (user) => set({ user }),
  getUserRole: () => get().user?.role || null,
  isSeller: () => get().user?.role === "seller" || get().user?.role === "admin",
  isBuyer: () => get().user?.role === "buyer",

  login: async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  },
  
  register: async (email, password, name, role) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const uid = res.user.uid;
    
    await setDoc(doc(db, "users", uid), {
      name,
      email,
      role,
      createdAt: new Date().toISOString()
    });
  },

  logout: async () => {
    await signOut(auth);
  },

  // Cars implementation
  cars: [],
  carsLoading: true,
  addCar: async (carData) => {
    const user = get().user;
    if (!user) throw new Error("Must be logged in to add a car");
    
    let imageUrl = carData.image;
    if (imageUrl) {
      try {
        imageUrl = await uploadImage(imageUrl as any);
      } catch (e: any) {
        throw new Error(`Failed to process image: ${e.message}`);
      }
    }
    
    try {
      const docRef = await addDoc(collection(db, "cars"), {
        ...carData,
        image: imageUrl || "",
        sellerId: user.id || user.email,
        createdAt: new Date().toISOString(),
        status: "available"
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e: any) {
      console.error("Error adding document: ", e);
      throw new Error(`Database error: ${e.message}`);
    }
  },
  updateCar: async (id, carData) => {
    let imageUrl = carData.image;
    if (imageUrl) {
      imageUrl = await uploadImage(imageUrl as any);
    }

    const carRef = doc(db, "cars", id);
    await updateDoc(carRef, {
      ...carData,
      image: imageUrl
    });
  },
  deleteCar: async (id) => {
    const carRef = doc(db, "cars", id);
    await deleteDoc(carRef);
  },

  // Wishlist implementation
  wishlist: [],
  wishlistLoading: true,
  toggleWishlist: async (carId) => {
    const user = get().user;
    if (!user) {
      alert("Please login to manage your wishlist");
      return;
    }

    const wishlistId = `${user.id}_${carId}`;
    const wishlistRef = doc(db, "wishlist", wishlistId);
    const docSnap = await getDoc(wishlistRef);

    if (docSnap.exists()) {
      await deleteDoc(wishlistRef);
    } else {
      await setDoc(wishlistRef, {
        userId: user.id,
        carId: carId,
        createdAt: new Date().toISOString()
      });
    }
  },

  // Comparison implementation
  compareList: [],
  addToCompare: (car: Car) => {
    const { compareList } = get();
    if (compareList.find((c) => c.id === car.id)) return;
    if (compareList.length >= 3) {
      alert("Maximum 3 cars can be compared at once.");
      return;
    }
    set({ compareList: [...compareList, car] });
  },
  removeFromCompare: (id: string) =>
    set((state) => ({
      compareList: state.compareList.filter((c) => c.id !== id),
    })),
  clearCompare: () => set({ compareList: [] }),

  // Initialization & Real-time Sync
  init: () => {
    if (get().initialized) return () => {};
    
    set({ initialized: true });

    // Migrate data from localStorage if exists
    const migrateData = async (userId: string) => {
      const stored = localStorage.getItem("autobazaar-store");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          const state = parsed.state as any;
          const migrationDone = localStorage.getItem("firebase_migrated");
          
          if (!migrationDone && state.cars && Array.isArray(state.cars)) {
             console.log("Migrating local cars to Firestore...");
             const userCars = state.cars.filter((c: any) => !c.id.startsWith('dummy_'));
             
             if (userCars.length > 0) {
               const batch = writeBatch(db);
               for (const car of userCars) {
                  const newRef = doc(collection(db, "cars"));
                  // For migration, we might want to upload images to Storage too
                  let imageUrl = car.image;
                  if (imageUrl && imageUrl.startsWith('data:')) {
                    try {
                      // Compressing during migration to prevent Firestore limit errors
                      if (imageUrl.length > 500000) {
                        imageUrl = await compressImage(imageUrl, 1000, 1000, 0.6);
                      }
                      imageUrl = await uploadImage(imageUrl);
                    } catch (e) {
                      console.error("Migration image upload failed", e);
                    }
                  }
                  batch.set(newRef, { ...car, image: imageUrl || "", sellerId: userId, id: newRef.id });
               }
               await batch.commit();
             }
             localStorage.setItem("firebase_migrated", "true");
             console.log("Migration complete!");
          }
        } catch (err) {
          console.error("Migration error:", err);
        }
      }
    };

    let unsubWishlist: () => void = () => {};

    const unsubAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userObj: User = { 
            id: firebaseUser.uid, 
            email: firebaseUser.email || "", 
            name: userData.name || firebaseUser.email?.split('@')[0] || "User",
            role: userData.role || "buyer",
            createdAt: userData.createdAt || new Date().toISOString()
          };
          set({ user: userObj, authLoading: false });
          migrateData(firebaseUser.uid);
          
          // Subscribe to wishlist
          unsubWishlist();
          const qWish = query(collection(db, "wishlist"), where("userId", "==", firebaseUser.uid));
          unsubWishlist = onSnapshot(qWish, (snapshot) => {
            const carIds = snapshot.docs.map(doc => doc.data().carId);
            set({ wishlist: carIds, wishlistLoading: false });
          });
        } else {
          set({ 
            user: { 
              id: firebaseUser.uid, 
              email: firebaseUser.email || "", 
              name: firebaseUser.email?.split('@')[0] || "User",
              role: "buyer",
              createdAt: new Date().toISOString()
            },
            authLoading: false 
          });
        }
      } else {
        unsubWishlist();
        set({ user: null, authLoading: false, wishlist: [], wishlistLoading: false });
      }
    });

    const qCars = query(collection(db, "cars"), orderBy("createdAt", "desc"));
    const unsubCars = onSnapshot(qCars, (snapshot) => {
      const carsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Car[];
      set({ cars: carsData, carsLoading: false });
    });

    return () => {
      unsubAuth();
      unsubCars();
      unsubWishlist();
    };
  }
}));
