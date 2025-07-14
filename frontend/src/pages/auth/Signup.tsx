import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Music, User, Users, Briefcase } from "lucide-react";

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

  const roleOptions = [
    {
      value: "CLIENT" as UserRole,
      icon: User,
      title: "Client",
      description: "Book jam pads, hire professionals, and collaborate on projects"
    },
    {
      value: "MUSIC_PROFESSIONAL" as UserRole,
      icon: Music,
      title: "Music Professional",
      description: "Offer services, manage bookings, teach, and grow your music business"
    },
    {
      value: "ARTIST_MANAGER_LABEL" as UserRole,
      icon: Briefcase,
      title: "Artist Manager / Label",
      description: "Manage talent, scout artists, and oversee music business operations"
    }
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Music className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-white">SoundInkube</span>
          </div>
          <h2 className="text-3xl font-bold text-white">
            Join the Community
          </h2>
          <p className="mt-2 text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-red-600 hover:text-red-600 transition-colors duration-200">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="marketplace-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">Create Account</CardTitle>
            <CardDescription className="text-gray-300">
              Start your musical journey with SoundInkube
            </CardDescription>
          </CardHeader>

          <CardContent>
            {(error || passwordError) && (
              <Alert className="mb-6 border-red-200 bg-red-50" onClick={clearError}>
                <AlertDescription className="text-red-800">{error || passwordError}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-white">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  className="marketplace-input mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password (min 6 characters)"
                  required
                  autoComplete="new-password"
                  className="marketplace-input mt-1"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  autoComplete="new-password"
                  className="marketplace-input mt-1"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium text-white mb-3">Account Type</Label>
                <RadioGroup 
                  value={role} 
                  onValueChange={(value) => setRole(value as UserRole)}
                  className="space-y-3"
                >
                  {roleOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <div key={option.value} className="flex items-start space-x-3 p-4 rounded-lg border border-zinc-800 hover:border-green-300 hover:bg-green-50/50 transition-all duration-200 cursor-pointer">
                        <RadioGroupItem value={option.value} id={option.value} className="border-gray-400 text-red-600 mt-1" />
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="p-2 rounded-lg bg-green-100">
                            <IconComponent className="h-5 w-5 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <Label htmlFor={option.value} className="cursor-pointer text-white font-medium">
                              {option.title}
                            </Label>
                            <p className="text-sm text-gray-300 mt-1">{option.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>

              <Button
                type="submit"
                className="w-full marketplace-button-primary"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="loading-spinner mr-2"></div>
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
                  <div className="w-full border-t border-zinc-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-zinc-900 text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full marketplace-button-secondary"
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
          </CardContent>

          <CardFooter className="text-center">
            <p className="text-sm text-gray-400 w-full">
              By signing up, you agree to our{" "}
              <Link to="/terms" className="font-medium text-red-600 hover:text-red-600 transition-colors duration-200">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="font-medium text-red-600 hover:text-red-600 transition-colors duration-200">
                Privacy Policy
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}