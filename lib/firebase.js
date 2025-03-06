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

// Configuración de Firebase con variables de entorno
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Inicializar Firebase solo una vez
let firebaseApp
let db
let auth
let googleProvider

if (typeof window !== "undefined") {
  // Solo inicializar en el cliente
  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig)
  } else {
    firebaseApp = getApps()[0]
  }
  db = getFirestore(firebaseApp)
  auth = getAuth(firebaseApp)
  googleProvider = new GoogleAuthProvider()
}

// Función para iniciar sesión con Google
export async function signInWithGoogle() {
  if (!auth || !googleProvider) {
    throw new Error("Firebase Auth no está inicializado")
  }

  try {
    // En dispositivos móviles es mejor usar redirect, en desktop podemos usar popup
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      await signInWithRedirect(auth, googleProvider)
      return null // El resultado se procesará en getRedirectResult
    } else {
      const result = await signInWithPopup(auth, googleProvider)
      return result.user
    }
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error)
    throw error
  }
}

// Función para obtener el resultado de la redirección de Google
export async function getGoogleRedirectResult() {
  if (!auth) {
    throw new Error("Firebase Auth no está inicializado")
  }

  try {
    const result = await getRedirectResult(auth)
    return result?.user || null
  } catch (error) {
    console.error("Error al procesar redirección de Google:", error)
    throw error
  }
}

// Función para obtener todos los certificados
export async function getCertificados() {
  try {
    const certificadosCollection = collection(db, "certificados")
    const certificadosSnapshot = await getDocs(certificadosCollection)
    return certificadosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error al obtener certificados:", error)
    throw error
  }
}

// Función para obtener un certificado específico por ID
export async function getCertificadoPorId(id) {
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
    console.error(`Error al obtener certificado con ID ${id}:`, error)
    throw error
  }
}

// Función para iniciar sesión como administrador
export async function loginAdmin(email, password) {
  if (!auth) {
    throw new Error("Firebase Auth no está inicializado")
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error("Error al iniciar sesión:", error)

    // Proporcionar mensajes de error más específicos
    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
      throw new Error("Credenciales incorrectas. Por favor, verifica tu email y contraseña.")
    } else if (error.code === "auth/too-many-requests") {
      throw new Error("Demasiados intentos fallidos. Por favor, intenta más tarde.")
    } else {
      throw new Error("Error al iniciar sesión. Por favor, intenta de nuevo.")
    }
  }
}

// Función para cerrar sesión
export async function logoutAdmin() {
  try {
    await signOut(auth)
  } catch (error) {
    console.error("Error al cerrar sesión:", error)
    throw error
  }
}

// Función para verificar si el usuario actual es administrador
export async function isAdmin() {
  const user = auth?.currentUser

  if (!user) return false

  try {
 
    const adminDoc = doc(db, "admins", user.uid)
    const adminSnapshot = await getDoc(adminDoc)

    return adminSnapshot.exists() && adminSnapshot.data().role === "admin"
  } catch (error) {
    console.error("Error al verificar si es administrador:", error)
    return false
  }
}

// Función para agregar un nuevo administrador
export async function addAdminRole(userId, email) {
  if (!userId || !email) return false

  try {
    const adminRef = doc(db, "admins", userId)
    await setDoc(adminRef, {
      email: email,
      role: "admin",
      createdAt: new Date(),
    })
    return true
  } catch (error) {
    console.error("Error al agregar rol de administrador:", error)
    return false
  }
}

// Función para obtener el estado de autenticación actual
export function getCurrentUser() {
  return auth?.currentUser
}

// Función para escuchar cambios en el estado de autenticación
export function onAuthStateChange(callback) {
  return onAuthStateChanged(auth, callback)
}

// Funciones CRUD para proyectos
export async function getProyectos() {
  try {
    const proyectosCollection = collection(db, "proyectos")
    const proyectosSnapshot = await getDocs(proyectosCollection)
    return proyectosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error al obtener proyectos:", error)
    throw error
  }
}

export async function addProyecto(proyecto) {
  try {
    const proyectosCollection = collection(db, "proyectos")
    const docRef = await addDoc(proyectosCollection, proyecto)
    return { id: docRef.id, ...proyecto }
  } catch (error) {
    console.error("Error al añadir proyecto:", error)
    throw error
  }
}

export async function updateProyecto(id, proyecto) {
  try {
    const proyectoDoc = doc(db, "proyectos", id)
    await updateDoc(proyectoDoc, proyecto)
    return { id, ...proyecto }
  } catch (error) {
    console.error(`Error al actualizar proyecto con ID ${id}:`, error)
    throw error
  }
}

export async function deleteProyecto(id) {
  try {
    const proyectoDoc = doc(db, "proyectos", id)
    await deleteDoc(proyectoDoc)
    return id
  } catch (error) {
    console.error(`Error al eliminar proyecto con ID ${id}:`, error)
    throw error
  }
}

// Funciones CRUD para certificados
export async function addCertificado(certificado) {
  try {
    const certificadosCollection = collection(db, "certificados")
    const docRef = await addDoc(certificadosCollection, certificado)
    return { id: docRef.id, ...certificado }
  } catch (error) {
    console.error("Error al añadir certificado:", error)
    throw error
  }
}

export async function updateCertificado(id, certificado) {
  try {
    const certificadoDoc = doc(db, "certificados", id)
    await updateDoc(certificadoDoc, certificado)
    return { id, ...certificado }
  } catch (error) {
    console.error(`Error al actualizar certificado con ID ${id}:`, error)
    throw error
  }
}

export async function deleteCertificado(id) {
  try {
    const certificadoDoc = doc(db, "certificados", id)
    await deleteDoc(certificadoDoc)
    return id
  } catch (error) {
    console.error(`Error al eliminar certificado con ID ${id}:`, error)
    throw error
  }
}

// Funciones para mensajes de contacto
export async function getMensajes() {
  try {
    const mensajesCollection = collection(db, "mensajes")
    const mensajesSnapshot = await getDocs(mensajesCollection)
    return mensajesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error al obtener mensajes:", error)
    throw error
  }
}

export { db, auth }

