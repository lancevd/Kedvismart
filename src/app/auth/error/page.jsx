export default function AuthError() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-4">Authentication Error</h2>
      <p className="text-red-600 mb-4">
        Sorry, something went wrong with your authentication attempt.
      </p>
      <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Go to Login
      </a>
    </div>
  );
}
