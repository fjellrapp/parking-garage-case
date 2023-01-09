import create from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

import {  GarageMap, ParkingSpotType } from '../models/garage';

export interface GarageStore {
    garage: GarageMap
    setOccupied: (floor: number, spotIndex: number) => void
}

const initialGarage: GarageMap = new Map().set(1, {
    capacity: 10,
    available: 8,
    spots: [
        {
            type: ParkingSpotType.COMPACT,
            occupied: true,
            occupiedDuration: new Date(),
            currentRate: 0
        },
        {
            type: ParkingSpotType.COMPACT,
            occupied: true,
            occupiedDuration: new Date(),
            currentRate: 0
        },
        {
            type: ParkingSpotType.COMPACT,
            occupied: false,
            occupiedDuration: null,
            currentRate: 0
        },
        {
            type: ParkingSpotType.LARGE,
            occupied: false,
            occupiedDuration: null,
            currentRate: 0
        },
        {
            type: ParkingSpotType.LARGE,
            occupied: false,
            occupiedDuration: null,
            currentRate: 0
        },
        {
            type: ParkingSpotType.LARGE,
            occupied: false,
            occupiedDuration: null,
            currentRate: 0
        },
        {
            type: ParkingSpotType.HANDICAP,
            occupied: false,
            occupiedDuration: new Date(),
            currentRate: 0
        },
        {
            type: ParkingSpotType.HANDICAP,
            occupied: false,
            occupiedDuration: null,
            currentRate: 0
        },
        {
            type: ParkingSpotType.MOTORCYCLE,
            occupied: false,
            occupiedDuration: null,
            currentRate: 0
        },
        {
            type: ParkingSpotType.MOTORCYCLE,
            occupied: false,
            occupiedDuration: null,
            currentRate: 0
        },
    ]
}).set(2, {
    capacity: 10,
    available: 5,
    spots: [
        {
            type: ParkingSpotType.COMPACT,
            occupied: true,
            occupiedDuration: new Date(),
            currentRate: 0
        },
        {
            type: ParkingSpotType.COMPACT,
            occupied: true,
            occupiedDuration: new Date(),
            currentRate: 0
        },
        {
            type: ParkingSpotType.COMPACT,
            occupied: false,
            occupiedDuration: null,
            currentRate: 0
        },
        {
            type: ParkingSpotType.LARGE,
            occupied: true,
            occupiedDuration: new Date(),
            currentRate: 0
        },
        {
            type: ParkingSpotType.LARGE,
            occupied: false,
            occupiedDuration: null,
            currentRate: 0
        },
        {
            type: ParkingSpotType.LARGE,
            occupied: false,
            occupiedDuration: null,
            currentRate: 0
        },
        {
            type: ParkingSpotType.HANDICAP,
            occupied: true,
            occupiedDuration: new Date(),
            currentRate: 0
        },
        {
            type: ParkingSpotType.HANDICAP,
            occupied: false,
            occupiedDuration: null,
            currentRate: 0
        },
        {
            type: ParkingSpotType.MOTORCYCLE,
            occupied: true,
            occupiedDuration: new Date(),
            currentRate: 0
        },
        {
            type: ParkingSpotType.MOTORCYCLE,
            occupied: false,
            occupiedDuration: null,
            currentRate: 0
        },
    ]
})

export const useGarageStore
= create<GarageStore, [["zustand/persist", unknown]]>(persist((set,get) => ({
    garage: initialGarage,
    setOccupied: (floor: number, spotIndex: number) => set((state: GarageStore) => {
        console.log(state, initialGarage)
        const garage = get().garage.get(floor);
        const spot = garage?.spots[spotIndex - 1];
        if (typeof spot !== 'undefined' && !spot.occupied) {
            spot.occupied = true;
            spot.occupiedDuration = new Date()
        }
        return state;
    })
}),{
    name: 'garage-storage',
    storage: createJSONStorage(() => sessionStorage),
    onRehydrateStorage: (state) => {
        console.log("rehydrate", state)
    }
}));
