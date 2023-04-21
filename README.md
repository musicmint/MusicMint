# Welcome to MusicMint Marketplace!
A marketplace where artists can mint NFTs for their listerners to purchase.
Artists get 100% of the profits.

## Notes about site usage 
1) When logging in, you must connect an Etherium wallet (we utilized MetaMask). You cannot see the marketplace until you do this.
2) Our site is only dark mode compatible.

### Developers
- Anneliese Breidsprecher: UI design
- Sarah Serros-Myers: UI design 
- Masha Sedunova: Blockchain & NFT integration
- Fateen Rafid: API integration
- Luka Gurgendize: Backend Developer, Frontend connection, API integration

### Check out our tik tok! 
@musicmintmarket


# Frontend
1) cd musicmint

2) npm install

3) add a file named ".env.local" under the root folder (not "musicmint" folder)and add the following line:
    BASE_URL = http://localhost:8000/api

4) npm run dev
5) cd music mint

# First time you pull with hardhat 

6) under the 'pages' directory, create a directory called contractsData
7) in scripts/deploy.js change this line: "/Users/mashasedunova/WebstormProjects/MMM/musicmint/pages/contractsData"
to the absolute path of your contractsData directory
8) cd musicmint
9) npx hardhat node
10) open a second terminal
11) cd musicmint
11) npx hardhat run scripts/deploy.js --network localhost
