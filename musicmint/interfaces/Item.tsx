import { ethers } from "ethers";

export interface Item {
    totalPrice: ethers.BigNumber;
    itemId: ethers.BigNumber;
    seller: string;
    name: string;
    description: string;
    image: string;
}