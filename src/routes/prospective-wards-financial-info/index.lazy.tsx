import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/prospective-wards-financial-info/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/prospective-wards-financial-info/"!</div>
}
