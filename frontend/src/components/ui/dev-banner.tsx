import { Alert, AlertDescription } from "@/components/ui/alert";

export function DevBanner() {
  const isMockAuthEnabled = import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true';
  
  if (!isMockAuthEnabled) return null;
  
  return (
    <Alert className="text-white bg-yellow-50 border-yellow-200 text-netflix-red mb-4">
      <AlertDescription className="text-white text-center">
        🚧 <strong>Development Mode:</strong> Mock authentication is enabled. 
        Use any email and password (6+ characters) to login/signup.
      </AlertDescription>
    </Alert>
  );
}