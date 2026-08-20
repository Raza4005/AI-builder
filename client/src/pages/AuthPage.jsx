import React, { useState } from 'react'
import LoginLeft from '../components/LoginLeft'
import { Link, useNavigate } from 'react-router-dom'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Loader2Icon } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const AuthPage = ({ mode }) => {

  const navigate = useNavigate();

  const { login, Register } = useAppContext();

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [confirmPassword, setConfirmPassword] = useState("");


  const isLogin = mode === "login"

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await Register(name, email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || (mode === "login" ? "invalid email or password" : "Registration failed"));
    } finally {
      setLoading(false);
    }
  }; 

  return (
    <div className="min-h-screen flex bg-white text-zinc-900 font-sans">
      {/* Left side  - Branding */}
      <LoginLeft />

      {/* Right side - Form */}
      <div className="flex-1 flex justify-center items-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-10">
            <h1 className="text-3xl font-medium tracking-tight text-zinc-900 mb-1.5 font-sans">
              {isLogin ? "Sign In" : 'Create an account'}</h1>
              <p className="text-zinc-400 text-sm">
                {isLogin ? "Welcome back! Please enter your details." : "Get started with our platform today."}
              </p>
          </div>
          {error && <div className="border border-red-200 bg-red-50 text-red-700 p-3 mb-6 text-xs rounded">{error}
            </div>}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-2 tracking-widest">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-2 py-2 border-b border-zinc-200 focus:outline-none focus:border-zinc-950 text-sm text-zinc-900 background-transparent placeholder-zinc-300 transition-colors"
                    placeholder="John Doe"
                    required
                  />
                </div>
              )}
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-2 tracking-widest">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-2 py-2 border-b border-zinc-200 focus:outline-none focus:border-zinc-950 text-sm text-zinc-900 background-transparent placeholder-zinc-300 transition-colors"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-2 tracking-widest">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-2 py-2 border-b border-zinc-200 focus:outline-none focus:border-zinc-950 text-sm text-zinc-900 background-transparent placeholder-zinc-300 transition-colors"
                      placeholder="••••••••"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-600 flex items-center justify-center cursor-pointer transition-colors">
                      {showPassword ? <EyeOffIcon size={14} /> : <EyeIcon size={14} />}
                    </button>
                  </div>
                </div>

                {/* {!isLogin && (
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-400 uppercase mb-2 tracking-widest">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-2 py-2 border-b border-zinc-200 focus:outline-none focus:border-zinc-950 text-sm text-zinc-900 background-transparent placeholder-zinc-300 transition-colors"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                )} */}

                <button type="submit" disabled={loading} 
                className="w-full py-2.5 bg-linear-to-br from-red-600 to-amber-600 text-white font-semibold hover:scale-102 disabled:opacity-40 flex items-center justify-center cursor-pointer mt-2 rounded-lg
                 transition-all">
                  {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
                  {isLogin ? "Sign In" : "Create Account"}
                </button>
            </form>
            <p className="text-sm text-zinc-400 mt-8 pt-6 border-t border-zinc-100 font-sans">
              {isLogin ? (
                <>
                New to Builder AI?{" "}
                <Link to="/register" className="text-zinc-900 font-medium hover:underline">
                  Create an account
                </Link>
                </>
              ) : (
                <>
                 Already have an account?{" "}
                <Link to="/login" className="text-zinc-900 font-medium hover:underline">
                  Sign in 
                </Link>               
                </>
              )}
            </p>
        </div>
      </div>
    </div>
  )
}

export default AuthPage