import React from 'react'
import { Card, CardContent } from './ui/card'
import type { FoodItem } from '@/models/backend_models'

interface Props {
    item: FoodItem,
};

const FoodCard = ({ item }: Props) => {
    return (
        <Card className="bg-stone-500 mx-auto w-full max-w-sm">
            <CardContent>
                <div className='flex flex-col'>
                    <p>{item.name}</p>
                    <p>{item.date}</p>
                </div>

            </CardContent>
        </Card>
    )
}

export default FoodCard