import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, ArrowRight } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  
  const { login } = useAppStore();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative px-4 overflow-hidden py-12">
      {/* Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none animate-blob" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none animate-blob [animation-delay:2000ms]" />

      <div className="w-full max-w-md glass p-8 rounded-3xl z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-primary-foreground font-bold text-3xl shadow-xl mb-6 animate-float">
            <UserPlus size={32} />
          </div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Create Account</h2>
          <p className="text-muted-foreground mt-2 font-medium">Join InsightDash and start analyzing</p>
        </div>

        {serverError && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium text-center animate-in zoom-in duration-300">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground ml-1">Full Name</label>
            <div className="input-container">
              <User className="input-icon" size={20} />
              <input 
                type="text" 
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({...errors, name: ''});
                }}
                placeholder="John Doe"
                className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500/20' : ''}`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1.5 ml-1 font-medium">{errors.name}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground ml-1">Email Address</label>
            <div className="input-container">
              <Mail className="input-icon" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({...errors, email: ''});
                }}
                placeholder="name@example.com"
                className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500/20' : ''}`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1.5 ml-1 font-medium">{errors.email}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground ml-1">Password</label>
            <div className="input-container">
              <Lock className="input-icon" size={20} />
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({...errors, password: ''});
                }}
                placeholder="••••••••"
                className={`input-field ${errors.password ? 'border-red-500 focus:ring-red-500/20' : ''}`}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && <p className="text-xs text-red-500 mt-1.5 ml-1 font-medium">{errors.password}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground ml-1">Confirm Password</label>
            <div className="input-container">
              <Lock className="input-icon" size={20} />
              <input 
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors({...errors, confirmPassword: ''});
                }}
                placeholder="••••••••"
                className={`input-field ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500/20' : ''}`}
              />
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1.5 ml-1 font-medium">{errors.confirmPassword}</p>}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary flex items-center justify-center space-x-2 mt-4"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm font-medium text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline transition-all">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
