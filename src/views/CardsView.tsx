import React, { useEffect } from "react";
import {
    Box,
    Tab,
    Tabs,
    Grid,
    Pagination,
    Alert,
    Fade,
} from '@mui/material';
import { RemoveCircleOutline, Person, Audiotrack, AutoStories, CheckCircleOutline } from '@mui/icons-material';
import ItemCard from '../components/ItemCard';
import ItemDialog from "../components/ItemDialog";
import { ItemData } from "../interfaces";
import { set } from "mobx";
import { red } from "@mui/material/colors";

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
        currentItemType: string,
        itemTypes: Array<string>,
        itemsInCart: Array<string>,
        onItemTypeChange: (type: string) => void,
        onAddItemToCart: (item: ItemData) => void,
        onRemoveItemFromCart: (id: string) => void,
        currentPage: number,
        onPageChange: (page: number) => void,
        itemsPerPage?: number,
        itemsPerColumn?: number,
        spacing?: number,
        alertTimeout?: number,
        maxCartSize?: number,
    }) {

    if (!props.items) {
        return <></>;
    }

    const [cardSelected, setCardSelected] = React.useState<ItemData | undefined>(undefined);
    const [cardDialogOpen, setCardDialogOpen] = React.useState<boolean>(false);
    const maxCartSize = props.maxCartSize && props.maxCartSize > 0 ? props.maxCartSize : 5;
    const cartIsFull = props.itemsInCart?.length >= maxCartSize;

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

    const alertTimeout = props.alertTimeout && props.alertTimeout > 0 ? props.alertTimeout : 2000;

    const items: Array<any> | undefined = props?.items;
    const spacing = props.spacing && props.spacing > 0 ? props.spacing : 4;
    const itemsPerColumn = props.itemsPerColumn && props.itemsPerColumn > 0 ? props.itemsPerColumn : 3;
    const columns = spacing * itemsPerColumn;
    const itemsPerPage = props.itemsPerPage && props.itemsPerPage > 0 ? props.itemsPerPage : 9;
    const maxPages = Math.ceil((items?.length || 0) / itemsPerPage);

    function getPageSlice() {
        if (!items) {
            return [];
        }
        const start = (props.currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return items.slice(start, end);
    }

    const [successfulAdd, setSuccessfulAdd] = React.useState<string | undefined>(undefined);
    const [addAlertOpen, setAddAlertOpen] = React.useState<boolean>(false);
    const [successfulRemove, setSuccessfulRemove] = React.useState<string | undefined>(undefined);
    const [removeAlertOpen, setRemoveAlertOpen] = React.useState<boolean>(false);

    function generateGridItems() {
        const items = getPageSlice();
        if (!items) {
            return <></>;
        }
        let opacity = 0.5;
        return items.map((item: any, index: number) => {
            index = index + (props.currentPage - 1) * itemsPerPage;
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
                        <ItemCard
                            item={item}
                            itemIsInCart={props.itemsInCart.includes(item.id)}
                            onAddItemToCart={onAddItemToCartACB}
                            onRemoveItemFromCart={onRemoveItemFromCartACB}
                            index={index}
                            cartIsFull={cartIsFull}
                            onCardClick={onCardClickedACB}
                            />
                    </Box>
                </Grid>
            );
        });
    }

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
                    value={props.currentItemType}
                    onChange={(event: any, value: any) => props.onItemTypeChange(value)}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                >
                    {
                        props.itemTypes.map((type: string) => {
                            return <Tab key={type} value={type} label={type} sx={boxShadow} />
                        })
                    }
                </Tabs>
            </div>
            <ItemDialog
                item={cardSelected}
                open={cardDialogOpen}
                onClose={onCardClosedACB} />
            <Pagination count={maxPages}
                page={props.currentPage}
                siblingCount={2}
                onChange={(event, value) => props.onPageChange(value)}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            />
            <Grid container spacing={spacing} columns={columns}
                justifyContent='center'
                alignItems='center'
                sx={{
                    margin: 'auto',
                    marginLeft: '25px'
                }}>
                {generateGridItems()}
            </Grid>
            <Pagination count={maxPages}
                page={props.currentPage}
                siblingCount={2}
                onChange={(event, value) => props.onPageChange(value)}
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
                        icon={<CheckCircleOutline/>}>
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
        </div>
    )
}