import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/application-for-appointment/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/application-for-appointment/"!</div>
}
