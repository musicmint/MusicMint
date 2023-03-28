import styles from '../styles/marketplace.module.css'
import NavBar from '../components/navbar'

export default function Home(nft, marketplace) {

  return (
    <div className={styles.marketplaceWrapper}> 
      <NavBar nft={nft} marketplace={marketplace}/>
        <div className={styles.marketplaceTitle}> MarketPlace</div>
        <div className={styles.marketplaceDescription}> You are on a marketplace page. Welcome!</div>
    </div>
  )
}