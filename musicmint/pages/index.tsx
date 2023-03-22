import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import AuthContext from '../src/context/auth'
import styles from '../styles/marketplace.module.css'
import NavBar from '../components/Auth/navbar'
import ExampleBadge from '../components/Auth/examplebadge'
import { useState } from 'react'
import { ethers } from "ethers"
import { Spinner } from 'react-bootstrap'

import MarketplaceAbi from "./contractsData/Marketplace.json"
import MarketplaceAddress from './contractsData/Marketplace-address.json'
import NFTAbi from './contractsData/NFT.json'
import NFTAddress from './contractsData/NFT-address.json'


export default function Home({data, error}) {
  // console.log('data :>> ', data)
  // console.log('error :>> ', error)
  let {user, logoutUser, authTokens} = useContext(AuthContext)

  //let's set up everything needed for blockchain upon boot up
  const [loading, setLoading] = useState(true)
  const [account, setAccount] = useState(null)
  const [nft, setNFT] = useState({})
  const [marketplace, setMarketplace] = useState({})

  return (

    <>

      {/*<NavBar/>*/}
      <div className={styles.container}>
        <NavBar/>
        <Head>
          <title>MUSIC MINT MARKETPLACE</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          {/* <div className='title'>
            <p>MUSIC MINT MARKETPLACE</p>
          </div> */}
          <h1 className={styles.title}>MUSIC MINT MARKETPLACE</h1>

          <div className="secondarySection" style={{ marginTop: '6rem' }}>
            <h2 className={styles.secondaryTitle}>Who are we</h2>
            <p className={styles.description}>
              We are a community-driven NFT marketplace that is focused on supporting musicians and creators. Our platform
              enables artists to sell their unique creations as NFTs, while providing fans with a new way to engage with
              their favorite artists.
            </p>

            <h2 className={styles.secondaryTitle}>You can support your favorite creators by:</h2>
            <p className={styles.description}>
              Buying their NFTs, sharing their work with others, and following them on social media. By doing so, you help
              to build a community that supports musicians and creators.
            </p>

            <div className={styles.artistexamples}>
              <p>Support their journey.</p>
              <p>Cash out when they get famous.</p>
            </div>



            <div className="runner-container">
              <div className={styles.runner}>
                <ExampleBadge/>
              </div>
              <div className={styles.runner}>
                <ExampleBadge/>
              </div>
            </div>


            {/* <p className={styles.description}>
              We believe that artists should be rewarded for their hard work and creativity. That's why we offer a
              cash-out feature that enables artists to benefit from their success. When an artist's work gains popularity,
              they can cash out their earnings and use the funds to continue their creative journey.
            </p> */}

            <h2 className={styles.secondaryTitle}>Start Creating</h2>
            <p className={styles.description}>
              Are you a musician or creator looking for a new way to connect with your fans? Join our platform and start
              creating and selling your NFTs today.
            </p>
          </div>
        </main>
      </div>





      {error && <p>{JSON.stringify(error)}</p>}
      {/*<div>*/}
      {/*  {data.map((element: any) => */}
      {/*    <div key={element.id}>*/}
      {/*      <div>Subject ---- {element.chosenSubject}</div>*/}
      {/*      <div>Year ---- {element.chosenYear}</div>*/}
      {/*      <div>Version ---- {element.chosenVersion}</div>*/}
      {/*      <div>Problem Number ---- {element.chosenProblemNumber}</div>*/}
      {/*      <div>Difficulty ---- {element.chosenDifficulty}</div>*/}
      {/*      <div>Topics ---- {element.chosenTopics}</div>*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</div>*/}

    </>
  )
  // [AI-generated, Chatgpt]
}

export async function getStaticProps() {
  let error = null
  let data = []

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/smth`)
    data = await response.json();
    console.log("data is ")
    console.log(data)
  }
  catch (err) {
    console.log("error :>> ", err)
    error = err.message ? err.message : "Something went wrong"
  }

  return {
    props: {
      data: data,
      error: error,
    }
  }
}

