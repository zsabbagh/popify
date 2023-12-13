import React, { useEffect } from "react";
import {
    Box,
    Tab,
    Tabs,
    Grid,
    Pagination,
} from '@mui/material';
import { Person, Audiotrack, AutoStories } from '@mui/icons-material';
import ItemCard from '../components/ItemCard';
import ItemDialog from "../components/ItemDialog";
import { ItemData } from "../interfaces";

const boxShadow = {
    ':hover': {
        boxShadow: '0 0 20px rgba(33,33,33,.2)',
        transition: 'box-shadow 0.3s ease-in-out',
    },
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
        onItemSelected: (item: any) => void,
        cardSelected: ItemData | undefined,
        onCardClicked: (item: ItemData) => void,
        onCardClosed: () => void,
        itemsPerPage?: number,
        itemsPerColumn?: number,
        spacing?: number,
    }) {

    if (!props.items) {
        return <></>;
    }

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

    function generateGridItems() {
        const items = getPageSlice();
        if (!items) {
            return <></>;
        }
        let opacity = 0.5;
        return items.map((item: any, index: number) => {
            index = index + (props.currentPage - 1) * itemsPerPage;
            async function onItemSelectedACB() {
                props.onItemSelected(item);
            }
            async function onCardClickACB(item: any) {
                console.log("onCardClickACB", item)
                props.onCardClicked(item);
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
                            onAddItemToCart={props.onAddItemToCart}
                            onRemoveItemFromCart={props.onRemoveItemFromCart}
                            index={index}
                            onItemSelected={onItemSelectedACB}
                            onCardClick={onCardClickACB}
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
                item={props.cardSelected}
                open={!!props.cardSelected}
                onClose={props.onCardClosed} />
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
        </div>
    )
}