import styles from '../styles/marketplace.module.css'
import NavBar from '../components/Auth/navbar'

export default function Home({data, error}) {
  console.log('data :>> ', data)
  console.log('error :>> ', error)

  return (
    <div className={styles.marketplaceWrapper}> 
      <NavBar/>
        <div className={styles.marketplaceTitle}> MarketPlace</div>
        <div className={styles.marketplaceDescription}> You are on a marketplace page. Welcome!</div>
    </div>
  )
}

export async function getStaticProps() {
  let error = null
  let data = []
  
  try {
    const response = await fetch(`${process.env.BASE_URL}/smth`)
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