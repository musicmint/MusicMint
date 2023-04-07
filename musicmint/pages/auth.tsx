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

const AuthPage = () => {
    let [onLogin, setOnLogin] = useState(true)
    let [openTab, setOpenTab] = useState(0);
    let { isAuthorized } = useContext(AuthContext)

      //let's set up everything needed for blockchain upon boot up
  const { user, logoutUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})

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
        if (isAuthorized) {
            router.push('/profile')
        }
    }, [])


// MetaMask Login/Connect
const web3Handler = async () => {
    const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0])

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
    const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
    setMarketplace(marketplace)
      console.log("marketplace set")
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
    setNFT(nft)
      console.log("nft set")
      console.log(nft)
    setLoading(false)
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
        ) : openTab === 0 ? (
          <Registraion  
            marketplace={marketplace} 
            nft={nft} 
            web3Handler={web3Handler} 
            account={account} 
            switchTab={switchTab}/>
        ) : (
          <CreateProfile 
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