import axios from '@/lib/axios'
import { Post } from '@/domains/posts/posts'

export async function getPosts() {
  return axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
}
