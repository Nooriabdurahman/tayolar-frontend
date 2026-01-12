import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VerifyEmailPage from './pages/VerifyEmailPage';

// Admin Imports
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import JobModeration from './pages/admin/JobModeration';
import AdminSettings from './pages/admin/AdminSettings';

// Job & Service Pages
import PostJobPage from './pages/PostJobPage';
import CreateServicePage from './pages/CreateServicePage';
import MarketplacePage from './pages/MarketplacePage';

// Premium Imports
import PricingPage from './pages/PricingPage';
import CheckoutPage from './pages/CheckoutPage';

// Multi-Page Landing Imports
import FeaturesPage from './pages/FeaturesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import TestimonialsPage from './pages/TestimonialsPage';
import FAQPage from './pages/FAQPage';

// Static Page Imports
import {
  AboutPage, ContactPage, ServicesPage, PortfolioPage, BlogPage, NotFoundPage
} from './pages/StaticPages';

// New Page Imports
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import UserDashboardPage from './pages/UserDashboardPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import HelpSupportPage from './pages/HelpSupportPage';
import ProductsShopPage from './pages/ProductsShopPage';
import MaintenancePage from './pages/MaintenancePage';
import SitemapPage from './pages/SitemapPage';

// Layout for public pages (Navbar + Footer)
const PublicLayout = () => (
  <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-white text-lg font-bold mb-4">TailorHub</h3>
          <p className="text-sm text-slate-400 mb-4">Connecting you with the best tailors for custom clothing and alterations.</p>
          <Link to="/sitemap" className="text-sm text-slate-400 hover:text-white transition-colors">Sitemap</Link>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/marketplace" className="hover:text-white transition-colors">Browse Tailors</Link></li>
            <li><Link to="/products" className="hover:text-white transition-colors">Shop</Link></li>
            <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
            <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link to="/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/help" className="hover:text-white transition-colors">Help & Support</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link to="/how-it-works" className="hover:text-white transition-colors">How it Works</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            <li><Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; 2026 TailorHub. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/post-job" element={<PostJobPage />} />
          <Route path="/create-service" element={<CreateServicePage />} />

          {/* Main Content Pages */}
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/faq" element={<FAQPage />} />

          {/* Shop & Services */}
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/products" element={<ProductsShopPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />

          {/* Basic Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />

          {/* Legal Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsConditionsPage />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />

          {/* Support Pages */}
          <Route path="/help" element={<HelpSupportPage />} />

          {/* System Pages */}
          <Route path="/sitemap" element={<SitemapPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="jobs" element={<JobModeration />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
