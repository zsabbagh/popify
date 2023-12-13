import React, { useEffect } from "react";
import {
    Box,
    Grid,
    Pagination,
} from '@mui/material';
import ItemCard from './ItemCard';
import ItemDialog from "./ItemDialog";

export default
    function CardsPages(props: {
        currentPage?: number,
        itemsPerPage?: number,
        itemsPerColumn?: number,
        spacing?: number,
        onPageChange: (page: number) => void,
        items: Array<any> | undefined,
        onItemSelected: (item: any) => void,
    }) {

    if (!props.items) {
        return <></>;
    }

    const items: Array<any> | undefined = props?.items;

    const [itemSelected, setItemSelected] = React.useState(undefined);
    const [dialogOpen, setDialogOpen] = React.useState(false);


    async function onDialogCloseACB() {
        setItemSelected(undefined);
        setDialogOpen(false);
    }

    const spacing = props.spacing && props.spacing > 0 ? props.spacing : 4;
    const itemsPerColumn = props.itemsPerColumn && props.itemsPerColumn > 0 ? props.itemsPerColumn : 3;
    const columns = spacing * itemsPerColumn;
    const itemsPerPage = props.itemsPerPage && props.itemsPerPage > 0 ? props.itemsPerPage : 9;
    const maxPages = Math.ceil((items?.length || 0) / itemsPerPage);
    // presents 9 items per page
    const currentPage = props.currentPage &&
        props.currentPage > 0 &&
        props.currentPage <= maxPages
        ? props.currentPage
        : 1;

    function getPageSlice() {
        if (!items) {
            return [];
        }
        const start = (currentPage - 1) * itemsPerPage;
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
            index = index + (currentPage - 1) * itemsPerPage;
            async function onItemSelectedACB() {
                props.onItemSelected(item);
            }
            async function onCardClickACB(item: any) {
                console.log("onCardClickACB", item)
                setItemSelected(item);
                setDialogOpen(true);
            }
            // delay for animation
            return (
                <Grid key={item.id} item xs={spacing} xl={2}
                    sx={{
                        alignContent: 'center',
                    }}>
                    <Box
                        sx={{
                            justifyContent: 'center',
                        }}
                    >
                        <ItemCard
                            item={item}
                            index={index}
                            onItemSelected={onItemSelectedACB}
                            onCardClick={onCardClickACB}
                            />
                    </Box>
                </Grid>
            );
        });
    }

    useEffect(() => {
        console.log("CardsPages useEffect")
        console.log("itemSelected", itemSelected)
        console.log("dialogOpen", dialogOpen)
    }, [itemSelected, dialogOpen]);

    return (
        <div>
            <ItemDialog
                item={itemSelected}
                open={dialogOpen}
                onClose={onDialogCloseACB} />
            <Pagination count={maxPages}
                defaultPage={currentPage}
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
                sx={{
                    position: 'relative',
                    marginTop: '25px',
                    martinBottom: '25px',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                {generateGridItems()}
            </Grid>
            <Pagination count={maxPages}
                defaultPage={currentPage}
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