import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Model } from '../interfaces';
import { useParams } from 'react-router-dom';

interface Props{
  model: Model
}

export default observer(function ArtistPresenter(props: Props) {
  let { id } = useParams();

  const artist = props.model.artists.find((artist) => artist.id === id);

  useEffect(() => {
    if(artist){
      //Load additional data
    } else {
      props.model.addArtist(id!);
      
    }
  },[])
console.log("artist", artist);


  
  return <>{artist?.name}</>;
});
