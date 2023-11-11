'use client'

import { usePostsStore } from '@/domains/posts/posts'
import { ReactNode } from 'react'

export default function PostsContainer() {}

function Posts() {
  const { posts, addPost } = usePostsStore()

  return (
    <PostTemplate>
      {posts.map(post => (
        <Post key={post.id} title={post.title} subtitle={post.title} body={post.body} />
      ))}
    </PostTemplate>
  )
}

function PostTemplate({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-3">{children}</div>
}

function Post({ title, subtitle, body }: { title: string; subtitle: string; body: string }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md">
      <div className="md:flex">
        <div className="p-8">
          <PostTitle title={title} />
          <PostSubtitle subtitle={subtitle} />
          <PostBody body={body} />
        </div>
      </div>
    </div>
  )
}

function PostTitle({ title }: { title: string }) {
  return (
    <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">{title}</div>
  )
}

function PostSubtitle({ subtitle }: { subtitle: string }) {
  return (
    <a href="#" className="mt-1 block text-lg font-medium leading-tight text-black hover:underline">
      {subtitle}
    </a>
  )
}

function PostBody({ body }: { body: string }) {
  return <p className="mt-2 text-gray-500">{body}</p>
}

export { Posts }
