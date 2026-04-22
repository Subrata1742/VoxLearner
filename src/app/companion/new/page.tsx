import CompanionForm from '@/components/companion/CompanionForm'
import { newCompanionPermissions } from '@/lib/actions/companion.action'

const page = async () => {

    const permission = await newCompanionPermissions()
    console.log(permission)
    if (!permission) {
        return <div>You have reached the maximum number of companions</div>
    }
    return (
        <div className='w-[50%] text-white  max-w-xl mt-2 mx-auto  p-8 card-border bg-gray-900/50 rounded-2xl animate-slide-up'>
            <CompanionForm />
        </div>
    )
}

export default page