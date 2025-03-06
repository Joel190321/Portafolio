import { initializeApp, getApps } from "firebase/app"
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore"
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth"

// Firebase configuration with environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase only once
let firebaseApp
let db
let auth
let googleProvider

// Add this for debugging
console.log(
  "Firebase API Key prefix:",
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY
    ? process.env.NEXT_PUBLIC_FIREBASE_API_KEY.substring(0, 5) + "..."
    : "undefined",
)

// Only initialize on the client side
if (typeof window !== "undefined") {
  try {
    if (!getApps().length) {
      console.log("Initializing Firebase app...")
      firebaseApp = initializeApp(firebaseConfig)
      console.log("Firebase app initialized successfully")
    } else {
      console.log("Using existing Firebase app")
      firebaseApp = getApps()[0]
    }

    db = getFirestore(firebaseApp)
    auth = getAuth(firebaseApp)
    googleProvider = new GoogleAuthProvider()

    // Test auth initialization
    console.log("Auth initialized:", auth ? "Yes" : "No")
  } catch (error) {
    console.error("Error initializing Firebase:", error)
  }
}

// Google Sign-in function
export async function signInWithGoogle() {
  if (!auth || !googleProvider) {
    throw new Error("Firebase Auth is not initialized")
  }

  try {
    // Use redirect for mobile devices, popup for desktop
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      await signInWithRedirect(auth, googleProvider)
      return null // Result will be processed in getRedirectResult
    } else {
      const result = await signInWithPopup(auth, googleProvider)
      return result.user
    }
  } catch (error) {
    console.error("Error signing in with Google:", error)
    throw error
  }
}

// Get Google redirect result
export async function getGoogleRedirectResult() {
  if (!auth) {
    throw new Error("Firebase Auth is not initialized")
  }

  try {
    const result = await getRedirectResult(auth)
    return result?.user || null
  } catch (error) {
    console.error("Error processing Google redirect:", error)
    throw error
  }
}

// Admin login function
export async function loginAdmin(email, password) {
  if (!auth) {
    throw new Error("Firebase Auth is not initialized")
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error("Login error:", error)

    // Provide more specific error messages
    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
      throw new Error("Incorrect credentials. Please verify your email and password.")
    } else if (error.code === "auth/too-many-requests") {
      throw new Error("Too many failed attempts. Please try again later.")
    } else {
      throw new Error("Login error. Please try again.")
    }
  }
}

// Logout function
export async function logoutAdmin() {
  if (!auth) {
    throw new Error("Firebase Auth is not initialized")
  }

  try {
    await signOut(auth)
  } catch (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

// Check if current user is admin
export async function isAdmin() {
  const user = auth?.currentUser

  if (!user || !db) return false

  try {
    const adminDoc = doc(db, "admins", user.uid)
    const adminSnapshot = await getDoc(adminDoc)

    return adminSnapshot.exists() && adminSnapshot.data().role === "admin"
  } catch (error) {
    console.error("Error checking admin status:", error)
    return false
  }
}

// Add admin role
export async function addAdminRole(userId, email) {
  if (!userId || !email || !db) return false

  try {
    const adminRef = doc(db, "admins", userId)
    await setDoc(adminRef, {
      email: email,
      role: "admin",
      createdAt: new Date(),
    })
    return true
  } catch (error) {
    console.error("Error adding admin role:", error)
    return false
  }
}

// Get current user
export function getCurrentUser() {
  return auth?.currentUser
}

// Listen for auth state changes
export function onAuthStateChange(callback) {
  if (!auth) {
    console.error("Auth not initialized, cannot listen for auth state changes")
    return () => {} // Return empty function as unsubscribe
  }
  return onAuthStateChanged(auth, callback)
}

// RESTORED: Functions for Certificados collection
export async function getCertificados() {
  if (!db) {
    throw new Error("Firestore is not initialized")
  }

  try {
    const certificadosCollection = collection(db, "certificados")
    const certificadosSnapshot = await getDocs(certificadosCollection)
    return certificadosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error getting certificados:", error)
    throw error
  }
}

export async function getCertificadoPorId(id) {
  if (!db) {
    throw new Error("Firestore is not initialized")
  }

  try {
    const certificadoDoc = doc(db, "certificados", id)
    const certificadoSnapshot = await getDoc(certificadoDoc)

    if (certificadoSnapshot.exists()) {
      return {
        id: certificadoSnapshot.id,
        ...certificadoSnapshot.data(),
      }
    } else {
      throw new Error("Certificado no encontrado")
    }
  } catch (error) {
    console.error(`Error getting certificado with ID ${id}:`, error)
    throw error
  }
}

export async function addCertificado(certificado) {
  if (!db) {
    throw new Error("Firestore is not initialized")
  }

  try {
    const certificadosCollection = collection(db, "certificados")
    const docRef = await addDoc(certificadosCollection, certificado)
    return { id: docRef.id, ...certificado }
  } catch (error) {
    console.error("Error adding certificado:", error)
    throw error
  }
}

export async function updateCertificado(id, certificado) {
  if (!db) {
    throw new Error("Firestore is not initialized")
  }

  try {
    const certificadoDoc = doc(db, "certificados", id)
    await updateDoc(certificadoDoc, certificado)
    return { id, ...certificado }
  } catch (error) {
    console.error(`Error updating certificado with ID ${id}:`, error)
    throw error
  }
}

export async function deleteCertificado(id) {
  if (!db) {
    throw new Error("Firestore is not initialized")
  }

  try {
    const certificadoDoc = doc(db, "certificados", id)
    await deleteDoc(certificadoDoc)
    return id
  } catch (error) {
    console.error(`Error deleting certificado with ID ${id}:`, error)
    throw error
  }
}

// RESTORED: Functions for Proyectos collection
export async function getProyectos() {
  if (!db) {
    throw new Error("Firestore is not initialized")
  }

  try {
    const proyectosCollection = collection(db, "proyectos")
    const proyectosSnapshot = await getDocs(proyectosCollection)
    return proyectosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error getting proyectos:", error)
    throw error
  }
}

export async function addProyecto(proyecto) {
  if (!db) {
    throw new Error("Firestore is not initialized")
  }

  try {
    const proyectosCollection = collection(db, "proyectos")
    const docRef = await addDoc(proyectosCollection, proyecto)
    return { id: docRef.id, ...proyecto }
  } catch (error) {
    console.error("Error adding proyecto:", error)
    throw error
  }
}

export async function updateProyecto(id, proyecto) {
  if (!db) {
    throw new Error("Firestore is not initialized")
  }

  try {
    const proyectoDoc = doc(db, "proyectos", id)
    await updateDoc(proyectoDoc, proyecto)
    return { id, ...proyecto }
  } catch (error) {
    console.error(`Error updating proyecto with ID ${id}:`, error)
    throw error
  }
}

export async function deleteProyecto(id) {
  if (!db) {
    throw new Error("Firestore is not initialized")
  }

  try {
    const proyectoDoc = doc(db, "proyectos", id)
    await deleteDoc(proyectoDoc)
    return id
  } catch (error) {
    console.error(`Error deleting proyecto with ID ${id}:`, error)
    throw error
  }
}

// RESTORED: Functions for Mensajes collection
export async function getMensajes() {
  if (!db) {
    throw new Error("Firestore is not initialized")
  }

  try {
    const mensajesCollection = collection(db, "mensajes")
    const mensajesSnapshot = await getDocs(mensajesCollection)
    return mensajesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error getting mensajes:", error)
    throw error
  }
}

// Export initialized services
export { db, auth }

