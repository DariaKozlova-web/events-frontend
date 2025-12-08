export const Loader = () => (
  <div className="flex flex-col items-center py-10">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-3 text-gray-500">Loading...</p>
  </div>
);

export const Skeleton = () => (
  <div className="animate-pulse space-y-4 p-6 max-w-3xl mx-auto">
    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
    <div className="h-4 bg-gray-300 rounded w-full"></div>
    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
    <div className="h-72 bg-gray-300 rounded"></div>
  </div>
);
