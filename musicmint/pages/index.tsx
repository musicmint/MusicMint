import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import AuthContext from '../src/context/auth'
import styles from '../styles/Home.module.css'

export default function Home({data, error}) {
  // console.log('data :>> ', data)
  // console.log('error :>> ', error)
  let {user, logoutUser, authTokens} = useContext(AuthContext)


  return (
    <>
      {user ? (
           <p  onClick={logoutUser}>Logout</p>
      ): (
          <Link href="/auth" >Login</Link>
      )}
      <h1>MUSIC MINT</h1>
      <div> This is test data, please ignore the relevance</div>
      <h2>-------- DATA BELOW --------</h2>
      {error && <p>{JSON.stringify(error)}</p>}
      <div>
        {data.map((element: any) => 
          <div key={element.id}>
            <div>Subject ---- {element.chosenSubject}</div>
            <div>Year ---- {element.chosenYear}</div>
            <div>Version ---- {element.chosenVersion}</div>
            <div>Problem Number ---- {element.chosenProblemNumber}</div>
            <div>Difficulty ---- {element.chosenDifficulty}</div>
            <div>Topics ---- {element.chosenTopics}</div>
          </div>
        )}
      </div>

    </>
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