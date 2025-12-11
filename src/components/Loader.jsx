export const Loader = () => (
  <div className="flex justify-center items-center py-10">
    <div className="w-10 h-10 border-4 border-evGreen border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export const Skeleton = () => (
  <div className="animate-pulse">
    <div className="h-6 bg-evGreen/20 rounded mb-4"></div>
    <div className="h-4 bg-evGreen/15 rounded mb-2"></div>
    <div className="h-4 bg-evGreen/15 rounded mb-2"></div>
    <div className="h-64 bg-evGreen/10 rounded-xl"></div>
  </div>
);
