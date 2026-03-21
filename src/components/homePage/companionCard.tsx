import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'

const ompanionCard = ({ companion }: { companion: any }) => {
    return (
        <Card className='bg-transparent backdrop-blur-xs text-white'>

            <CardContent className='gap-5 flex flex-col'>
                <Image src={companion.image} alt={companion.name} width={50} height={50} className='rounded-full' />
                <CardTitle>{companion.name}</CardTitle>
                <CardDescription>{companion.topic}</CardDescription>
                <p>{companion.duration} sec</p>
            </CardContent>
            <CardFooter>
                <CardAction>
                    <Link href={`/companion/${companion.id}`}>
                        <Button>Start Conversation</Button>
                    </Link>
                </CardAction>
            </CardFooter>
        </Card>
    )
}

export default ompanionCard