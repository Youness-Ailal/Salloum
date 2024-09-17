import Button from "./Button";

//@ts-ignore
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-5 p-8 px-16 items-center rounded border border-sky-800/50 text-sky-950">
        <h1 className="uppercase text-2xl">Something went wrong 🧐</h1>
        <p>{error.message}</p>
        <div className="mt-5">
          <Button onClick={resetErrorBoundary}>Try again</Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorFallback;
