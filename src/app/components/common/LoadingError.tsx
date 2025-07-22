export default function LoadingError() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="text-center">
        <p className="text-red-500">An error occurred while loading the advocate data.</p>
        <p>Please contact your system administrator or try again.</p>
      </div>
    </div>
  );
}