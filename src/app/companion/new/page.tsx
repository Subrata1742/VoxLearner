import CompanionForm from '@/components/companion/CompanionForm'
import { newCompanionPermissions } from '@/lib/actions/companion.action'

const page = async () => {

    const permission = await newCompanionPermissions()
    if (!permission) {
        return (
            <div className="w-full max-w-2xl mt-16 mx-auto p-8 border border-red-500/30 bg-red-500/10 backdrop-blur-xl rounded-[2.5rem] text-center shadow-[0_15px_40px_rgba(239,68,68,0.2)]">
                <h2 className="text-2xl font-bold text-white mb-2">Limit Reached</h2>
                <p className="text-white/70">You have reached the maximum number of companions allowed.</p>
            </div>
        )
    }
    return (
        <div className='form-container'>
            <div className="form-bg-glow"></div>
            <CompanionForm />
        </div>
    )
}

export default page