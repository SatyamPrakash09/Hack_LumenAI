import { useState } from 'react';
import { api } from '../api';

export default function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setusername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const payload = { password };
        if (email.includes('@')) {
          payload.email = email;
        } else {
          payload.username = email;
        }
        const user = await api.login(payload);
        onAuthSuccess(user);
      } else {
        await api.register({
          email,
          password,
          firstName,
          lastName,
          username,
        });
        const loggedInUser = await api.login({ email, password });
        onAuthSuccess(loggedInUser);
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4 relative overflow-hidden select-none">
      <div className="relative w-full max-w-sm">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/60">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-primary mx-auto mb-4 animate-pulse-emerald">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>token</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Lumen AI
            </h1>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">
              {isLogin ? 'Welcome back. Log in to continue.' : 'Create an account to start document analysis.'}
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs leading-normal">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">First Name</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Jane"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 rounded-xl py-2 px-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 rounded-xl py-2 px-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">Username</label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    placeholder="Username001"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 rounded-xl py-2 px-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">
                {isLogin ? 'Email or Username' : 'Email Address'}
              </label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isLogin ? "test@lumen.app or Username001" : "test@lumen.app"}
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 rounded-xl py-2 px-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 rounded-xl py-2 px-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-6 disabled:opacity-50 text-sm shadow-md shadow-indigo-200/50"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin text-lg" style={{ animationDuration: '2s' }}>progress_activity</span>
              ) : isLogin ? (
                'Continue'
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-slate-100 pt-4">
            <p className="text-xs text-slate-500">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-primary font-semibold ml-1.5 hover:underline focus:outline-none cursor-pointer"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
