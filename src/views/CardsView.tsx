import React, { useEffect } from "react";
import {
    Box,
    Tab,
    Tabs,
    Grid,
    Pagination,
    Alert,
    Fade,
    TextField,
    InputAdornment,
    Skeleton,
    CircularProgress,
    Typography,
} from '@mui/material';
import { RemoveCircleOutline, Person, Audiotrack, AutoStories, CheckCircleOutline, Search } from '@mui/icons-material';
import ItemCard from './ItemCardView';
import ItemDialog from "./ItemDialogView";
import { ItemData } from "../interfaces";
import { set } from "mobx";
import { red } from "@mui/material/colors";
import LoaderView from "./LoaderView";

const boxShadow = {
    ':hover': {
        boxShadow: '0 0 20px rgba(33,33,33,.2)',
        transition: 'box-shadow 0.3s ease-in-out',
    },
}

const alertStyling = {
    position: 'fixed',
    fontSize: 'auto',
    bottom: '10%',
    left: '50%',
    marginLeft: '-200px',
    borderRadius: '40px',
    right: '50%',
    marginRight: '-200px',
    width: '400px',
}

export default function CardsView(props: {
    items: Array<any> | undefined,
    tab: string,
    tabs: Array<string>,
    onTabChange: (type: string) => void,
    itemsInCart: Array<string>,
    onAddItemToCart: (item: ItemData) => void,
    onRemoveItemFromCart: (id: string) => void,
    itemsPerPage?: number,
    itemsPerColumn?: number,
    spacing?: number,
    alertTimeout?: number,
    maxCartSize?: number,
    onSearchChange?: (query: string) => void | undefined,
    onSearch?: () => void | undefined,
    awaitingSearch?: boolean,
}) {

    if (!props.items) {
        return <></>;
    }

    const [cardSelected, setCardSelected] = React.useState<ItemData | undefined>(undefined);
    const [cardDialogOpen, setCardDialogOpen] = React.useState<boolean>(false);
    const maxCartSize = props.maxCartSize && props.maxCartSize > 0 ? props.maxCartSize : 5;
    const cartIsFull = props.itemsInCart?.length >= maxCartSize;

    const alertTimeout = props.alertTimeout && props.alertTimeout > 0 ? props.alertTimeout : 2000;

    const items: Array<any> | undefined = props?.items;
    const spacing = props.spacing && props.spacing > 0 ? props.spacing : 4;
    const itemsPerColumn = props.itemsPerColumn && props.itemsPerColumn > 0 ? props.itemsPerColumn : 3;
    const columns = spacing * itemsPerColumn;
    const itemsPerPage = props.itemsPerPage && props.itemsPerPage > 0 ? props.itemsPerPage : 9;
    const maxPages = Math.ceil((items?.length || 0) / itemsPerPage);

    const [page, setCurrentPage] = React.useState<number>(1);

    console.log("page", page);

    // compute slice of the given items to display
    let sliceStart = (page - 1) * itemsPerPage;
    if (sliceStart >= items?.length) {
        // slice is larger than items, so set to last page
        sliceStart = (maxPages - 1) * itemsPerPage;
    }
    const sliceEnd = sliceStart + itemsPerPage;
    const itemSlice = items ? items.slice(sliceStart, sliceEnd) : undefined;

    async function onCardClosedACB(item: ItemData | undefined) {
        setCardDialogOpen(false);
        if (!item) {
            return;
        }
        setTimeout(() => {
            if (item.id === cardSelected?.id && !cardDialogOpen) {
                setCardSelected(undefined);
            }
        }, 500);
    }

    const [successfulAdd, setSuccessfulAdd] = React.useState<string | undefined>(undefined);
    const [addAlertOpen, setAddAlertOpen] = React.useState<boolean>(false);
    const [successfulRemove, setSuccessfulRemove] = React.useState<string | undefined>(undefined);
    const [removeAlertOpen, setRemoveAlertOpen] = React.useState<boolean>(false);

    function renderItemCB(item: any, index: number) {
        index = item.index || index;
        async function onCardClickedACB(item: any) {
            setCardDialogOpen(true);
            setCardSelected(item);
        }
        async function onAddItemToCartACB(item: ItemData) {
            setSuccessfulAdd(item.name);
            setRemoveAlertOpen(false);
            setAddAlertOpen(true);
            props.onAddItemToCart(item);
            setTimeout(() => setAddAlertOpen(false), alertTimeout);
        }
        async function onRemoveItemFromCartACB(id: string) {
            setSuccessfulRemove(item.name);
            setAddAlertOpen(false);
            setRemoveAlertOpen(true);
            props.onRemoveItemFromCart(id);
            setTimeout(() => setRemoveAlertOpen(false), alertTimeout);
        }
        // delay for animation
        return (
            <Grid key={item.id} item xs={spacing} xl={2}>
                <Box
                    sx={{
                        justifyContent: 'center',
                    }}
                >
                    {
                        !props.awaitingSearch ?
                        <ItemCard
                            item={item}
                            itemIsInCart={props.itemsInCart.includes(item.id)}
                            onAddItemToCart={onAddItemToCartACB}
                            onRemoveItemFromCart={onRemoveItemFromCartACB}
                            index={index}
                            cartIsFull={cartIsFull}
                            height="345px"
                            width="345px"
                            onCardClick={onCardClickedACB}
                        /> :
                        <Skeleton variant="rectangular" animation="wave"
                            width={345}
                            height={345}
                            sx={{
                                borderRadius: '20px',
                            }} />
                    }
                </Box>
            </Grid>
        );
    }

    async function onTabChangeACB(newType: string) {
        props.onTabChange(newType);
        setCurrentPage(1);
    }

    async function onKeyPressACB(event: any) {
        if (event.key === 'Enter') {
            props.onSearch ? props.onSearch() : undefined;
        }
    }

    console.log("got itemSlice", itemSlice)

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '50px',
            marginBottom: '20px',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '0px',
                marginBottom: '20px',
            }}>
                <Tabs
                    value={props.tab}
                    onChange={(event: any, value: any) => onTabChangeACB(value)}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                >
                    {
                        props.tabs.map((type: string) => {
                            return <Tab key={type} value={type} label={type} sx={boxShadow} />
                        })
                    }
                </Tabs>
            </div>
            <ItemDialog
                item={cardSelected}
                open={cardDialogOpen}
                onClose={onCardClosedACB} />
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '0px',
                marginBottom: '20px',
            }}>
                {
                    props?.onSearchChange ?
                    <>
                        <TextField id="search" label="Search" variant="standard" 
                            onChange={(event) => props?.onSearchChange ? props.onSearchChange(event.target.value) : undefined}
                            onKeyDown={onKeyPressACB}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                                ),
                            }}
                            sx={{
                                width: '25%',
                                minWidth: '200px',
                                margin: 'auto',
                                marginBottom: '20px',
                            }} >
                            </TextField> 
                            { props.awaitingSearch ?
                                <CircularProgress sx={{
                                    position: 'absolute',
                                    left: '50%',
                                    right: '50%',
                            }} /> : <></> }
                    </>
                    : <></>
                }
            </div>
            {
                (itemSlice && itemSlice?.length > 0) || props.awaitingSearch ?
                <>
                    <Pagination count={maxPages}
                        page={page}
                        siblingCount={2}
                        onChange={(event, value) => setCurrentPage(value)}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: '20px',
                        }}
                    />
                    {
                        itemSlice ?
                        <Grid container spacing={spacing} columns={columns}
                            justifyContent='center'
                            alignItems='center'
                            sx={{
                                margin: 'auto',
                                marginLeft: '25px'
                            }}>
                            {itemSlice.map(renderItemCB)}
                        </Grid>
                        : <LoaderView />
                    }
                    <Pagination count={maxPages}
                        page={page}
                        siblingCount={2}
                        onChange={(event, value) => setCurrentPage(value)}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '50px',
                            marginBottom: '20px',
                        }}
                    />
                    {
                        <Fade in={addAlertOpen} unmountOnExit={true}>
                            <Alert severity="success" sx={alertStyling}
                                icon={<CheckCircleOutline />}>
                                {successfulAdd} added to cart!
                            </Alert>
                        </Fade>
                    }
                    {
                        <Fade in={removeAlertOpen} unmountOnExit={true}>
                            <Alert severity="warning" sx={alertStyling}
                                icon={<RemoveCircleOutline />}>
                                {successfulRemove} removed from cart!
                            </Alert>
                        </Fade>
                    }
                </> :
                <div>
                    <Typography variant="h3" sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '50px',
                        marginBottom: '20px',
                    }}>
                        No items to display
                    </Typography>
                </div>
            }
        </div>
    )
}