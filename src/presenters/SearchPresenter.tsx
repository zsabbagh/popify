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
import SearchView from "../views/SearchView";

export default observer(function Search(props: { model: Model }) {
    // this assumes that a UserModel is given...
    const navigate = useNavigate();
    const location = useLocation();

    const [artists, setArtists] = useState<SpotifyArtist[]>([]);
    const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
    const [albums, setAlbums] = useState<SpotifyAlbum[]>([]);
    const [page, setPage] = useState(1);
    const [items, setItems] = useState<ItemData[]>([]);
    const [currentItemType, setCurrentItemType] = useState("artists");
    const [searchQuery, setSearchQuery] = useState("");

    function updateItems(newType: string) {
        let temp: Array<any> = [];
        if (newType === "artists") {
            temp = artists;
        } else if (newType === "tracks") {
            temp = tracks;
        } else if (newType === "albums") {
            temp = albums;
        }
        if (temp) {
            temp = temp.map((item: any, index: number) => getItemInformation(item, index));
            console.log("setting items to", temp );
            setItems(temp);
        }
    }

    const [searchParams, setSearchParams] = useSearchParams();
    
    const onItemTypeChange = (newType: string) => {
        setCurrentItemType(newType);
        updateItems(newType);
    }

    useEffect(() => {
        if (!props.model.userState.userAuthToken) {
        // navigate to login
        // TODO: add notification that you need to login
            navigate('/');
        }

    }, []);

    useEffect(() => {
        const handleSearchResults = (result: {tracks: {items: SpotifyTrack[]}, artists: {items: SpotifyArtist[]}, albums: {items: SpotifyAlbum[]}}) => {
            console.log("handleSearchResults", result);
            setArtists(result.artists.items);
            setTracks(result.tracks.items);
            setAlbums(result.albums.items);

            let temp: Array<any> = [];
            if (currentItemType === "artists") {
                temp = result.artists.items;
            } else if (currentItemType === "tracks") {
                temp = result.tracks.items;
            } else if (currentItemType === "albums") {
                temp = result.albums.items;
            }
            if (temp) {
                temp = temp.map((item: any, index: number) => getItemInformation(item, index));
                console.log("setting items to", temp );
                setItems(temp);
            }
        }

        const query = searchParams.get("q");
        console.log("query", query);
        if (query) {
            setSearchQuery(query);
            search(props.model.userState.userAuthToken || "", query)
            .then(handleSearchResults);
        }
        console.log("Location changed", location);
    }, [location]);

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
        
    return (
        <>
        <SearchView
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearch={() => {
                console.log("searching for", searchQuery);
                navigate("/search?q=" + searchQuery);
            }}
        />
        {items && items.length > 0 ?
        <CardsView
            items={items}
            currentItemType={currentItemType}
            onAddItemToCart={onAddItemToCartACB}
            onRemoveItemFromCart={onRemoveItemFromCartACB}
            itemTypes={["artists", "tracks", "albums"]}
            itemsInCart={itemsInCart}
            currentPage={page}
            onPageChange={setPage}
            onItemTypeChange={onItemTypeChange}
        /> : <></>}
        </>
    );
}
);