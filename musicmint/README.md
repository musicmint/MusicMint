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

# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
