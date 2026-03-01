import { motion } from "motion/react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/Button";
import { useNavigate } from "react-router-dom";
import { Chrome, AlertCircle, Loader2 } from "lucide-react";

export function SignIn() {
  const { login, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    setError(null);
    setIsLoggingIn(true);
    try {
      await login();
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login failed:", err);
      if (err.code === "auth/popup-closed-by-user") {
        setError("Sign-in popup was closed before completion.");
      } else if (err.code === "auth/operation-not-allowed") {
        setError("Google sign-in is not enabled in Firebase Console.");
      } else if (err.code === "auth/configuration-not-found") {
        setError("Firebase configuration error. Please ensure Google Auth is enabled in the Firebase Console and your project settings are correct.");
      } else if (err.code === "auth/unauthorized-domain") {
        setError(`This domain is not authorized in Firebase. Please add "${window.location.hostname}" to the "Authorized domains" list in your Firebase Console (Authentication > Settings > Authorized domains).`);
      } else {
        setError(err.message || "An unexpected error occurred during sign-in.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <Loader2 className="w-8 h-8 text-accent-green animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-bg-secondary p-8 rounded-2xl border border-white/10 shadow-2xl text-center"
      >
        <div className="flex justify-center mb-6">
          <Logo className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-text-secondary mb-8">
          Sign in to access your AI optimization dashboard.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-start gap-3 text-left">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-1">Sign-in Error</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full justify-center gap-4 py-6 text-lg font-semibold relative overflow-hidden group"
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <Chrome className="w-6 h-6 text-accent-blue group-hover:scale-110 transition-transform" />
                <span>Continue with Google</span>
              </>
            )}
          </Button>
        </div>

        <p className="mt-8 text-xs text-text-muted">
          By continuing, you agree to our Privacy Policy and Terms of Service.
        </p>
      </motion.div>
    </div>
  );
}
