import React from 'react'
import { CategoryIslands } from './category-islands'
import { DatePicker } from './date-picker'
import LeftBar from './left-bar'
import QueryList from './query-list'
import { SearchBar } from './SearchBar'
import { queryStore } from '@/store/store'

const OverlayWrapper = () => {

    const [foodResult, setFoodResult] = React.useState<string | null>(null);

    const updateCurrentQueryList = queryStore((state) => state.populateBackendQueryList)

    const handleSearch = async (q: string) => {
        const res = await fetch("http://localhost:8000/query", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: q }),
        });

        if (!res.ok) {
            const text = await res.text();
            console.error("API error:", text);
            return;
        }
        const data = await res.json();
        console.log("ES results:", data);
        setFoodResult(
            data ? ` Found: ${JSON.stringify(data)}` : " No results found.",
        );

        updateCurrentQueryList(data) // set new to global store
    };

    return (
        <>
            <CategoryIslands></CategoryIslands>
            <SearchBar onSearch={handleSearch}></SearchBar>
            {/* <LeftBar></LeftBar> */}
            <DatePicker></DatePicker>
            <QueryList></QueryList>
        </>
    )
}

export default OverlayWrapper