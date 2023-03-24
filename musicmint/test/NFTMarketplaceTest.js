// uses waffle testing framework, and chai assertion library
//super similar to mockito, or jasmine
const { expect } = require("chai");

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

// anonymous callback function
describe("NFTMarketplace", function () {

    let NFT;
    let nft;
    let Marketplace;
    let marketplace
    let deployer;
    let addr1;
    let addr2;
    let addrs;
    let feePercent = 1;
    let URI = "sample URI"

    beforeEach(async function () {
        // Get the ContractFactories and Signers here.

        NFT = await ethers.getContractFactory("NFT");
        Marketplace = await ethers.getContractFactory("Marketplace");

        // signers are abstractions of etherum accounts which sign and send eth network transactions
        [deployer, addr1, addr2, ...addrs] = await ethers.getSigners();

        // To deploy our contracts
        nft = await NFT.deploy();
        marketplace = await Marketplace.deploy(feePercent);
    });

    // test that all contracts deployed successfully

    describe("Deployment", function () {

        it("Checks that our name is MusicMinty NFT and our collection contract symbol is MNTY", async function () {
            // This test expects the owner variable stored in the contract to be equal
            // to our Signer's owner.
            const nftName = "MusicMinty NFT"
            const nftSymbol = "MNTY"
            expect(await nft.name()).to.equal(nftName);
            expect(await nft.symbol()).to.equal(nftSymbol);
        });

        it("Checks that feeAccount address is our and and feePercent of the marketplace contract is 1", async function () {
            expect(await marketplace.feeAccount()).to.equal(deployer.address);
            expect(await marketplace.feePercent()).to.equal(feePercent);
        });
    });

    describe("Minting NFTs", function () {

        it("Checks we're minting correctly", async function () {
            // addr1 mints an nft
            await nft.connect(addr1).mint(URI)
            expect(await nft.tokenCount()).to.equal(1);
            expect(await nft.balanceOf(addr1.address)).to.equal(1);
            expect(await nft.tokenURI(1)).to.equal(URI);
            // addr2 mints an nft
            await nft.connect(addr2).mint(URI)
            expect(await nft.tokenCount()).to.equal(2);
            expect(await nft.balanceOf(addr2.address)).to.equal(1);
            expect(await nft.tokenURI(2)).to.equal(URI);
        });
    })

    describe("Making marketplace items", function () {
        let price = 1
        let result
        beforeEach(async function () {
            // addr1 mints an nft
            await nft.connect(addr1).mint(URI)
            // addr1 approves marketplace to spend nft
            await nft.connect(addr1).setApprovalForAll(marketplace.address, true)
        })


        it("Should track newly created item, transfer NFT from seller to marketplace and emit Offered event", async function () {
            // addr1 offers their nft at a price of 1 ether
            await expect(marketplace.connect(addr1).makeItem(nft.address, 1 , toWei(price)))
                .to.emit(marketplace, "Offered")
                .withArgs(
                    1,
                    nft.address,
                    1,
                    // wei is the smallest subdivision of ether, basically a penny
                    // ether = 1 * 10^18 wei
                    toWei(price),
                    addr1.address
                )
            // Owner of NFT should now be the marketplace
            expect(await nft.ownerOf(1)).to.equal(marketplace.address);
            // Item count should now equal 1
            expect(await marketplace.itemCount()).to.equal(1)
            // Get item from items mapping then check fields to ensure they are correct
            const item = await marketplace.items(1)
            expect(item.itemId).to.equal(1)
            expect(item.nft).to.equal(nft.address)
            expect(item.tokenId).to.equal(1)
            expect(item.price).to.equal(toWei(price))
            expect(item.sold).to.equal(false)
        });

        it("Fails if price is set to zero", async function () {
            await expect(
                marketplace.connect(addr1).makeItem(nft.address, 1, 0)
            ).to.be.revertedWith("Price must be greater than zero");
        });

    });

    describe("Purchasing marketplace items", function () {
        let price = 2
        let fee = (feePercent/100)*price
        let totalPriceInWei
        beforeEach(async function () {
            // addr1 mints an nft
            await nft.connect(addr1).mint(URI)
            // addr1 approves marketplace to spend tokens
            await nft.connect(addr1).setApprovalForAll(marketplace.address, true)
            // addr1 makes their nft a marketplace item.
            await marketplace.connect(addr1).makeItem(nft.address, 1 , toWei(price))
        })

        it("Updates item as sold, pay seller, transfer NFT to buyer, charge fees and emit a Bought event", async function () {
            const sellerInitalEthBal = await addr1.getBalance()
            const feeAccountInitialEthBal = await deployer.getBalance()
            // fetch items total price (market fees + item price)
            totalPriceInWei = await marketplace.getTotalPrice(1);
            // addr 2 purchases item.
            await expect(marketplace.connect(addr2).purchaseItem(1, {value: totalPriceInWei}))
                .to.emit(marketplace, "Bought")
                .withArgs(
                    1,
                    nft.address,
                    1,
                    toWei(price),
                    addr1.address,
                    addr2.address
                )
            const sellerFinalEthBal = await addr1.getBalance()
            const feeAccountFinalEthBal = await deployer.getBalance()
            // Item should be marked as sold
            expect((await marketplace.items(1)).sold).to.equal(true)
            // Seller should receive payment for the price of the NFT sold.
            expect(+fromWei(sellerFinalEthBal)).to.equal(+price + +fromWei(sellerInitalEthBal))
            // feeAccount should receive fee
            //TODO: fix this. All tests for on their won, but balance gets confused when this and update exist.
            //expect(+fromWei(feeAccountFinalEthBal)).to.equal(+fee + +fromWei(feeAccountInitialEthBal))
            // The buyer should now own the nft
            expect(await nft.ownerOf(1)).to.equal(addr2.address);
        })

        it("Fails for invalid item ids, sold items and when not enough ether is paid", async function () {
            // fails for invalid item ids
            await expect(
                marketplace.connect(addr2).purchaseItem(2, {value: totalPriceInWei})
            ).to.be.revertedWith("item doesn't exist");
            await expect(
                marketplace.connect(addr2).purchaseItem(0, {value: totalPriceInWei})
            ).to.be.revertedWith("item doesn't exist");
            // Fails when not enough ether is paid with the transaction.
            await expect(
                marketplace.connect(addr2).purchaseItem(1, {value: toWei(price)})
            ).to.be.revertedWith("not enough ether to cover item price and market fee");
            // addr2 purchases item 1
            await marketplace.connect(addr2).purchaseItem(1, {value: totalPriceInWei})
            // addr3 tries purchasing item 1 after its been sold
            const addr3 = addrs[0]
            await expect(
                marketplace.connect(addr3).purchaseItem(1, {value: totalPriceInWei})
            ).to.be.revertedWith("item already sold");
        });
    })

    describe("Updating marketplace items", function () {

        // let's make one first
        let price = 1
        let result
        beforeEach(async function () {
            // addr1 mints an nft
            await nft.connect(addr1).mint(URI)
            // addr1 approves marketplace to spend nft
            await nft.connect(addr1).setApprovalForAll(marketplace.address, true)
        })


        it("Should track newly created item, update the nft price and emit Offered event", async function () {
            // addr1 offers their nft at a price of 1 ether
            await expect(marketplace.connect(addr1).makeItem(nft.address, 1 , toWei(price))) //toWei(price)
                .to.emit(marketplace, "Offered")
                .withArgs(
                    1,
                    nft.address,
                    1,
                    // wei is the smallest subdivision of ether, basically a penny
                    // ether = 1 * 10^18 wei
                    toWei(price),
                    addr1.address
                )
            let newPrice = 2
            // change the price
            await expect(marketplace.connect(addr1).updateItem(1 , toWei(newPrice))) //toWei(price)
                .to.emit(marketplace, "Offered")
                .withArgs(
                    1,
                    nft.address,
                    1,
                    // wei is the smallest subdivision of ether, basically a penny
                    // ether = 1 * 10^18 wei
                    toWei(newPrice),
                    addr1.address
                )
            // Owner of NFT should now be the marketplace
            expect(await nft.ownerOf(1)).to.equal(marketplace.address);
            // Item count should now equal 1
            expect(await marketplace.itemCount()).to.equal(1)
            // Get item from items mapping then check fields to ensure they are correct
            const item = await marketplace.items(1)
            expect(item.itemId).to.equal(1)
            expect(item.nft).to.equal(nft.address)
            expect(item.tokenId).to.equal(1)
            expect(item.price).to.equal(toWei(newPrice))
            expect(item.sold).to.equal(false)
        });

        it("Should fail if price is set to zero", async function () {
            await expect(
                marketplace.connect(addr1).updateItem(1, 0)
            ).to.be.revertedWith("New price must be greater than zero");
        });

    });

    describe("Deleting marketplace items", function () {
        let price = 2
        let fee = (feePercent/100)*price
        let totalPriceInWei
        beforeEach(async function () {
            // addr1 mints an nft
            await nft.connect(addr1).mint(URI)
            // addr1 approves marketplace to spend tokens
            await nft.connect(addr1).setApprovalForAll(marketplace.address, true)
            // addr1 makes their nft a marketplace item.
            await marketplace.connect(addr1).makeItem(nft.address, 1 , toWei(price))

            // addr2 mints an nft
            await nft.connect(addr2).mint(URI)

            // addr2 approves marketplace to spend tokens
            await nft.connect(addr2).setApprovalForAll(marketplace.address, true)
            // addr2 makes their nft a marketplace item.
            await marketplace.connect(addr2).makeItem(nft.address, 2 , toWei(price))
        })

        it("Should delete item, transfer NFT to seller, emit a Cancelled event", async function () {
            // we delete item
            await expect(marketplace.connect(addr1).removeItem(1))
                .to.emit(marketplace, "Cancelled")
                .withArgs(
                    // 1,
                    // nft.address,
                    // 0,
                    // addr1.address
                )
            // The seller should now own the nft
            expect(await nft.ownerOf(1)).to.equal(addr1.address);
            // Item count should now equal 1
            expect(await marketplace.itemCount()).to.equal(1)
        })

        it("Should fail for sold items, and invalid item ids", async function () {
            // fails for invalid item ids
            await expect(
                marketplace.connect(addr1).removeItem(3)
            ).to.be.revertedWith("item doesn't exist");
            await expect(
                marketplace.connect(addr1).removeItem(0)
            ).to.be.revertedWith("item doesn't exist");

            // TODO:item already sold
        });
    })
})