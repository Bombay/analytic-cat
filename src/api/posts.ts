import axios from '@/lib/axios'
import { Post } from '@/domains/posts/posts'

/*
export async function getPosts() {
  const res = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
  return res.data
}
*/

export async function getPosts() {
  const res = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
  const data = res.data

  // Generate a random number between 1 and data.length
  const randomNum = Math.floor(Math.random() * data.length) + 1

  // Use slice to get 'randomNum' number of posts
  const randomPosts = data.slice(0, randomNum)
  console.log('get posts...', randomPosts.length)

  return randomPosts
}
