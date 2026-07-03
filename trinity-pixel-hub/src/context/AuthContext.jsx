import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { 
  auth, 
  db, 
  doc, 
  getDoc, 
  setDoc,
  updateDoc
} from '../firebase'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged,
  updateProfile,
  updateEmail as authUpdateEmail,
  updatePassword as authUpdatePassword
} from 'firebase/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  // Listen to Auth State Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true)
      if (firebaseUser) {
        // Fetch additional user details from database (like role, phone, preferences)
        try {
          const userDocRef = doc(db, 'tph_users', firebaseUser.uid || firebaseUser.email)
          const userSnap = await getDoc(userDocRef)
          
          if (userSnap.exists()) {
            const dbData = userSnap.data()
            setUser({
              uid: firebaseUser.uid,
              name: dbData.fullName || dbData.name || firebaseUser.displayName || firebaseUser.email.split('@')[0],
              email: firebaseUser.email,
              phoneNumber: dbData.phone || firebaseUser.phoneNumber || '',
              photoURL: dbData.photoURL || firebaseUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
              role: dbData.role || 'Client',
              status: dbData.status || 'Active',
              preferences: dbData.preferences || { notifications: true, emailAlerts: true }
            })
          } else {
            // Document doesn't exist yet, create one
            const newUserData = {
              uid: firebaseUser.uid || 'user-' + Math.random().toString(36).substr(2, 9),
              fullName: firebaseUser.displayName || firebaseUser.email.split('@')[0],
              name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
              email: firebaseUser.email,
              phone: firebaseUser.phoneNumber || '',
              role: 'Client',
              status: 'Active',
              createdAt: new Date().toISOString(),
              photoURL: firebaseUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
              preferences: { notifications: true, emailAlerts: true }
            }
            await setDoc(userDocRef, newUserData)
            setUser({
              uid: newUserData.uid,
              name: newUserData.name,
              email: newUserData.email,
              phoneNumber: newUserData.phone,
              photoURL: newUserData.photoURL,
              role: newUserData.role,
              status: newUserData.status,
              preferences: newUserData.preferences
            })
          }
        } catch (error) {
          console.error('Error fetching user data from DB:', error)
          // Fallback if db fails
          setUser({
            uid: firebaseUser.uid,
            name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
            email: firebaseUser.email,
            phoneNumber: firebaseUser.phoneNumber || '',
            photoURL: firebaseUser.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            role: firebaseUser.email.includes('admin') ? 'Admin' : 'Client',
            status: 'Active',
            preferences: { notifications: true, emailAlerts: true }
          })
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const login = async (email, password) => {
    // Check if using real firebase or mock
    if (auth.signInWithEmailAndPassword) {
      // Mock or custom Firebase instance
      return await auth.signInWithEmailAndPassword(email, password)
    }
    return await fbSignIn(auth, email, password)
  }

  const register = async (email, password, additionalData) => {
    let result;
    if (auth.createUserWithEmailAndPassword) {
      result = await auth.createUserWithEmailAndPassword(email, password, additionalData)
    } else {
      result = await fbCreateUser(auth, email, password)
    }
    
    const firebaseUser = result.user
    
    // Save additional fields into Firestore DB
    const userDocRef = doc(db, 'tph_users', firebaseUser.uid || firebaseUser.email)
    const newUserData = {
      uid: firebaseUser.uid || 'user-' + Math.random().toString(36).substr(2, 9),
      fullName: additionalData.fullName,
      name: additionalData.fullName,
      email: email.toLowerCase(),
      phone: additionalData.phone || '',
      role: 'Client',
      status: 'Active',
      createdAt: new Date().toISOString(),
      photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      preferences: { notifications: true, emailAlerts: true }
    }
    await setDoc(userDocRef, newUserData)
    
    // Update Firebase Profile
    if (updateProfile) {
      await updateProfile(firebaseUser, {
        displayName: additionalData.fullName
      }).catch(err => console.log('Profile update failed:', err))
    }

    return result
  }

  const logout = async () => {
    if (auth.signOut) {
      await auth.signOut()
    } else {
      await fbSignOut(auth)
    }
    setUser(null)
    window.localStorage.removeItem('tph-auth-state')
  }

  const resetPassword = async (email) => {
    if (auth.sendPasswordResetEmail) {
      return await auth.sendPasswordResetEmail(email)
    }
    return await fbSendReset(auth, email)
  }

  const updateUserInfo = async (updates) => {
    if (!user) return
    const userDocRef = doc(db, 'tph_users', user.uid || user.email)
    
    // Update DB
    await updateDoc(userDocRef, {
      fullName: updates.name || updates.fullName,
      name: updates.name || updates.fullName,
      phone: updates.phone || updates.phoneNumber,
      photoURL: updates.photoURL || user.photoURL,
      preferences: updates.preferences || user.preferences
    })

    // Update Firebase Profile
    const firebaseUser = auth.currentUser
    if (firebaseUser && updateProfile) {
      await updateProfile(firebaseUser, {
        displayName: updates.name,
        photoURL: updates.photoURL
      }).catch(err => console.log(err))
    }

    // Update Local State
    setUser(prev => {
      if (!prev) return null
      return {
        ...prev,
        name: updates.name !== undefined ? updates.name : prev.name,
        phoneNumber: updates.phone !== undefined ? updates.phone : prev.phoneNumber,
        photoURL: updates.photoURL !== undefined ? updates.photoURL : prev.photoURL,
        preferences: updates.preferences !== undefined ? updates.preferences : prev.preferences
      }
    })
  }

  const updateUserEmail = async (newEmail) => {
    if (!user) return
    const userDocRef = doc(db, 'tph_users', user.uid || user.email)
    
    // Update in Firestore
    await updateDoc(userDocRef, { email: newEmail.toLowerCase() })

    // Update in Auth
    if (auth.updateEmail) {
      await auth.updateEmail(newEmail)
    } else {
      const firebaseUser = auth.currentUser
      if (firebaseUser && authUpdateEmail) {
        await authUpdateEmail(firebaseUser, newEmail)
      }
    }

    setUser(prev => prev ? { ...prev, email: newEmail } : null)
  }

  const updateUserPassword = async (newPassword) => {
    if (!user) return
    
    if (auth.updatePassword) {
      await auth.updatePassword(newPassword)
    } else {
      const firebaseUser = auth.currentUser
      if (firebaseUser && authUpdatePassword) {
        await authUpdatePassword(firebaseUser, newPassword)
      }
    }
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'Admin',
      isLoading: loading,
      isAuthModalOpen,
      openAuthModal: () => setIsAuthModalOpen(true),
      closeAuthModal: () => setIsAuthModalOpen(false),
      login,
      register,
      logout,
      resetPassword,
      updateUserInfo,
      updateUserEmail,
      updateUserPassword
    }),
    [user, loading, isAuthModalOpen]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
