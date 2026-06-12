import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import authService from '../services/authService.js';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const { fullName, email, password } = formData;
      console.log('fullName:- ', fullName);
      const userResponse = await authService.registerUser(
        fullName,
        email,
        password,
      );
      // if User registered Successsfully then Redirect to login
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Navigation */}
      <nav className="h-20 border-b border-[#dddddd] flex items-center px-6 lg:px-16">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <Link to="/" className="text-2xl font-bold text-[#222222]">
            TodoTask
          </Link>
          <Link
            to="/login"
            className="text-base font-medium text-[#222222] hover:text-[#3f3f3f] transition-colors"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:py-20">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 lg:mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#222222] mb-3">
              Create account
            </h1>
            <p className="text-lg text-[#3f3f3f]">
              Join us and start making todos
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Input */}
            <div className="flex flex-col">
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-[#6a6a6a] mb-2"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className={`w-full px-3 py-4 text-base bg-white border-2 rounded-lg transition-all focus:outline-none ${
                  errors.fullName
                    ? 'border-[#c13515] focus:border-[#c13515]'
                    : 'border-[#dddddd] focus:border-[#222222]'
                }`}
              />
              {errors.fullName && (
                <p className="text-sm text-[#c13515] mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#6a6a6a] mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-3 py-4 text-base bg-white border-2 rounded-lg transition-all focus:outline-none ${
                  errors.email
                    ? 'border-[#c13515] focus:border-[#c13515]'
                    : 'border-[#dddddd] focus:border-[#222222]'
                }`}
              />
              {errors.email && (
                <p className="text-sm text-[#c13515] mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[#6a6a6a] mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                className={`w-full px-3 py-4 text-base bg-white border-2 rounded-lg transition-all focus:outline-none ${
                  errors.password
                    ? 'border-[#c13515] focus:border-[#c13515]'
                    : 'border-[#dddddd] focus:border-[#222222]'
                }`}
              />
              {errors.password && (
                <p className="text-sm text-[#c13515] mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-[#6a6a6a] mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={`w-full px-3 py-4 text-base bg-white border-2 rounded-lg transition-all focus:outline-none ${
                  errors.confirmPassword
                    ? 'border-[#c13515] focus:border-[#c13515]'
                    : 'border-[#dddddd] focus:border-[#222222]'
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-[#c13515] mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 mt-6 bg-[#ff385c] hover:bg-[#e00b41] disabled:bg-[#ffd1da] text-white font-medium text-base rounded-lg transition-colors"
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-sm text-[#222222] text-center mt-8">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-[#ff385c] hover:text-[#e00b41] transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#dddddd] py-8 px-6 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs text-[#6a6a6a] text-center">
            <p>© 2026 TodoTask, Inc. All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
