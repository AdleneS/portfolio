export const syncStoreWithRoute = (store: any, route: any) => {
  switch (route.path) {
    case '/':
      store.setPage(0)
      break
    case '/about':
      store.setPage(1)
      break
    case '/experiences':
      store.setPage(2)
      break
    default:
      break
  }
}
