

import { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Signup = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

    };


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex min-h-[600px]">
                {/* Left Panel - Welcome Back */}
                <div className={`flex-1 hidden md:block m bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white relative overflow-hidden transition-all duration-700 order-1`}>

                    {/* Floating Geometric Shapes */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-20 left-16 w-8 h-8 bg-blue-400 opacity-30 transform rotate-45 animate-pulse"></div>
                        <div className="absolute top-40 right-20 w-6 h-6 bg-blue-300 opacity-40 rounded-full animate-bounce"></div>
                        <div className="absolute bottom-32 left-8 w-12 h-12 bg-blue-500 opacity-20 transform rotate-12 animate-pulse"></div>
                        <div className="absolute bottom-20 right-16 w-4 h-4 bg-blue-200 opacity-50 transform rotate-45 animate-bounce"></div>
                    </div>

                    {/* Large Circle Background */}
                    <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-500 opacity-10 rounded-full animate-pulse"></div>

                    <div className="relative z-10 h-full items-center text-center flex flex-col justify-center">

                        <h1 className='font-bold text-3xl mb-2'>Welcome Back!</h1>
                        <p className="text-blue-100 mb-8 text-lg">
                            To keep connected with us please login with your personal info
                        </p>

                        <button
                            className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 w-fit"
                        >
                            SIGN IN
                        </button>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className={`flex-1 p-8 flex flex-col justify-center items-center transition-all duration-700 order-2`}>
                    <div className="transform transition-all duration-500">
                        <h2 className="text-3xl font-bold mb-3 text-gray-800 mb-2">
                            Create Account
                        </h2>


                        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-center">
                            {/* Name Field */}

                            <div className="relative transform transition-all duration-300">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Name"
                                    className="w-64 pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                    required
                                />
                            </div>


                            {/* Email Field */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    className="w-64 pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Password"
                                    className="w-64 pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>


                            {/* Submit Button */}
                            <button
                                type="button"
                                className="w-[50%] bg-gradient-to-r rounded-full from-orange-400 to-orange-500 text-white py-3 font-semibold hover:from-orange-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                SIGN UP
                            </button>
                        </form>

                    </div>

                    {/* Sign In Button */}
                  <h3 className='mt-3 md:hidden'>Already have an account ? <span className='underline cursor-pointer'>Login</span> </h3>
                </div>
            </div>
        </div>
    );
}

export default Signup;