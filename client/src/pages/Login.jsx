


import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignIn = () => {
    console.log('Sign In clicked:', formData);
    // Handle sign in logic here
  };

  const handleSignUp = () => {
    console.log('Sign Up clicked');
    // Handle sign up navigation here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex min-h-[600px]">

        {/* Left Panel - Sign In Form */}
        <div className="flex-1 p-12 flex flex-col justify-center bg-white">
          <div className="max-w-sm mx-auto w-full">
            <h1 className="text-4xl font-bold text-orange-500 mb-2 text-center">
              Sign In to
            </h1>
            <h2 className="text-4xl font-bold text-orange-500 mb-12 text-center">
              Your Account
            </h2>

            <form onSubmit={handleSignIn} className="space-y-6 flex flex-col items-center">
              {/* Email Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-64 pl-12 pr-4 py-4 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all duration-200 text-gray-700 placeholder-gray-500"
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="max-w-64 pl-12 pr-12 py-4 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all duration-200 text-gray-700 placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>

              {/* Forgot Password Link */}
              <div className="text-center">
                <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 underline">
                  forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                className="w-[50%] bg-gradient-to-r rounded-full from-orange-400 to-orange-500 text-white py-3 font-semibold hover:from-orange-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                SIGN IN
              </button>
            </form>
          </div>
        </div>

        {/* Right Panel - Hello Friend */}
        <div className="flex-1 bg-gradient-to-br hidden md:block from-blue-600 to-blue-800 p-12 text-white relative overflow-hidden">
          {/* Geometric Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Diamond shapes */}
            <div className="absolute top-20 right-20 w-12 h-12 bg-blue-400 opacity-30 transform rotate-45 animate-pulse"></div>
            <div className="absolute top-40 left-16 w-8 h-8 bg-blue-300 opacity-40 transform rotate-45"></div>
            <div className="absolute bottom-40 right-32 w-10 h-10 bg-blue-500 opacity-25 transform rotate-45 animate-pulse"></div>

            {/* Circles */}
            <div className="absolute top-32 left-8 w-16 h-16 bg-blue-400 opacity-20 rounded-full animate-bounce"></div>
            <div className="absolute bottom-32 left-12 w-8 h-8 bg-blue-300 opacity-30 rounded-full"></div>
            <div className="absolute top-60 right-8 w-12 h-12 bg-blue-500 opacity-25 rounded-full animate-pulse"></div>

            {/* Triangle */}
            <div className="absolute bottom-20 right-16 w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-blue-400 opacity-30 animate-bounce"></div>
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center text-center">
            <h1 className="text-5xl font-bold mb-8">Hello Friend!</h1>
            <p className="text-blue-100 mb-12 text-xl leading-relaxed max-w-md mx-auto">
              Enter your personal details and start your journey with us
            </p>

            <button
              onClick={handleSignUp}
              className="border-2 border-white text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 mx-auto"
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}
export default Login