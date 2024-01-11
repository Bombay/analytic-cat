import catFetch from '@/lib/cat-fetch'

export async function getServices() {
  return catFetch('/api/services').then(res => res.json())
}
