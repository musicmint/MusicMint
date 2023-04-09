import { createContext, useState } from 'react';

interface MarketplaceContextType {
    marketplace: any | null;
    setMarketplace: React.Dispatch<React.SetStateAction<any | null>> | null;
    nft: any | null;
    setNFT: React.Dispatch<React.SetStateAction<any | null>> | null;
}

export const MarketplaceContext = createContext<MarketplaceContextType>({
    marketplace: null,
    setMarketplace: null,
    nft: null,
    setNFT: null,
});

const MarketplaceProvider = ({ children }) => {
    const [marketplace, setMarketplace] = useState<any | null>(null);
    const [nft, setNFT] = useState<any | null>(null);

    return (
        <MarketplaceContext.Provider value={{ marketplace, setMarketplace, nft, setNFT }}>
            {children}
        </MarketplaceContext.Provider>
    );
};

export default MarketplaceProvider;