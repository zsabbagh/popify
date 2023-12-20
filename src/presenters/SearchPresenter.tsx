import { observer } from "mobx-react-lite";
import { Model, SpotifyItem, SpotifyTrack, SpotifyAlbum, SpotifyArtist } from "../interfaces";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { query } from "firebase/firestore";
import { search } from "../utils/spotifyFetcher";
import { getItemInformation } from "../utils/tools";
import { set } from "mobx";
import { ItemData } from "../interfaces";
import CardsView from "../views/CardsView";

export default observer(function Search(props: { model: Model }) {
    // this assumes that a UserModel is given...
    const navigate = useNavigate();
    const location = useLocation();

    const [artists, setArtists] = useState<SpotifyArtist[]>([]);
    const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
    const [albums, setAlbums] = useState<SpotifyAlbum[]>([]);
    const [items, setItems] = useState<ItemData[]>([]);
    const [tab, setTab] = useState("artists");
    const [latestSearchResultTime, setLatestSearchResultTime] = useState(0);
    const [latestInputChange, setLatestInputChange] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    function updateItems() {
        let temp: Array<any> = [];
        if (tab === "artists") {
            temp = artists;
        } else if (tab === "tracks") {
            temp = tracks;
        } else if (tab === "albums") {
            temp = albums;
        }
        if (temp) {
            temp = temp.map((item: any, index: number) => getItemInformation(item, index));
            setItems(temp);
        }
    }
    
    const handleSearchResults = (result: {tracks: {items: SpotifyTrack[]}, artists: {items: SpotifyArtist[]}, albums: {items: SpotifyAlbum[]}}) => {
        setLatestSearchResultTime(Date.now());
        if (!result) {
            return;
        }
        setTracks(result?.tracks ? result.tracks.items : []);
        setArtists(result?.artists ? result.artists.items : []);
        setAlbums(result?.albums ? result.albums.items : []);
        updateItems();
    }
    const [searchParams, setSearchParams] = useSearchParams();
    
    async function onTabChangeACB(newType: string) {
        setTab(newType);
        updateItems();
    }

    useEffect(() => {
        if (!props.model.userState.userAuthToken) {
        // navigate to login
        // TODO: add notification that you need to login
            navigate('/');
        }

    }, []);

    useEffect(() => {
        const query = searchParams.get("q");
        if (query) {
            setSearchQuery(query);
        }
    }, [location]);

    useEffect(() => {
        if (searchQuery) {
            search(props.model.userState.userAuthToken || "", searchQuery)
                .then(handleSearchResults);
        }
    }, [searchQuery]);

    function onAddItemToCartACB(item: ItemData) {
        console.log("onAddItemToCartACB", item);
        props.model.addItemToCart(item);
    }

    function onRemoveItemFromCartACB(id: string) {
        console.log("onRemoveItemFromCartACB", id);
        props.model.removeItemFromCart(id);
    }

    const [itemsInCart, setItemsInCart] = useState<Array<string>>([]);
    useEffect(() => {
        if (!props.model.userState.shoppingCart) {
        return;
        }
        setItemsInCart(props.model.userState.shoppingCart.map((item: any) => item.id));
    }, [props?.model?.userState?.shoppingCart?.length])

    function onSearchACB(query: string) {
        if (!query || query === '') {
            setLatestInputChange(0);
            return;
        }
        console.log("onSearchACB", query);
        const thisSearchTimestamp = Date.now();
        setLatestInputChange(thisSearchTimestamp);
        setTimeout(() => {
            console.log("onSearchACB timeout", query);
            if (thisSearchTimestamp < latestInputChange) {
                return;
            }
            if (query != searchQuery) {
                setSearchQuery(query);
            }
        }, 500);
    }
        
    return (
        <CardsView
            items={items}
            tab={tab}
            tabs={['artists', 'tracks', 'albums']}
            onTabChange={onTabChangeACB}
            onAddItemToCart={onAddItemToCartACB}
            onRemoveItemFromCart={onRemoveItemFromCartACB}
            itemsInCart={itemsInCart}
            onSearch={onSearchACB}
            awaitingSearch={latestInputChange > latestSearchResultTime}
        />
    );
}
);