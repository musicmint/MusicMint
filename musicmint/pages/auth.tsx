import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../src/context/auth'
import Login from '../components/Auth/login'
import Registraion from '../components/Auth/registration'
import NavBar from '../components/navbar'
import router from 'next/router'
import { ethers } from "ethers"

import MarketplaceAbi from "./contractsData/Marketplace.json"
import MarketplaceAddress from './contractsData/Marketplace-address.json'
import NFTAbi from './contractsData/NFT.json'
import NFTAddress from './contractsData/NFT-address.json'
import Link from 'next/link'
import CreateProfile from '../components/Auth/createProfile'
import { MarketplaceContext } from '../src/context/contracts';

const AuthPage = () => {
    let [onLogin, setOnLogin] = useState(true)
    let [openTab, setOpenTab] = useState(0);
    let { isAuthorized, user, logoutUser} = useContext(AuthContext)

      //let's set up everything needed for blockchain upon boot up
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const { marketplace, setMarketplace, nft, setNFT, accountWallet, setAccountWallet} = useContext(MarketplaceContext)

    const switchTab = () => {
        setOnLogin(!onLogin);
        setOpenTab(0);
    }

    const handleRegisterClick = () => {
      setOpenTab(1); // set openTab to create profile when clicking on register
    };
  

    // const handleTabChange = (tabName : string) => {
    //     setOnRegister(!onRegister)
    // }


    useEffect(() => {
        if (router.query.tab == "register") {
          switchTab()
        }
    }, [router.query])

    useEffect(() => {
        if (isAuthorized) {
          if (user.email !== "" && !user.is_artist) {
            router.push('/profile')
          } else {
            router.push('/userProfile')
          }
        }
    }, [])

// MetaMask Login/Connect
const web3Handler = async () => {
    const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])

    //set for context
    const accountWallet = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    if (setAccountWallet) {
        setAccountWallet(accountWallet);
    }

    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider((window as any).ethereum)

    // Set signer
    const signer = provider.getSigner() as ethers.providers.JsonRpcSigner;
    (window as any).ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    //chat gpt said this function works better
    //use the window.addEventListener method to listen for changes to the accounts
    //Note the use of ethereum#accountsChanged instead of accountsChanged.
    //This is the correct event name to use for listening to changes in the accounts when using the new MetaMask API.
    window.addEventListener('ethereum#accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await web3Handler()
    })
    loadContracts(signer)
  }
  const loadContracts = async (signer) => {

    // Get deployed copies of contracts
    const marketplaceContract = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
      try {
          const marketplaceContract = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
          const nftContract = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
          if (setMarketplace) {
              setMarketplace(marketplaceContract);
          }
          if (setNFT) {
              setNFT(nftContract);
          }
          const itemCount = await marketplaceContract.itemCount();
          console.log(itemCount);
          setLoading(false);
      } catch (error) {
          console.error(error);
      }
  }

    return (
        <>
        <NavBar nft={nft} marketplace={marketplace}/>
        {onLogin ? ( 
          <Login  
            marketplace={marketplace} 
            nft={nft} 
            web3Handler={web3Handler} 
            account={account} 
            switchTab={switchTab}/> 
        ) : (
          <Registraion  
            marketplace={marketplace} 
            nft={nft} 
            web3Handler={web3Handler} 
            account={account} 
            switchTab={switchTab}/>
        ) 
        }
        </>
    )
}

export default AuthPage