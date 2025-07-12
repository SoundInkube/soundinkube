import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DevBanner } from "@/components/ui/dev-banner";

type UserRole = "CLIENT" | "MUSIC_PROFESSIONAL" | "ARTIST_MANAGER_LABEL";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("CLIENT");
  const [passwordError, setPasswordError] = useState("");
  const { signUp, loginWithGoogle, error, clearError, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any previous errors
    setPasswordError("");
    clearError();

    // Validate email
    if (!email || !email.includes('@')) {
      setPasswordError("Please enter a valid email address");
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    try {
      await signUp(email, password, role);
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Google signup failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-netflix-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <DevBanner />
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            SoundInkube
          </h1>
          <h2 className="mt-6 text-3xl font-bold text-white">
            Join the Community
          </h2>
          <p className="mt-2 text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-netflix-red hover:text-red-400 transition-colors duration-200">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="netflix-form netflix-fade-in">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white text-center">Create Account</h3>
            <p className="text-gray-400 text-center mt-2">
              Start your musical journey with SoundInkube
            </p>
          </div>

          {(error || passwordError) && (
            <Alert className="netflix-alert netflix-alert-error mb-6" onClick={clearError}>
              <AlertDescription>{error || passwordError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="netflix-label">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                autoComplete="email"
                className="netflix-input"
              />
            </div>

            <div>
              <Label htmlFor="password" className="netflix-label">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password (min 6 characters)"
                required
                autoComplete="new-password"
                className="netflix-input"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="netflix-label">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                autoComplete="new-password"
                className="netflix-input"
              />
            </div>

            <div>
              <Label className="netflix-label">Account Type</Label>
              <RadioGroup 
                value={role} 
                onValueChange={(value) => setRole(value as UserRole)}
                className="mt-3"
              >
                <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors duration-200">
                  <RadioGroupItem value="CLIENT" id="client" className="border-gray-500 text-netflix-red" />
                  <div className="flex-1">
                    <Label htmlFor="client" className="cursor-pointer text-white font-medium">Client</Label>
                    <p className="text-sm text-gray-400 mt-1">Book jam pads, hire professionals, and collaborate on projects</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors duration-200">
                  <RadioGroupItem value="MUSIC_PROFESSIONAL" id="professional" className="border-gray-500 text-netflix-red" />
                  <div className="flex-1">
                    <Label htmlFor="professional" className="cursor-pointer text-white font-medium">Music Professional</Label>
                    <p className="text-sm text-gray-400 mt-1">Offer services, manage bookings, teach, and grow your music business</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors duration-200">
                  <RadioGroupItem value="ARTIST_MANAGER_LABEL" id="manager" className="border-gray-500 text-netflix-red" />
                  <div className="flex-1">
                    <Label htmlFor="manager" className="cursor-pointer text-white font-medium">Artist Manager / Label</Label>
                    <p className="text-sm text-gray-400 mt-1">Manage talent, scout artists, and oversee music business operations</p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              className="w-full netflix-button-primary netflix-hover-glow"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="netflix-loading mr-2"></div>
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                type="button"
                variant="outline"
                className="w-full netflix-button-secondary netflix-hover-scale"
                onClick={handleGoogleSignup}
                disabled={loading}
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none">
                  <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4" />
                  <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45934 17.1399 5.50693 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853" />
                  <path d="M5.50253 14.3003C4.99987 12.8099 4.99987 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC04" />
                  <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45075 6.86173 9.10959 4.74966 12.2401 4.74966Z" fill="#EA4335" />
                </svg>
                Sign up with Google
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              By signing up, you agree to our{" "}
              <Link to="/terms" className="font-medium text-netflix-red hover:text-red-400 transition-colors duration-200">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="font-medium text-netflix-red hover:text-red-400 transition-colors duration-200">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}