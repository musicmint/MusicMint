import React, {useContext, useEffect, useState} from 'react'
import styles from '../styles/componentStyles/searchBar.module.css'
import Link from 'next/link'
import AuthContext from '../src/context/auth'
import Image from 'next/image'
import logo from '../music-mint-marketplace.png'

const SearchBar = (props, { nft, marketplace }) => {
    let [artistsList, setArtistsList] = useState<any>(null)
    let [searchResult, setSearchResult] = useState<any>(null)
    let [hideResult, setHideResult] = useState<any>(null)


    useEffect(() => {
        getArtistList()
    }, [])

    useEffect(() => {
        if (artistsList) {
            const searchInput = document.getElementById('artistSearch') as HTMLInputElement;
            searchInput.addEventListener('input', filterOnKeyPress);
            return () => {
                searchInput.removeEventListener("input", filterOnKeyPress);
            };
        }
    }, [artistsList])

    useEffect(() => {
        console.log("ENTERED USEFEFECT");
        
        (document.getElementById("artistSearch") as HTMLElement).addEventListener('focus', hideDropdown);

        (document.getElementById("artistSearch") as HTMLElement).addEventListener('blur', hideDropdown);

    }, [artistsList])

    let hideDropdown = async (event: Event) => {              
        const searchInput = document.getElementById('artistSearch') as HTMLInputElement;
        console.log(document.activeElement)
        if (searchInput != document.activeElement) {
            setTimeout(function(){
                (document.getElementById("searchResults") as HTMLElement).style.display = "none"
            },100);
        } else {
            (document.getElementById("searchResults") as HTMLElement).style.display = "block"
        }
    }

    let filterOnKeyPress = async (event: Event) => {
        const searchQuery = (event.target as HTMLInputElement).value;
        let filteredObjects = filterObjectsBySearchQuery(searchQuery);
        setSearchResult(filteredObjects);
    }



    let filterObjectsBySearchQuery = (query: string) => {
        const filteredObjects = Object.keys(artistsList).filter((artist) => {      
            if (typeof artist === 'string' && artist.toLowerCase().includes(query.toLowerCase())) {
              return true;
            }
      
          return false;
        });

        let result = {}
        for (let i=0; i<filteredObjects.length; i++) {
            result[filteredObjects[i]] =  artistsList[filteredObjects[i]]
        }

        console.log(result);
        
      
        return result;
      }
      

    let getArtistList = async () => {
        let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/artists/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        let data = await response.json()

        if (await response.status === 200) {
            await setArtistsList(data)
            console.log(data);
        } else {
            console.log("could not fetch artists");
        }
    }

    return (
        <>
        <input type="text" placeholder="Find your favorite artist" className = {styles.search} id="artistSearch"></input>
        {/* <div className={styles.dropdownContainer}> */}
        <div className={styles.dropdown} id="searchResults">

            {searchResult &&
            Object.keys(searchResult).map((artist) => (
                <Link href={`/artistpage/${searchResult[artist]["artist_endpoint"]}`} key={artist}><p>{artist}</p></Link>
            ))}
        </div>
 
        </>
    )
}

export default SearchBar