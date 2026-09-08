export default function App() {
  return (
    <div className="relative min-h-screen bg-slate-100 pt-28 text-gray-950 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90">
      {/* decorative background blobs, ported from the old RootLayout */}
      <div className="absolute right-[11rem] top-[-6rem] -z-10 h-[31.25rem] w-[31.25rem] rounded-full bg-[#fbe2e3] blur-[10rem] sm:w-[68.75rem]" />
      <div className="absolute left-[-35rem] top-[-1rem] -z-10 h-[50rem] w-[31.25rem] rounded-full bg-[#dbd7fb] blur-[10rem] sm:w-[68.75rem] md:left-[-33rem]" />

      <main className="flex flex-col items-center px-4">
        <h1 className="text-3xl font-bold text-blue-600">Vite + React + TS is running</h1>
        <p className="mt-4 text-gray-700 dark:text-white/80">
          Task 1 scaffold. Sections get ported in from <code>legacy/</code> next.
        </p>
      </main>
    </div>
  )
}
