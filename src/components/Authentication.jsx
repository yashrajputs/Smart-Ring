import { useState } from 'react';
import HealthDashboard from './Dashboard';

export default function Authentication() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Mock successful login
    setIsLoggedIn(true);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!formData.email || !formData.password || !formData.name) {
      setError('Please fill in all fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Mock successful signup
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
    setActiveTab('login');
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <header className="w-full bg-white shadow-md p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600">Smart-Ring Dashboard</h1>
            <button 
              onClick={handleLogout}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </header>
        <HealthDashboard />
      </div>
    );
  }

return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-2xl">
            <div className="flex border-b">
                <button 
                    className={`w-1/2 py-4 text-center font-medium ${activeTab === 'login' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('login')}
                >
                    Login
                </button>
                <button 
                    className={`w-1/2 py-4 text-center font-medium ${activeTab === 'signup' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('signup')}
                >
                    Sign Up
                </button>
            </div>
            
            <div className="p-8">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                
                {activeTab === 'login' ? (
                    <form onSubmit={handleLogin}>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input 
                                id="email"
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input 
                                id="password"
                                type="password" 
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <input id="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSignup}>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Full Name
                            </label>
                            <input 
                                id="name"
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-email">
                                Email Address
                            </label>
                            <input 
                                id="signup-email"
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-password">
                                Password
                            </label>
                            <input 
                                id="signup-password"
                                type="password" 
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                                Confirm Password
                            </label>
                            <input 
                                id="confirm-password"
                                type="password" 
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                )}
                
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
                        <button 
                            onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
                            className="text-indigo-600 hover:text-indigo-500 font-medium"
                        >
                            {activeTab === 'login' ? 'Sign up now' : 'Log in now'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    </div>
);
}