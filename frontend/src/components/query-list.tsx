import React from 'react'
import { List, type RowComponentProps } from 'react-window'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import FoodCard from './FoodCard';
import { queryStore } from '@/store/store';
import type { FoodItem } from '@/models/backend_models';


/*
    Using react window

    > Should use the fixed size one and that one is just List from react window

    > passing down prop to the list which is also passed down to the row component
        and the row componet is basically the styling and what it shows for each row.

    > the rowComponetn is the main part to render so I believe basically pass it down to that 
     since using global store can just get and pass down the global store
    


    With this we can make the query list a global store (or local and drill it)
    and when that changes the table will update




*/



// RowCompProps has a generic for the items on doc it says index and style are auto inject
function RowComponent({
    index,
    items,
    style
}: RowComponentProps<{
    items: FoodItem[];
}>) {
    return (
        <div className="flex items-center justify-between" style={style}>
            <FoodCard item={items[index]}>

            </FoodCard>
        </div>
    );
}

const QueryList = () => {

    const currentQueryList = queryStore((state) => state.queryList)

    return (
        <div className="absolute top-37 bottom-4 left-20 z-[1000] w-full max-w-sm p-1">
            {currentQueryList.length !== 0 && (
                <Card className="flex flex-col w-full h-full bg-white border-transparent ">
                    <CardContent className="flex-1 w-full h-full p-2">
                        <List
                            rowComponent={RowComponent}
                            rowCount={currentQueryList.length}
                            rowHeight={110}
                            rowProps={{ items: currentQueryList }}
                        />
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default QueryList;