# Welcome to MusicMint Marketplace!
A marketplace where artists can mint NFTs for their listerners to purchase.
Artists get 100% of the profits.

## Notes about site usage 
1) When logging in, you must connect an Etherium wallet (we utilized MetaMask). You cannot see the marketplace until you do this.
2) Our site is only dark mode compatible.




![D6C8B7D9-FDAA-4CD7-88AC-557C66671584_1_105_c](https://user-images.githubusercontent.com/77807959/233724252-eba05981-e540-4fac-963f-d852eb2ad2ff.jpeg)


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
