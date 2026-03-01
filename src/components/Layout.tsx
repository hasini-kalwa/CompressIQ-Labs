import { motion, AnimatePresence } from "motion/react";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, History, LayoutDashboard, ChevronDown } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <Logo className="w-8 h-8" />
          <span className="font-bold text-xl tracking-tight">CompressIQ Labs</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <Link to="/solution" className="hover:text-accent-green transition-colors">Solution</Link>
          <Link to="/impact" className="hover:text-accent-green transition-colors">Impact</Link>
          {user && (
            <>
              <Link to="/dashboard" className="hover:text-accent-green transition-colors flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
              <Link to="/history" className="hover:text-accent-green transition-colors flex items-center gap-2">
                <History className="w-4 h-4" /> History
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/signin" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">
                Sign In
              </Link>
              <Link to="/get-started">
                <button className="bg-accent-green text-bg-primary px-4 py-2 rounded-lg text-sm font-bold hover:brightness-105 transition-all">
                  Get Started
                </button>
              </Link>
            </>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/5 transition-all"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ""} className="w-6 h-6 rounded-full" />
                ) : (
                  <div className="w-6 h-6 bg-accent-blue/20 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-accent-blue" />
                  </div>
                )}
                <span className="text-sm font-medium hidden sm:block">{user.displayName?.split(' ')[0]}</span>
                <ChevronDown className="w-4 h-4 text-text-muted" />
              </button>

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-bg-secondary border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1"
                  >
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-xs text-text-muted mb-1">Signed in as</p>
                      <p className="text-sm font-medium truncate">{user.email}</p>
                    </div>
                    <Link 
                      to="/dashboard" 
                      className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:bg-white/5 hover:text-white transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link 
                      to="/history" 
                      className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:bg-white/5 hover:text-white transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      <History className="w-4 h-4" /> History
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-400/5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-bg-primary border-t border-white/5 py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-3 mb-6">
            <Logo className="w-8 h-8" />
            <span className="font-bold text-xl tracking-tight">CompressIQ Labs</span>
          </Link>
          <p className="text-text-secondary max-w-sm leading-relaxed">
            Building the future of sustainable AI through intelligent model compression 
            and energy-efficient hardware optimization.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Platform</h4>
          <ul className="space-y-4 text-sm text-text-secondary">
            <li><Link to="/solution" className="hover:text-accent-green transition-colors">Solution</Link></li>
            <li><Link to="/impact" className="hover:text-accent-green transition-colors">Impact</Link></li>
            <li><Link to="/get-started" className="hover:text-accent-green transition-colors">Get Started</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold mb-6">Legal</h4>
          <ul className="space-y-4 text-sm text-text-secondary">
            <li><a href="#" className="hover:text-accent-green transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-accent-green transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-accent-green transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted uppercase tracking-widest font-bold">
        <div>© 2026 CompressIQ Labs. All rights reserved.</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
