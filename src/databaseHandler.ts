import { Trip } from "./models/Trip";
import { openDB } from 'idb'

const DATABASE_NAME = "TripDB";
initDB().then(() => {
    console.log("Database initialized complete !")
})

export const insertTrip = async (TripInfo: Trip) => {
    const db = await openDB(DATABASE_NAME, 2)
    const key = await db.put("Trips", TripInfo)
    console.log("Inserted Trip " + key)
}

export const getAllTrip = async () => {
    const db = await openDB(DATABASE_NAME, 2)
    return await db.getAll("Trips")
}

export const getTripById = async (id: number) => {
    const db = await openDB(DATABASE_NAME, 2)
    return await db.get("Trips", id)
}

export const deleteTrip = async (id: number) => {
    const db = await openDB(DATABASE_NAME, 2)
    console.log("Deleted Trip " + id)
    return await db.delete("Trips", id)
}

export const deleteAllTrip = async () => {
    const db = await openDB(DATABASE_NAME, 2)
    return await db.clear("Trips")
}



async function initDB() {
    const db = await openDB(DATABASE_NAME, 2, {
        upgrade(db) {
            const store = db.createObjectStore('Trips', {
                keyPath: 'id',
                autoIncrement: true
            })
        }

    })
}