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
    const [page, setPage] = useState(1);
    const [items, setItems] = useState<ItemData[]>([]);
    const [currentItemType, setCurrentItemType] = useState("artists");
    const [latestSearchResultTime, setLatestSearchResultTime] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    function updateItems() {
        let temp: Array<any> = [];
        if (currentItemType === "artists") {
            temp = artists;
        } else if (currentItemType === "tracks") {
            temp = tracks;
        } else if (currentItemType === "albums") {
            temp = albums;
        }
        if (temp) {
            temp = temp.map((item: any, index: number) => getItemInformation(item, index));
            setItems(temp);
        }
    }
    
    const handleSearchResults = (result: {tracks: {items: SpotifyTrack[]}, artists: {items: SpotifyArtist[]}, albums: {items: SpotifyAlbum[]}}) => {
        setArtists(result.artists.items);
        setTracks(result.tracks.items);
        setAlbums(result.albums.items);
        updateItems();
        setLatestSearchResultTime(Date.now());
    }
    const [searchParams, setSearchParams] = useSearchParams();
    
    const onItemTypeChange = (newType: string) => {
        setCurrentItemType(newType);
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
        const query = searchParams.get("q");
        if (query) {
            search(props.model.userState.userAuthToken || "", query)
                .then(handleSearchResults);
        }
    }, [searchQuery, latestSearchResultTime]);

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
        />
    );
}
);