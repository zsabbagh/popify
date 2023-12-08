function RecommendationsView(props: {recommendations: string[]; topArtists: string[]; topTracks: string[]; onArtistSelected: (id: string, name: string) => void; onTrackSelected: (id: string, name: string) => void}) {
    function recommendationACB(recommendation: any) {
        return <li>{recommendation.name}</li>;
    }
    function trackACB(track: any) {
        return (
            <div>
                <input type="checkbox" id={track.id} name={track.id} onChange={() => {props.onArtistSelected(track.id, track.name)}}/>
                <label htmlFor={track.id}>{track.name}</label>
            </div>
        );
    }

    function artistACB(artist: any) {
        return (
            <div>
                <input type="checkbox" id={artist.id} name={artist.id} onChange={() => {props.onArtistSelected(artist.id, artist.name)}}/>
                <label htmlFor={artist.id}>{artist.name}</label>
            </div>
        );
    }

    return (
        <>
            <fieldset>
                <legend>Choose artists:</legend>
                {props.topArtists?.map(trackACB)}
            </fieldset>

            <fieldset>
                <legend>Choose tracks:</legend>
                {props.topTracks?.map(trackACB)}
            </fieldset>

            <ul>
                {props.recommendations?.map(recommendationACB)}
            </ul>   
        </>    
    );
}

export default RecommendationsView;