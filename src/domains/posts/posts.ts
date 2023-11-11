import { create } from 'zustand'

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  favorite: boolean
}

export interface PostStore {
  posts: Post[]
  addPost: (newPost: Post) => void
}

const initialData: Post[] = [
  { id: 1, title: '타이틀1', body: '내용1', userId: 1, favorite: false },
  { id: 2, title: '타이틀2', body: '내용2', userId: 1, favorite: false },
  { id: 3, title: '타이틀3', body: '내용3', userId: 1, favorite: false },
  { id: 4, title: '타이틀4', body: '내용4', userId: 1, favorite: true },
  { id: 5, title: '타이틀5', body: '내용5', userId: 1, favorite: true },
]

const usePostsStore = create<PostStore>(set => ({
  posts: initialData,
  addPost: (newPost: Post) => set(state => ({ posts: [...state.posts, newPost] })),
}))

export { usePostsStore }
