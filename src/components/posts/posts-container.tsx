'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { getPosts } from '@/api/posts'
import { PostBody, PostSubtitle, PostTemplate, PostTitle } from '@/components/posts/post'

export default function PostsContainer() {
  const { data: posts } = useSuspenseQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  if (!posts) {
    return null
  }

  return (
    <div className="flex flex-col gap-3">
      {posts.map(post => (
        <PostTemplate key={post.id}>
          <PostTitle>{post.title}</PostTitle>
          <PostSubtitle>{post.title}</PostSubtitle>
          <PostBody>{post.body}</PostBody>
        </PostTemplate>
      ))}
    </div>
  )
}
