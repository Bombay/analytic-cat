import axios from '@/lib/axios'
import { Post } from '@/domains/posts/posts'

export async function getPosts() {
  const res = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
  return res.data
}
