import React, { useEffect, useState } from 'react'
import styles from '../../styles/componentStyles/artistSectionStyles/allArtists.module.css'
import Banner from './banner'

const AllArtists = (props) => {
  let [artistList, setArtistList] = useState<any>(null)

  useEffect(() => {
    if (!artistList) {
      getArtistList()
    }
  }, [artistList])


  let getArtistList = async () => {
    let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/artists/list`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    let data = await response.json()

    if (await response.status === 200) {
      let artistData = [] as any
      for (let [key, value] of Object.entries(data)) {
        let artistInfo = (value as any)
        console.log(`${key}: ${value}`);
        artistData.push({name: key, link: artistInfo["artist_endpoint"], followers: artistInfo["followers"], volume: "todo", image: artistInfo["image_url"]})
      }
      console.log(artistData);
      console.log(artistData[0]);
      
      
      
      await setArtistList(artistData)
    } else {
        console.log("could not fetch artists");
    }
}


  return (
    <>
    {artistList ? 
    
      // whole badge
    <div className={styles.banners}>
      <div className={styles.side}>
        <div className={styles.header}>
          <p className = {styles.artistHeader}>Artist</p>
          <p className = {styles.otherHeader}>Followers</p>
          {/* <p className = {styles.otherHeader}>Volume</p> */}
        </div>
        <Banner artist={artistList[0]}/>
        <Banner artist={artistList[1]}/>
        <Banner artist={artistList[2]}/>
        <Banner artist={artistList[3]}/>
        <Banner artist={artistList[4]}/>
      </div>
  
      <div className={styles.side}>
        <div className={styles.header}>
          <p className = {styles.artistHeader}>Artist</p>
          <p className = {styles.otherHeader}>Followers</p>
          {/* <p className = {styles.otherHeader}>Volume</p> */}
        </div>
        <Banner artist={artistList[5]}/>
        <Banner artist={artistList[6]}/>
        <Banner artist={artistList[7]}/>
        <Banner artist={artistList[8]}/>
        <Banner artist={artistList[9]}/> 
      </div>
    </div>
    : <></> } </>
  )
}
export default AllArtists