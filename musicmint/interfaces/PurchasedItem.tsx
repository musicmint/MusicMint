import { ethers } from "ethers";

export interface PurchasedItem {
    totalPrice: number;
    price: number;
    itemId: number;
    name: string;
    description: string;
    image: string;
}