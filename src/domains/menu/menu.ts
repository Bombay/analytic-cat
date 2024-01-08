export interface Menu {
  id: string
  name: string
  url: string
}

export const menusByServiceId = (serviceId: string) => {
  switch (serviceId) {
    default:
      return [
        {
          id: 'dashboard',
          name: '대시보드',
          url: 'dashboard',
        },
      ]
  }
}
