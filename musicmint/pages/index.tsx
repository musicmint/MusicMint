import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import AuthContext from '../src/context/auth'
import styles from '../styles/marketplace.module.css'
import NavBar from '../components/navbar'
import ExampleBadge from '../components/examplebadge'
import CircleImage from '../circle.png'
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin"; // Note the path change

gsap.registerPlugin(ScrollToPlugin);

if (typeof window !== "undefined") {
const button = document.querySelector("#aboutButton");
if (button){
button.addEventListener("click", () => {
  gsap.to(window, {duration: 10, scrollTo: {y: "#aboutSection"}});
})}};


// [AI-generated, Chatgpt]
// Define an array of example users to print out on page
const exampleUsers = [
  {
    id: 1,
    name: 'John Smith',
    bio: 'I am a musician and producer from Los Angeles. I specialize in electronic music and have released several albums over the years.',
    nftName: 'Sunset Groove',
    nftDescription: 'A one-of-a-kind track that will take you on a journey through the sounds of the ocean and the sunset.',
    nftImage: '/nft1.jpg',
  },
  {
    id: 2,
    name: 'Emily Johnson',
    bio: 'I am a visual artist and photographer based in New York City. I love to capture the beauty of nature and urban landscapes.',
    nftName: 'Cityscape',
    nftDescription: 'A stunning photograph of the New York City skyline at night, taken from a rooftop in Brooklyn.',
    nftImage: '/nft2.jpg',
  },
  // Add more users as needed
]

export default function Home() {
  // console.log('data :>> ', data)
  // console.log('error :>> ', error)
  let {user, logoutUser, authTokens} = useContext(AuthContext)


  return (
    <>
      <div className={styles.container}>
        <NavBar/>
        <section id="titleSection" >
          <div className={styles.halfWidth}>
            <h1 className={styles.title}>MUSIC MINT MARKETPLACE</h1>
            <button id="aboutButton" className={styles.abtButton}>
              <a href="#aboutSection">ABOUT US</a></button>
          </div>
          <div className={styles.circle}>
            <Image src={CircleImage} alt="logo" width={450} height={450}/>
          </div>
        </section>

        <section id="aboutSection" className={styles.smth}>
          <div className={styles.section2Left}>
            <Image src={CircleImage} alt="logo" width={450} height={450}/>
          </div>
          <div className={styles.section2Right}>
            <h2 className={styles.secondaryTitle}>WHO ARE WE?</h2>
            <p className={styles.descriptionIntro}>
              We are a community-driven NFT marketplace that is focused on supporting musicians and creators. 
            </p>
            <p className={styles.descriptionElab}>
              Our platform enables artists to sell their unique creations as NFTs, while providing fans with a new way to engage with
              their favorite artists.
            </p>
          </div>
        </section>

        <section id="badgesSection" className={styles.badges}>
          <p>Support their journey.</p>
          <p>Cash out when they get famous.</p>
        </section>
        {/* <main className={styles.main}>
     

          <h1 className={styles.title}>MUSIC MINT MARKETPLACE</h1>
  */}

          {/* <div className="secondarySection" style={{ marginTop: '18rem' }}>
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
            </div> */}

            

            {/* <div className="runner-container">
              <div className={styles.runner}>
                <ExampleBadge/>
              </div>
              <div className={styles.runner}>
                <ExampleBadge/>
              </div>
            </div> */}

            
            {/* <p className={styles.description}>
              We believe that artists should be rewarded for their hard work and creativity. That's why we offer a
              cash-out feature that enables artists to benefit from their success. When an artist's work gains popularity,
              they can cash out their earnings and use the funds to continue their creative journey.
            </p> */}

            {/* <h2 className={styles.secondaryTitle}>Start Creating</h2>
            <p className={styles.description}>
              Are you a musician or creator looking for a new way to connect with your fans? Join our platform and start
              creating and selling your NFTs today.
            </p> */}
          {/* </div> */}
        {/* </main> */}
      </div>


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
