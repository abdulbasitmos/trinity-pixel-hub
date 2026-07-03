import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, KeyRound, ShieldCheck, Mail, Phone, User as UserIcon, Loader2 } from 'lucide-react';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, register, resetPassword } = useAuth();
  
  // Modes: 'signin', 'signup', 'forgot'
  const [mode, setMode] = useState('signin');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Input states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Field states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Load remember me email
  useEffect(() => {
    if (isAuthModalOpen) {
      const savedEmail = localStorage.getItem('tph-remember-email');
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    }
  }, [isAuthModalOpen]);

  // Form Validations
  const emailError = useMemo(() => {
    if (!email) return '';
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Please enter a valid email.';
  }, [email]);

  const phoneError = useMemo(() => {
    if (!phone) return '';
    return /^\+?[0-9\s-]{7,15}$/.test(phone) ? '' : 'Please enter a valid phone number.';
  }, [phone]);

  const passwordStrength = useMemo(() => {
    if (!password) return { label: 'None', color: 'bg-white/10', text: 'text-white/40' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-500', percent: '25%' };
    if (score <= 3) return { label: 'Medium', color: 'bg-amber-500', text: 'text-amber-500', percent: '60%' };
    return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-500', percent: '100%' };
  }, [password]);

  const confirmPasswordError = useMemo(() => {
    if (!confirmPassword) return '';
    return password === confirmPassword ? '' : 'Passwords do not match.';
  }, [password, confirmPassword]);

  const isFormValid = useMemo(() => {
    if (mode === 'signin') {
      return email && !emailError && password && password.length >= 6;
    }
    if (mode === 'signup') {
      return fullName && email && !emailError && phone && !phoneError && password && passwordStrength.label !== 'Weak' && !confirmPasswordError;
    }
    if (mode === 'forgot') {
      return email && !emailError;
    }
    return false;
  }, [mode, fullName, email, emailError, phone, phoneError, password, passwordStrength, confirmPasswordError]);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    closeAuthModal();
    setMode('signin');
    setFullName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
    setMessage({ text: '', type: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      if (mode === 'signin') {
        await login(email, password);
        if (rememberMe) {
          localStorage.setItem('tph-remember-email', email);
        } else {
          localStorage.removeItem('tph-remember-email');
        }
        setMessage({ text: 'Logged in successfully. Redirecting...', type: 'success' });
        setTimeout(() => {
          handleClose();
          window.history.pushState({}, '', '/contact');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }, 1000);
      } else if (mode === 'signup') {
        await register(email, password, { fullName, phone });
        setMessage({ text: 'Account registered successfully! Welcome aboard.', type: 'success' });
        setTimeout(() => {
          handleClose();
          window.history.pushState({}, '', '/contact');
          window.dispatchEvent(new PopStateEvent('popstate'));
        }, 1500);
      } else if (mode === 'forgot') {
        await resetPassword(email);
        setMessage({ text: 'A secure password recovery email has been sent.', type: 'success' });
      }
    } catch (error) {
      console.error(error);
      let errorMsg = error.message;
      if (errorMsg.includes('auth/')) {
        errorMsg = errorMsg.replace('Firebase: ', '').split('(')[0];
      }
      setMessage({ text: errorMsg, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
      {/* Backdrop overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="absolute inset-0 bg-tph-dark/80 backdrop-blur-md cursor-default" 
      />

      {/* Main Dialog container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-md bg-tph-dark/95 border border-white/10 rounded-2xl shadow-purple-glow/10 overflow-hidden flex flex-col backdrop-blur-xl"
      >
        {loading && (
          <div className="absolute inset-0 bg-tph-dark/75 z-10 flex items-center justify-center">
            <Loader2 className="animate-spin h-10 w-10 text-tph-cyan" />
          </div>
        )}

        <div className="p-7 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-tph-cyan">Studio Gate</span>
              <h2 className="text-xl font-bold text-white mt-1.5">
                {mode === 'signin' && 'Sign In'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'forgot' && 'Reset Password'}
              </h2>
            </div>
            <button 
              onClick={handleClose}
              className="text-white/40 hover:text-white text-xs font-bold bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full transition-colors duration-300"
            >
              Close
            </button>
          </div>

          {/* Mode Switcher */}
          {mode !== 'forgot' && (
            <div className="flex bg-white/[0.02] border border-white/5 p-1 rounded-xl">
              <button
                onClick={() => { setMode('signin'); setMessage({ text: '', type: '' }); }}
                className={`flex-1 text-center py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  mode === 'signin' ? 'bg-white text-tph-dark shadow-sm' : 'text-white/50 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setMode('signup'); setMessage({ text: '', type: '' }); }}
                className={`flex-1 text-center py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  mode === 'signup' ? 'bg-white text-tph-dark shadow-sm' : 'text-white/50 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Action alerts */}
          {message.text && (
            <div className={`p-4 rounded-xl flex items-start gap-3 border text-xs font-bold leading-normal ${
              message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
            }`}>
              <ShieldCheck className="h-4.5 w-4.5 shrink-0 mt-0.5" />
              <span>{message.text}</span>
            </div>
          )}

          {/* Authentication forms */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'signup' && (
              <div className="relative">
                <input 
                  type="text"
                  id="modalFullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder=" "
                  className="peer w-full rounded-xl border border-white/10 bg-white/[0.02] px-4.5 py-4 text-xs text-white placeholder-transparent focus:border-tph-cyan focus:outline-none focus:ring-1 focus:ring-tph-cyan transition-all duration-300"
                  required
                />
                <label
                  htmlFor="modalFullName"
                  className="absolute left-4.5 top-4 origin-[0] -translate-y-7 scale-75 text-[10px] text-tph-cyan transition-all duration-300 pointer-events-none peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-white/40 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-tph-cyan"
                >
                  Full Name
                </label>
              </div>
            )}

            <div className="relative">
              <input 
                type="email"
                id="modalEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                placeholder=" "
                className="peer w-full rounded-xl border border-white/10 bg-white/[0.02] px-4.5 py-4 text-xs text-white placeholder-transparent focus:border-tph-cyan focus:outline-none focus:ring-1 focus:ring-tph-cyan transition-all duration-300"
                required
              />
              <label
                htmlFor="modalEmail"
                className="absolute left-4.5 top-4 origin-[0] -translate-y-7 scale-75 text-[10px] text-tph-cyan transition-all duration-300 pointer-events-none peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-white/40 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-tph-cyan"
              >
                Email Address
              </label>
              {emailError && <p className="text-[10px] font-bold text-rose-500 mt-1.5">{emailError}</p>}
            </div>

            {mode === 'signup' && (
              <div className="relative">
                <input 
                  type="tel"
                  id="modalPhone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder=" "
                  className="peer w-full rounded-xl border border-white/10 bg-white/[0.02] px-4.5 py-4 text-xs text-white placeholder-transparent focus:border-tph-cyan focus:outline-none focus:ring-1 focus:ring-tph-cyan transition-all duration-300"
                  required
                />
                <label
                  htmlFor="modalPhone"
                  className="absolute left-4.5 top-4 origin-[0] -translate-y-7 scale-75 text-[10px] text-tph-cyan transition-all duration-300 pointer-events-none peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-white/40 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-tph-cyan"
                >
                  Phone Number
                </label>
                {phoneError && <p className="text-[10px] font-bold text-rose-500 mt-1.5">{phoneError}</p>}
              </div>
            )}

            {mode !== 'forgot' && (
              <div className="space-y-1.5">
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    id="modalPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=" "
                    className="peer w-full rounded-xl border border-white/10 bg-white/[0.02] pl-4.5 pr-10 py-4 text-xs text-white placeholder-transparent focus:border-tph-cyan focus:outline-none focus:ring-1 focus:ring-tph-cyan transition-all duration-300"
                    required
                  />
                  <label
                    htmlFor="modalPassword"
                    className="absolute left-4.5 top-4 origin-[0] -translate-y-7 scale-75 text-[10px] text-tph-cyan transition-all duration-300 pointer-events-none peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-white/40 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-tph-cyan"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-white/40 hover:text-white transition-colors duration-300"
                  >
                    {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
                
                {/* Password Strength bar */}
                {mode === 'signup' && password && (
                  <div className="pt-1.5 space-y-1">
                    <div className="flex justify-between text-[8px] font-bold uppercase tracking-wider">
                      <span className="text-white/30">Strength:</span>
                      <span className={passwordStrength.text}>{passwordStrength.label}</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${passwordStrength.color} transition-all duration-300`} style={{ width: passwordStrength.percent }} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {mode === 'signup' && (
              <div className="relative">
                <input 
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="modalConfirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder=" "
                  className="peer w-full rounded-xl border border-white/10 bg-white/[0.02] pl-4.5 pr-10 py-4 text-xs text-white placeholder-transparent focus:border-tph-cyan focus:outline-none focus:ring-1 focus:ring-tph-cyan transition-all duration-300"
                  required
                />
                <label
                  htmlFor="modalConfirmPassword"
                  className="absolute left-4.5 top-4 origin-[0] -translate-y-7 scale-75 text-[10px] text-tph-cyan transition-all duration-300 pointer-events-none peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-white/40 peer-focus:-translate-y-7 peer-focus:scale-75 peer-focus:text-tph-cyan"
                >
                  Confirm Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-3.5 text-white/40 hover:text-white transition-colors duration-300"
                >
                  {showConfirmPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
                {confirmPasswordError && <p className="text-[10px] font-bold text-rose-500 mt-1.5">{confirmPasswordError}</p>}
              </div>
            )}

            {/* Remember Me / Forgot Password */}
            {mode === 'signin' && (
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-white/10 bg-white/5 text-tph-cyan focus:ring-tph-cyan"
                  />
                  <span className="text-xs font-semibold text-white/50">Remember Me</span>
                </label>

                <button
                  type="button"
                  onClick={() => { setMode('forgot'); setMessage({ text: '', type: '' }); }}
                  className="text-xs font-semibold text-tph-cyan hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {mode === 'forgot' && (
              <div className="pt-1 text-right">
                <button
                  type="button"
                  onClick={() => { setMode('signin'); setMessage({ text: '', type: '' }); }}
                  className="text-xs font-semibold text-white/40 hover:text-white hover:underline"
                >
                  Back to Login
                </button>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={!isFormValid}
              className="w-full relative flex items-center justify-center rounded-full bg-tph-gradient py-4 text-xs font-bold uppercase tracking-wider text-white shadow-pink-glow transition hover:shadow-cyan-glow focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mode === 'signin' && 'Sign In'}
              {mode === 'signup' && 'Create Account'}
              {mode === 'forgot' && 'Send Recovery Email'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
