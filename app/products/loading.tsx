import { Icons } from '@/components/ui/icons'
import { Shell } from '@/components/ui/shell'

export default async function DashboardLoading() {
  return (
    <Shell>
      <div className='flex justify-center p-8'>
        <Icons.spinner className='animate-spin text-4xl' />
      </div>
    </Shell>
  )
}
