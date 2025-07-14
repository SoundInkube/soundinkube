import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="text-white min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-red-50 p-6 text-center">
      <div className="text-white space-y-6 max-w-md">
        <div className="text-white space-y-3">
          <h1 className="text-white text-8xl font-bold text-red-600">404</h1>
          <h2 className="text-white text-2xl font-semibold text-white">Page Not Found</h2>
          <p className="text-white text-muted-foreground">The page you're looking for doesn't exist or may have been moved.</p>
        </div>

        <div className="text-white flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <a href="/">Return Home</a>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
