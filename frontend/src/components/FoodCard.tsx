import React from 'react'
import { Card, CardContent } from './ui/card'
import type { FoodItem } from '@/models/backend_models'
import { currentSelectedStore } from '@/store/store'

interface Props {
    item: FoodItem,
};

const FoodCard = ({ item }: Props) => {

    const setCurrentSelectedFoodItem = currentSelectedStore((state) => state.setSelectedFoodItem)

    return (
        <Card className="bg-stone-400 mx-auto w-full max-w-sm hover:bg-accent hover:border-primary/50 cursor-pointer" onClick={() => setCurrentSelectedFoodItem(item)}>
            <CardContent>
                <div className='flex flex-col'>
                    <p>{item.name}</p>
                    <p>{item.date}</p>
                    <p>{item.location}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default FoodCard