import { ReactNode } from 'react'

function PostTemplate({ children }: { children: ReactNode }) {
  return <div className="overflow-hidden rounded-xl bg-white p-8 shadow-md">{children}</div>
}

function PostTitle({ children }: { children: ReactNode }) {
  return (
    <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">{children}</div>
  )
}

function PostSubtitle({ children }: { children: ReactNode }) {
  return (
    <div>
      <a
        href="#"
        className="mt-1 block text-lg font-medium leading-tight text-black hover:underline"
      >
        {children}
      </a>
    </div>
  )
}

function PostBody({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-gray-500">{children}</p>
}

export { PostTemplate, PostTitle, PostSubtitle, PostBody }
