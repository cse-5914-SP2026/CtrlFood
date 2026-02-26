export interface FoodItem {
    name: string,
    description: string,
    date: string,
    location: string,
    coordinates: {
        lat: number,
        lng: number,
    }
    address: string,
}