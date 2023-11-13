import { getPosts } from '@/api/posts'
import getQueryClient from '@/lib/query-client'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import PostsContainer from '@/app/analytics/dashboard/_components/posts/posts-container'

export default async function PostsRsc() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsContainer />
    </HydrationBoundary>
  )
}
