import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword as fbSignIn, 
  createUserWithEmailAndPassword as fbCreateUser, 
  signOut as fbSignOut, 
  sendPasswordResetEmail as fbSendReset, 
  onAuthStateChanged as fbOnAuthChange, 
  updateProfile as fbUpdateProfile,
  updateEmail as fbUpdateEmail,
  updatePassword as fbUpdatePassword
} from 'firebase/auth';
import { 
  getFirestore, 
  collection as fbCollection, 
  doc as fbDoc, 
  setDoc as fbSetDoc, 
  addDoc as fbAddDoc, 
  getDoc as fbGetDoc, 
  getDocs as fbGetDocs, 
  updateDoc as fbUpdateDoc, 
  deleteDoc as fbDeleteDoc, 
  query as fbQuery, 
  where as fbWhere, 
  orderBy as fbOrderBy, 
  limit as fbLimit,
  onSnapshot as fbOnSnapshot
} from 'firebase/firestore';
import { 
  getStorage, 
  ref as fbStorageRef, 
  uploadBytesResumable as fbUploadBytes, 
  getDownloadURL as fbGetDownloadURL 
} from 'firebase/storage';

// Check if Firebase configuration env variables are present
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const isRealFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_API_KEY !== 'placeholder'
);

let app;
let realAuth;
let realDb;
let realStorage;

if (isRealFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    realAuth = getAuth(app);
    realDb = getFirestore(app);
    realStorage = getStorage(app);
    console.log('Firebase initialized successfully.');
  } catch (error) {
    console.warn('Firebase initialization failed. Falling back to Mock Services.', error);
  }
} else {
  console.log('No Firebase config found. Initializing Local Mock Database Services.');
}

// -------------------------------------------------------------
// LOCAL STORAGE MOCK DATABASE IMPLEMENTATION
// -------------------------------------------------------------

// Local storage database keys
const LS_KEYS = {
  USERS: 'tph_users',
  BOOKINGS: 'tph_bookings',
  MESSAGES: 'tph_messages',
  NOTIFICATIONS: 'tph_notifications',
  PROJECTS: 'tph_projects',
  SUPPORT: 'tph_support_tickets',
  BLOG: 'tph_blog_posts',
  TESTIMONIALS: 'tph_testimonials',
  APPOINTMENTS: 'tph_appointments',
  SAVED_SERVICES: 'tph_saved_services',
  CURRENT_USER: 'tph_current_user',
  ACTIVITY_LOG: 'tph_activity_log'
};

// Seed initial data if empty
const seedDatabase = () => {
  // Users (Seed with client and admin accounts)
  if (!localStorage.getItem(LS_KEYS.USERS)) {
    localStorage.setItem(LS_KEYS.USERS, JSON.stringify([
      {
        uid: 'client-1',
        fullName: 'Client Demo',
        name: 'Client Demo',
        email: 'client@trinitypixelhub.com',
        phone: '+1 (555) 019-2834',
        password: 'booktphp', // For mock login simple verification
        role: 'Client',
        status: 'Active',
        createdAt: new Date().toISOString(),
        photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        preferences: { notifications: true, emailAlerts: true }
      },
      {
        uid: 'admin-1',
        fullName: 'Admin Portal',
        name: 'Admin Portal',
        email: 'admin@trinitypixelhub.com',
        phone: '+1 (555) 987-6543',
        password: 'admin',
        role: 'Admin',
        status: 'Active',
        createdAt: new Date().toISOString(),
        photoURL: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        preferences: { notifications: true, emailAlerts: true }
      }
    ]));
  }

  // Bookings
  if (!localStorage.getItem(LS_KEYS.BOOKINGS)) {
    localStorage.setItem(LS_KEYS.BOOKINGS, JSON.stringify([
      {
        id: 'booking-101',
        clientEmail: 'client@trinitypixelhub.com',
        category: 'Web Development',
        service: 'Web Development',
        title: 'E-commerce Redesign 2026',
        description: 'Migrating and redesigning our main storefront to React and Tailwind CSS.',
        budget: '$12,000',
        deadline: '2026-08-15',
        priority: 'High',
        status: 'In Progress',
        fileUrl: '',
        notes: 'Needs integration with Stripe and Shopify API.',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'booking-102',
        clientEmail: 'client@trinitypixelhub.com',
        category: 'Graphic Design',
        service: 'Graphic Design',
        title: 'Brand Pitch Deck Design',
        description: 'Designing a modern, high-impact 15-slide presentation deck for Series A funding.',
        budget: '$2,500',
        deadline: '2026-07-10',
        priority: 'Medium',
        status: 'Approved',
        fileUrl: '',
        notes: 'Keep details aligned with our branding guidelines.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]));
  }

  // Projects
  if (!localStorage.getItem(LS_KEYS.PROJECTS)) {
    localStorage.setItem(LS_KEYS.PROJECTS, JSON.stringify([
      {
        id: 'proj-1',
        title: 'E-commerce Storefront React Redesign',
        clientEmail: 'client@trinitypixelhub.com',
        status: 'In Progress',
        stage: 'In Development',
        progress: 65,
        assignedTeam: 'Web Dev & Data Team',
        estimatedCompletion: '2026-08-15',
        milestones: [
          { name: 'Discovery & Wireframes', status: 'Completed', date: '2026-06-10' },
          { name: 'UI Prototyping & Visuals', status: 'Completed', date: '2026-06-20' },
          { name: 'React Development Phase', status: 'In Progress', date: '2026-07-20' },
          { name: 'Integration & Analytics Setup', status: 'Pending', date: '2026-08-01' },
          { name: 'Launch & Handover', status: 'Pending', date: '2026-08-15' }
        ],
        notes: 'Development is running smoothly on React Vite template. Stripe hooks testing in progress.',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]));
  }

  // Support tickets
  if (!localStorage.getItem(LS_KEYS.SUPPORT)) {
    localStorage.setItem(LS_KEYS.SUPPORT, JSON.stringify([
      {
        id: 'tkt-1',
        clientEmail: 'client@trinitypixelhub.com',
        subject: 'Shopify Checkout API Key Error',
        category: 'Development Support',
        description: 'Encountering a 401 Authentication error when attempting to fetch checkout fields in the dev sandbox.',
        priority: 'High',
        status: 'In Progress',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        replies: [
          {
            sender: 'client@trinitypixelhub.com',
            senderName: 'Client Demo',
            text: 'Encountering a 401 Authentication error when attempting to fetch checkout fields in the dev sandbox.',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            sender: 'admin@trinitypixelhub.com',
            senderName: 'Technical Lead',
            text: 'Hello Client! Please ensure you are passing the correct Storefront Access Token instead of the Admin API key for storefront endpoints. Let us know if that resolves it.',
            timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString()
          }
        ]
      }
    ]));
  }

  // Messages
  if (!localStorage.getItem(LS_KEYS.MESSAGES)) {
    localStorage.setItem(LS_KEYS.MESSAGES, JSON.stringify([
      {
        id: 'msg-1',
        sender: 'admin@trinitypixelhub.com',
        senderName: 'Trinity Pixel Hub Support',
        receiver: 'client@trinitypixelhub.com',
        text: 'Welcome to Trinity Pixel Hub! Let us know how we can assist with your digital expansion.',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        read: true
      },
      {
        id: 'msg-2',
        sender: 'client@trinitypixelhub.com',
        senderName: 'Client Demo',
        receiver: 'admin@trinitypixelhub.com',
        text: 'Hi, I just submitted our first project brief. I look forward to working with your team!',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        read: true
      }
    ]));
  }

  // Notifications
  if (!localStorage.getItem(LS_KEYS.NOTIFICATIONS)) {
    localStorage.setItem(LS_KEYS.NOTIFICATIONS, JSON.stringify([
      {
        id: 'notif-1',
        email: 'client@trinitypixelhub.com',
        title: 'Project Setup Complete',
        text: 'Your project "E-commerce Storefront React Redesign" has been created and assigned to the development team.',
        read: false,
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'notif-2',
        email: 'client@trinitypixelhub.com',
        title: 'New Message Received',
        text: 'Support sent you a new message regarding your onboarding.',
        read: true,
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]));
  }

  // Blog posts
  if (!localStorage.getItem(LS_KEYS.BLOG)) {
    localStorage.setItem(LS_KEYS.BLOG, JSON.stringify([
      {
        id: 'post-1',
        title: 'The Future of High-Conversion Web Design in 2026',
        excerpt: 'Explore how React Router, fast asset pipelines, and real-time dashboards are driving conversion rates to new heights.',
        content: `As digital platforms evolve, the metrics for successful user experiences continue to shift. Today, users expect instant page speeds, zero latency state changes, and personalized portals that keep them close to their projects.

At Trinity Pixel Hub, we combine state-of-the-art frontend build engines with comprehensive client portal experiences to keep workflows transparent and highly efficient. Here are three major design paradigms shaping modern corporate storefronts:

### 1. Speed as a Core SEO Asset
Vite and React combine to make static-site generation and SPA navigation feel like a single contiguous experience. Eliminating browser loads keeps clients engaged longer and directly increases the conversion coefficient of design assets.

### 2. Custom User Portals
Providing client dashboards where users can upload files, coordinate tasks, review live code wireframes, and launch support tickets bridges the gap between development teams and stakeholders. It reduces email overhead by over 70%.

### 3. Metric-Driven Evolution
Data analysis is no longer an afterthought. Live dashboards and conversion telemetry must be built directly into the site code during the engineering stages. Redesigns based on telemetry rather than visual opinion are 3x more likely to increase conversions.`,
        category: 'Web Development',
        tags: ['React', 'Web Design', 'SEO', 'Vite'],
        author: 'Abdul Basit',
        authorRole: 'CEO & Founder',
        authorPic: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        date: '2026-06-20',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        comments: [
          { name: 'Sarah Connor', text: 'This transparent development cycle has changed how we think about hiring agencies!', date: '2026-06-22' }
        ]
      },
      {
        id: 'post-2',
        title: 'Brand Systems: Designing for Omni-Channel Scalability',
        excerpt: 'How to build typography guidelines, logo variations, and custom design patterns that work flawlessly from Instagram to billboard advertising.',
        content: `A brand identity is no longer just a logo file in a Dropbox folder. It is an active visual API that must adapt in real-time to varying contrast ratios, media strips, mobile screens, and ambient video backdrops.

When launching NovaEdge, our main goal was to prove that typography scales should be responsive and structured using relative layout parameters (rem/em / modular typography grids).

### The Brand Guide Framework:
1. **Dynamic Scaling**: Vector-only marks that survive high compression.
2. **Cohesive Colors**: Tailwind color spaces (like slate-950 and custom accents) that pass accessibility audits.
3. **Motion Integration**: Motion specifications that dictate logo animation speeds for video cards.`,
        category: 'Graphic Design',
        tags: ['Branding', 'Design System', 'Typography'],
        author: 'Maya Okafor',
        authorRole: 'Brand Partner',
        authorPic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        date: '2026-06-18',
        image: 'https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=1200&q=80',
        comments: []
      }
    ]));
  }

  // Testimonials
  if (!localStorage.getItem(LS_KEYS.TESTIMONIALS)) {
    localStorage.setItem(LS_KEYS.TESTIMONIALS, JSON.stringify([
      {
        id: 'test-1',
        quote: 'TPH translated a loose idea into a complete campaign identity with speed, polish, and a serious eye for detail.',
        name: 'Maya Okafor',
        role: 'Founder, NovaEdge',
        rating: 5,
        status: 'approved',
        featured: true
      },
      {
        id: 'test-2',
        quote: 'The website and launch assets felt premium from the first review. Every section had a clear conversion purpose.',
        name: 'Daniel Reed',
        role: 'Product Lead, PulseGrid',
        rating: 5,
        status: 'approved',
        featured: true
      },
      {
        id: 'test-3',
        quote: 'Their video edits gave our brand the energy we wanted without losing clarity. The final reel worked everywhere.',
        name: 'Aisha Bello',
        role: 'Creative Director, Orbit',
        rating: 5,
        status: 'approved',
        featured: true
      }
    ]));
  }

  // Activity Log
  if (!localStorage.getItem(LS_KEYS.ACTIVITY_LOG)) {
    localStorage.setItem(LS_KEYS.ACTIVITY_LOG, JSON.stringify([
      {
        id: 'act-1',
        email: 'client@trinitypixelhub.com',
        action: 'Account Created',
        details: 'Initial client login credentials generated by system.',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'act-2',
        email: 'client@trinitypixelhub.com',
        action: 'Submitted Booking',
        details: 'E-commerce Redesign 2026 booking request registered.',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]));
  }

  // Appointments
  if (!localStorage.getItem(LS_KEYS.APPOINTMENTS)) {
    localStorage.setItem(LS_KEYS.APPOINTMENTS, JSON.stringify([]));
  }

  // Saved Services
  if (!localStorage.getItem(LS_KEYS.SAVED_SERVICES)) {
    localStorage.setItem(LS_KEYS.SAVED_SERVICES, JSON.stringify([]));
  }
};

seedDatabase();

// Helper to broadcast changes for real-time pub/sub listeners
const databaseChangeListeners = [];
const triggerDatabaseChange = (collectionName) => {
  databaseChangeListeners.forEach(listener => {
    if (listener.collection === collectionName) {
      listener.callback();
    }
  });
};

// Mock Authentication State
let currentMockUser = null;
try {
  const storedUser = localStorage.getItem(LS_KEYS.CURRENT_USER);
  if (storedUser) currentMockUser = JSON.parse(storedUser);
} catch (e) {}

const authChangeListeners = [];
const triggerAuthChange = () => {
  authChangeListeners.forEach(listener => listener(currentMockUser));
};

export const mockAuth = {
  currentUser: currentMockUser,
  onAuthStateChanged: (callback) => {
    authChangeListeners.push(callback);
    // Trigger immediately with current state
    callback(currentMockUser);
    return () => {
      const idx = authChangeListeners.indexOf(callback);
      if (idx !== -1) authChangeListeners.splice(idx, 1);
    };
  },
  signInWithEmailAndPassword: async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = JSON.parse(localStorage.getItem(LS_KEYS.USERS) || '[]');
    const matched = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!matched) {
      throw new Error('AuthError: User not found.');
    }
    
    if (matched.password !== password) {
      throw new Error('AuthError: Incorrect password.');
    }
    
    if (matched.status === 'Suspended') {
      throw new Error('AuthError: Your account has been suspended. Please contact support.');
    }
    
    currentMockUser = {
      uid: matched.uid,
      displayName: matched.fullName,
      email: matched.email,
      phoneNumber: matched.phone || '',
      photoURL: matched.photoURL || '',
      role: matched.role || 'Client',
      status: matched.status || 'Active',
      preferences: matched.preferences || { notifications: true, emailAlerts: true }
    };
    
    localStorage.setItem(LS_KEYS.CURRENT_USER, JSON.stringify(currentMockUser));
    
    // Log activity
    const activityLog = JSON.parse(localStorage.getItem(LS_KEYS.ACTIVITY_LOG) || '[]');
    activityLog.unshift({
      id: 'act-' + Math.random().toString(36).substr(2, 9),
      email: currentMockUser.email,
      action: 'Log In',
      details: `Client logged in successfully. OS: Windows`,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(LS_KEYS.ACTIVITY_LOG, JSON.stringify(activityLog.slice(0, 100)));
    triggerDatabaseChange('activity_log');

    triggerAuthChange();
    return { user: currentMockUser };
  },
  createUserWithEmailAndPassword: async (email, password, additionalData = {}) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = JSON.parse(localStorage.getItem(LS_KEYS.USERS) || '[]');
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (exists) {
      throw new Error('AuthError: Email already in use.');
    }
    
    const newUser = {
      uid: 'user-' + Math.random().toString(36).substr(2, 9),
      fullName: additionalData.fullName || email.split('@')[0],
      name: additionalData.fullName || email.split('@')[0],
      email: email.toLowerCase(),
      phone: additionalData.phone || '',
      password: password,
      role: 'Client',
      status: 'Active',
      createdAt: new Date().toISOString(),
      photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      preferences: { notifications: true, emailAlerts: true }
    };
    
    users.push(newUser);
    localStorage.setItem(LS_KEYS.USERS, JSON.stringify(users));
    
    currentMockUser = {
      uid: newUser.uid,
      displayName: newUser.fullName,
      email: newUser.email,
      phoneNumber: newUser.phone,
      photoURL: newUser.photoURL,
      role: newUser.role,
      status: newUser.status,
      preferences: newUser.preferences
    };
    
    localStorage.setItem(LS_KEYS.CURRENT_USER, JSON.stringify(currentMockUser));
    
    // Log activity
    const activityLog = JSON.parse(localStorage.getItem(LS_KEYS.ACTIVITY_LOG) || '[]');
    activityLog.unshift({
      id: 'act-' + Math.random().toString(36).substr(2, 9),
      email: currentMockUser.email,
      action: 'Sign Up',
      details: `Account registered. Welcome email sent.`,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(LS_KEYS.ACTIVITY_LOG, JSON.stringify(activityLog.slice(0, 100)));
    triggerDatabaseChange('activity_log');
    
    // Trigger admin notification
    const adminNotif = {
      id: 'notif-' + Math.random().toString(36).substr(2, 9),
      email: 'admin@trinitypixelhub.com',
      title: 'New User Registered',
      text: `${newUser.fullName} has registered an account.`,
      read: false,
      timestamp: new Date().toISOString()
    };
    const adminNotifs = JSON.parse(localStorage.getItem(LS_KEYS.NOTIFICATIONS) || '[]');
    adminNotifs.unshift(adminNotif);
    localStorage.setItem(LS_KEYS.NOTIFICATIONS, JSON.stringify(adminNotifs));
    triggerDatabaseChange(LS_KEYS.NOTIFICATIONS);

    triggerAuthChange();
    return { user: currentMockUser };
  },
  signOut: async () => {
    currentMockUser = null;
    localStorage.removeItem(LS_KEYS.CURRENT_USER);
    triggerAuthChange();
  },
  sendPasswordResetEmail: async (email) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = JSON.parse(localStorage.getItem(LS_KEYS.USERS) || '[]');
    const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (!exists) {
      throw new Error('AuthError: Email not found.');
    }
    return true;
  },
  updateProfile: async (user, updates) => {
    const users = JSON.parse(localStorage.getItem(LS_KEYS.USERS) || '[]');
    const email = currentMockUser?.email;
    const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (index !== -1) {
      if (updates.displayName) users[index].fullName = updates.displayName;
      if (updates.photoURL) users[index].photoURL = updates.photoURL;
      localStorage.setItem(LS_KEYS.USERS, JSON.stringify(users));
    }
    
    currentMockUser = {
      ...currentMockUser,
      displayName: updates.displayName || currentMockUser.displayName,
      photoURL: updates.photoURL || currentMockUser.photoURL
    };
    localStorage.setItem(LS_KEYS.CURRENT_USER, JSON.stringify(currentMockUser));
    
    triggerAuthChange();
    return true;
  },
  updateEmail: async (newEmail) => {
    const users = JSON.parse(localStorage.getItem(LS_KEYS.USERS) || '[]');
    const email = currentMockUser?.email;
    const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (index !== -1) {
      users[index].email = newEmail.toLowerCase();
      localStorage.setItem(LS_KEYS.USERS, JSON.stringify(users));
    }
    currentMockUser.email = newEmail.toLowerCase();
    localStorage.setItem(LS_KEYS.CURRENT_USER, JSON.stringify(currentMockUser));
    triggerAuthChange();
    return true;
  },
  updatePassword: async (newPassword) => {
    const users = JSON.parse(localStorage.getItem(LS_KEYS.USERS) || '[]');
    const email = currentMockUser?.email;
    const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (index !== -1) {
      users[index].password = newPassword;
      localStorage.setItem(LS_KEYS.USERS, JSON.stringify(users));
    }
    return true;
  }
};

// Mock Firestore Database
export const mockDb = {
  collection: (collectionName) => {
    return { collectionName };
  },
  doc: (collectionRef, docId) => {
    return { collectionName: collectionRef.collectionName, docId };
  },
  addDoc: async (collectionRef, data) => {
    const collectionName = collectionRef.collectionName;
    const items = JSON.parse(localStorage.getItem(collectionName) || '[]');
    const newId = collectionName.slice(0, 3) + '-' + Math.random().toString(36).substr(2, 9);
    const newItem = { id: newId, ...data, createdAt: data.createdAt || new Date().toISOString() };
    items.unshift(newItem);
    localStorage.setItem(collectionName, JSON.stringify(items));
    triggerDatabaseChange(collectionName);
    return { id: newId, ...newItem };
  },
  setDoc: async (docRef, data) => {
    const { collectionName, docId } = docRef;
    const items = JSON.parse(localStorage.getItem(collectionName) || '[]');
    const index = items.findIndex(item => item.id === docId);
    const itemData = { id: docId, ...data, updatedAt: new Date().toISOString() };
    if (index !== -1) {
      items[index] = itemData;
    } else {
      items.push(itemData);
    }
    localStorage.setItem(collectionName, JSON.stringify(items));
    triggerDatabaseChange(collectionName);
    return true;
  },
  getDoc: async (docRef) => {
    const { collectionName, docId } = docRef;
    const items = JSON.parse(localStorage.getItem(collectionName) || '[]');
    const matched = items.find(item => item.id === docId);
    return {
      exists: () => Boolean(matched),
      data: () => matched
    };
  },
  getDocs: async (queryRef) => {
    let collectionName = '';
    let filterFunc = null;
    let limitNum = null;

    if (queryRef.collectionName) {
      collectionName = queryRef.collectionName;
    } else if (queryRef.colRef) {
      collectionName = queryRef.colRef.collectionName;
      filterFunc = queryRef.filterFunc;
      limitNum = queryRef.limitNum;
    }

    let items = JSON.parse(localStorage.getItem(collectionName) || '[]');
    if (filterFunc) {
      items = items.filter(filterFunc);
    }
    if (limitNum) {
      items = items.slice(0, limitNum);
    }
    return {
      docs: items.map(item => ({
        id: item.id,
        data: () => item
      }))
    };
  },
  updateDoc: async (docRef, data) => {
    const { collectionName, docId } = docRef;
    const items = JSON.parse(localStorage.getItem(collectionName) || '[]');
    const index = items.findIndex(item => item.id === docId);
    if (index !== -1) {
      items[index] = { ...items[index], ...data, updatedAt: new Date().toISOString() };
      localStorage.setItem(collectionName, JSON.stringify(items));
      triggerDatabaseChange(collectionName);
      return true;
    }
    throw new Error('FirestoreError: Document not found for update.');
  },
  deleteDoc: async (docRef) => {
    const { collectionName, docId } = docRef;
    const items = JSON.parse(localStorage.getItem(collectionName) || '[]');
    const filtered = items.filter(item => item.id !== docId);
    localStorage.setItem(collectionName, JSON.stringify(filtered));
    triggerDatabaseChange(collectionName);
    return true;
  },
  query: (colRef, ...queryConstraints) => {
    let filterFunc = (item) => true;
    let limitNum = null;

    queryConstraints.forEach(constraint => {
      if (constraint.type === 'where') {
        const { field, op, val } = constraint;
        const prevFilter = filterFunc;
        filterFunc = (item) => {
          if (!prevFilter(item)) return false;
          if (op === '==') return item[field] === val;
          if (op === '!=') return item[field] !== val;
          if (op === '>=') return item[field] >= val;
          if (op === '<=') return item[field] <= val;
          if (op === '>') return item[field] > val;
          if (op === '<') return item[field] < val;
          if (op === 'array-contains') return Array.isArray(item[field]) && item[field].includes(val);
          return true;
        };
      } else if (constraint.type === 'limit') {
        limitNum = constraint.val;
      }
    });

    return { colRef, filterFunc, limitNum };
  },
  where: (field, op, val) => {
    return { type: 'where', field, op, val };
  },
  orderBy: (field, direction = 'asc') => {
    return { type: 'orderBy', field, direction };
  },
  limit: (val) => {
    return { type: 'limit', val };
  },
  onSnapshot: (queryRef, callback) => {
    const colName = queryRef.collectionName || queryRef.colRef?.collectionName;
    const executeQuery = () => {
      let filterFunc = null;
      let limitNum = null;
      if (queryRef.colRef) {
        filterFunc = queryRef.filterFunc;
        limitNum = queryRef.limitNum;
      }
      let items = JSON.parse(localStorage.getItem(colName) || '[]');
      if (filterFunc) {
        items = items.filter(filterFunc);
      }
      if (limitNum) {
        items = items.slice(0, limitNum);
      }
      
      callback({
        docs: items.map(item => ({
          id: item.id,
          data: () => item
        }))
      });
    };

    // Trigger initial load
    executeQuery();

    // Register listener
    const listenerObj = {
      collection: colName,
      callback: executeQuery
    };
    databaseChangeListeners.push(listenerObj);

    // Return unsubscribe function
    return () => {
      const idx = databaseChangeListeners.indexOf(listenerObj);
      if (idx !== -1) databaseChangeListeners.splice(idx, 1);
    };
  }
};

// Mock Firebase Storage
export const mockStorage = {
  ref: (storageInstance, path) => {
    return { path };
  },
  uploadBytesResumable: (ref, file) => {
    const uploadTask = {
      on: (event, progressCallback, errorCallback, successCallback) => {
        // Simulate immediate file upload in 200ms
        setTimeout(() => progressCallback({ bytesTransferred: 50, totalBytes: 100 }), 50);
        setTimeout(() => progressCallback({ bytesTransferred: 100, totalBytes: 100 }), 150);
        setTimeout(() => {
          successCallback();
        }, 200);
      }
    };
    // Mock upload completion properties
    return uploadTask;
  },
  getDownloadURL: async (storageRef) => {
    // Generate a secure mockup URL or just return a default placeholder
    return `https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&q=80`;
  }
};

// -------------------------------------------------------------
// HYBRID EXPORTS (Use real firebase if config is valid, else mock)
// -------------------------------------------------------------

export const auth = isRealFirebaseConfigured && realAuth ? realAuth : mockAuth;
export const db = isRealFirebaseConfigured && realDb ? realDb : mockDb;
export const storage = isRealFirebaseConfigured && realStorage ? realStorage : mockStorage;

export const collection = (...args) => isRealFirebaseConfigured && realDb ? fbCollection(...args) : mockDb.collection(...args);
export const doc = (...args) => isRealFirebaseConfigured && realDb ? fbDoc(...args) : mockDb.doc(...args);
export const setDoc = (...args) => isRealFirebaseConfigured && realDb ? fbSetDoc(...args) : mockDb.setDoc(...args);
export const addDoc = (...args) => isRealFirebaseConfigured && realDb ? fbAddDoc(...args) : mockDb.addDoc(...args);
export const getDoc = (...args) => isRealFirebaseConfigured && realDb ? fbGetDoc(...args) : mockDb.getDoc(...args);
export const getDocs = (...args) => isRealFirebaseConfigured && realDb ? fbGetDocs(...args) : mockDb.getDocs(...args);
export const updateDoc = (...args) => isRealFirebaseConfigured && realDb ? fbUpdateDoc(...args) : mockDb.updateDoc(...args);
export const deleteDoc = (...args) => isRealFirebaseConfigured && realDb ? fbDeleteDoc(...args) : mockDb.deleteDoc(...args);
export const query = (...args) => isRealFirebaseConfigured && realDb ? fbQuery(...args) : mockDb.query(...args);
export const where = (...args) => isRealFirebaseConfigured && realDb ? fbWhere(...args) : mockDb.where(...args);
export const orderBy = (...args) => isRealFirebaseConfigured && realDb ? fbOrderBy(...args) : mockDb.orderBy(...args);
export const limit = (...args) => isRealFirebaseConfigured && realDb ? fbLimit(...args) : mockDb.limit(...args);
export const onSnapshot = (...args) => isRealFirebaseConfigured && realDb ? fbOnSnapshot(...args) : mockDb.onSnapshot(...args);
