import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if ((isSignUp && !username) || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    if (isSignUp) {
      // Placeholder for sign-up functionality
      setTimeout(() => {
        toast.success("Sign-up functionality coming soon!");
        setLoading(false);
      }, 1000);
    } else {
      // Placeholder for login functionality
      setTimeout(() => {
        toast.success("Login functionality coming soon!");
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16 flex items-center justify-center">
        <Card className="p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-primary bg-clip-text text-transparent">
            {isSignUp ? "Create an Account" : "Welcome Back"}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
                <div>
                    <label htmlFor="username" className="block text-sm font-medium mb-2">
                        Username
                    </label>
                    <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="yourusername"
                        required
                    />
                </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {isSignUp && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium mb-2"
                >
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              disabled={loading}
            >
              {loading
                ? isSignUp
                  ? "Creating Account..."
                  : "Logging in..."
                : isSignUp
                ? "Sign Up"
                : "Login"}
            </Button>
          </form>
          <p className="text-center mt-4">
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <Button variant="link" onClick={() => setIsSignUp(false)}>
                  Login
                </Button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <Button variant="link" onClick={() => setIsSignUp(true)}>
                  Sign Up
                </Button>
              </>
            )}
          </p>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
