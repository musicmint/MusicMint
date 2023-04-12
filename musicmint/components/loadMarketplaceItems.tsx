import { Item } from "../interfaces/Item";
import {PurchasedItem} from "../interfaces/PurchasedItem";

export const addIPFSProxy = (ipfsHash) => {
    const URL = "https://musicminty.infura-ipfs.io/ipfs/"
    const hash = ipfsHash.replace(/^ipfs?:\/\//, '')
    const ipfsURL = URL + hash

    console.log(ipfsURL) // https://<subdomain>.infura-ipfs.io/ipfs/<ipfsHash>
    return ipfsURL
}

export const loadMarketplaceItems = async (nft, marketplace) => {
    // Load all unsold items
    console.log(nft)
    console.log(marketplace)
    console.log("starting loading")
    const itemCount = await marketplace.itemCount()
    console.log(itemCount)

    // create array for the items
    let items: Item[] = []

    for (let i = 1; i <= itemCount; i++) {
        const item = await marketplace.items(i)
        console.log(item)
        if (!item.sold) {
            // get uri url from nft contract
            const uri = await nft.tokenURI(item.tokenId)
            console.log(uri)

            //we have to split it, and get the last part that's important. Super hacky, but that's life
            const uriParts = uri.split("/"); // split the string into an array of substrings
            const lastUriPart = uriParts.pop(); // get the last element of the array
            console.log(lastUriPart)

            //let's fetch
            const ipfsURL = addIPFSProxy(lastUriPart);
            const request = new Request(ipfsURL);
            const response = await fetch(request)
            console.log(response)

            //get the metadata
            const metadata = await response.json()

            // get total price of item (item price + fee)
            const totalPrice = await marketplace.getTotalPrice(item.itemId)

            //again, super hacky, but such is life
            const imageParts = (metadata.image).split("/"); // split the string into an array of substrings
            const lastImagePart = imageParts.pop(); // get the last element of the array
            const imagee = addIPFSProxy(lastImagePart);

            // Add item to items array
            items.push({
                totalPrice,
                itemId: item.itemId,
                seller: item.seller,
                name: metadata.name,
                description: metadata.description,
                image: imagee
            })
        }
    }
    return items
}

export const loadPurchasedItems = async (nft, marketplace, accountWallet) => {
    // Fetch purchased items from marketplace by quering Offered events with the buyer set as the user
    const filter =  marketplace.filters.Bought(null,null,null,null,null,accountWallet)
    const results = await marketplace.queryFilter(filter)
    //Fetch metadata of each nft and add that to listedItem object.
    const purchases = await Promise.all(results.map(async i => {
        // fetch arguments from each result
        i = i.args
        // get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId)

        //we have to split it, and get the last part that's important. Super hacky, but that's life
        const uriParts = uri.split("/"); // split the string into an array of substrings
        const lastUriPart = uriParts.pop(); // get the last element of the array
        console.log(lastUriPart)

        //let's fetch
        const ipfsURL = addIPFSProxy(lastUriPart);
        const request = new Request(ipfsURL);
        const response = await fetch(request)
        console.log(response)

        //get the metadata
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId)
        // define listed item object
        const purchasedItem: PurchasedItem = {
            totalPrice,
            price: i.price,
            itemId: i.itemId,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image
        };
        return purchasedItem;
    }))
    //setLoading(false)
    return purchases;
}