import React, {useContext, useEffect, useState} from 'react'
import styles from '../styles/componentStyles/searchBar.module.css'
import Link from 'next/link'
import AuthContext from '../src/context/auth'
import Image from 'next/image'
import logo from '../music-mint-marketplace.png'

const SearchBar = (props, { nft, marketplace }) => {
    let [artistsList, setArtistsList] = useState<any>(null)


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

    let filterOnKeyPress = async (event: Event) => {
        const searchQuery = (event.target as HTMLInputElement).value;
        let filteredObjects = filterObjectsBySearchQuery(searchQuery);

        console.log(filteredObjects);
        // Anneliese Take it from here, just use the filtereObjects to display the search results
    }


    let filterObjectsBySearchQuery = (query: string) => {
        const filteredObjects = Object.keys(artistsList).filter((artist) => {      
            if (typeof artist === 'string' && artist.toLowerCase().includes(query.toLowerCase())) {
              return true;
            }
      
          return false;
        });
      
        return filteredObjects;
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
        <input type="text" placeholder="Find your favorite artist" className = {styles.search} id="artistSearch"></input>
    )
}

export default SearchBar