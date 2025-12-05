export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <a href="/" className="inline-block">
            <h1 className="text-2xl font-bold text-gray-900">Crafted Portfolio</h1>
          </a>
        </div>
        {children}
      </div>
    </div>
  );
}