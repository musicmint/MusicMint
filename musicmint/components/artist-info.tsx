// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function ArtistInfo() {
//   const [artist, setArtist] = useState<any>({name: null, images: [{url: null}], followers: {total: null}});
//   // for lint errors
//   let [access_token, setAccess_token] = useState<any>(null);
//   // for lint errors 

//   useEffect(() => {
//     // Replace YOUR_CLIENT_ID with your actual client ID
//     const client_id = 'c5c2ed390b3b4a1faf1895f8c269d5a5';

//     // Replace ARTIST_ID with the ID of the artist you want to retrieve information for
//     const artist_id = '0lzGqksyREdfUObGjLYLcT';

//     axios(`https://api.spotify.com/v1/artists/${artist_id}`, {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((res) => {
//         setArtist(res.data);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, []);

//   if (!artist) {
//     return <div>Loading artist info...</div>;
//   }

//   return (
//     <div>
//       <h2>{artist.name}</h2>
//       <img src={artist.images[0].url} alt={artist.name} />
//       <p>Followers: {artist.followers.total}</p>
//     </div>
//   );
// }
