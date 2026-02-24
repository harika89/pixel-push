export default function Home() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-white/80 backdrop-blur-md dark:bg-background-dark/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary p-2">
                <span className="material-symbols-outlined text-white">
                  dashboard
                </span>
              </div>
              <span className="text-xl font-bold tracking-tight text-primary">
                Pixel Push
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                className="rounded-full p-2 text-slate-500 transition-colors hover:bg-primary/10"
                aria-label="Notifications"
              >
                <span className="material-symbols-outlined">notifications</span>
              </button>

              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/20">
                <span className="material-symbols-outlined text-primary">
                  person
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Welcome to Pixel Push
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Upload an image and we’ll optimize it (resize, strip metadata, convert to WebP)
            and email you a secure link when it’s ready.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm dark:bg-slate-900">
          <div className="space-y-8 p-6 sm:p-8">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">New upload</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                This is a single-page MVP UI. Next we’ll wire the inputs and submit logic.
              </p>
            </div>

            {/* Placeholder area where form will go next */}
            <div className="rounded-xl border border-primary/10 bg-primary/5 p-6 text-sm text-slate-700 dark:text-slate-200">
              Form goes here (email + image upload + submit button)
            </div>
          </div>
        </div>
      </main>
    </>
  );
}