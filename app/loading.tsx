export default function Loading() {
  return (
    <main className="relative min-h-screen">
      {/* nav placeholder */}
      <div className="fixed left-1/2 top-5 z-50 -translate-x-1/2">
        <div className="skeleton h-11 w-64 rounded-full" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-24 pb-20 lg:px-8 lg:pt-28">
        <div className="grid gap-10 lg:grid-cols-[330px_minmax(0,1fr)] lg:gap-14">
          {/* profile card */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[1.75rem] border border-border bg-card p-5">
              <div className="skeleton aspect-[3/4] w-full rounded-2xl" />
              <div className="skeleton mx-auto mt-6 h-6 w-40" />
              <div className="skeleton mx-auto mt-3 h-4 w-52" />
              <div className="skeleton mx-auto mt-2 h-4 w-40" />
              <div className="mt-6 flex justify-center gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="skeleton h-6 w-6 rounded-full" />
                ))}
              </div>
            </div>
          </aside>

          {/* content */}
          <div className="min-w-0 space-y-6">
            <div className="skeleton h-14 w-3/4 max-w-lg" />
            <div className="skeleton h-14 w-2/3 max-w-md" />
            <div className="space-y-2 pt-2">
              <div className="skeleton h-4 w-full max-w-xl" />
              <div className="skeleton h-4 w-5/6 max-w-lg" />
              <div className="skeleton h-4 w-2/3 max-w-md" />
            </div>
            <div className="flex gap-10 pt-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="skeleton h-9 w-16" />
                  <div className="skeleton h-3 w-20" />
                </div>
              ))}
            </div>
            <div className="skeleton h-11 w-40 rounded-full" />
            <div className="skeleton mt-6 h-72 w-full rounded-3xl" />
          </div>
        </div>
      </div>
    </main>
  )
}
