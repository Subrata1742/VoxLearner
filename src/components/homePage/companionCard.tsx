
import { Clock, Activity } from 'lucide-react';

const CompanionCard = ({ companion }: { companion: any }) => {
    return (
        <div className="companion-card h-full">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="companion-name">{companion.name}</h3>
                    <p className="companion-topic">{companion.topic}</p>
                </div>
                <span className="companion-type">{companion.subject}</span>
            </div>

            <div className="companion-details">
                <div className="flex items-center gap-2 text-sm text-[#ffffffb3]">
                    <Activity className="text-[#e94560]" size={16} />
                    <span>{companion.style}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#ffffffb3]">
                    <Clock className="text-[#e94560]" size={16} />
                    <span>{companion.duration} min</span>
                </div>
            </div>
        </div>
    )
}

export default CompanionCard