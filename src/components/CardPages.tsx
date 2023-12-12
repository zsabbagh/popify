import React from "react";
import {
    Box,
    Grid,
    Pagination,
} from '@mui/material';
import ItemCard from './ItemCard';

export default
    function CardsPages(props: {
        currentPage?: number,
        itemsPerPage?: number,
        onPageChange: (page: number) => void,
        items: Array<any> | undefined,
        onItemSelected: (item: any) => void,
    }) {

    if (!props.items) {
        return <></>;
    }

    const items: Array<any> | undefined = props?.items;

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
            // delay for animation
            return (
                <Grid key={item.id} item xs={4} xl={2}
                    sx={{
                        alignContent: 'center',
                    }}>
                    <Box
                        sx={{
                            justifyContent: 'center',
                        }}
                    >
                        <ItemCard item={item} index={index} onItemSelected={onItemSelectedACB} />
                    </Box>
                </Grid>
            );
        });
    }
    return (
        <div>
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
            <Grid container spacing={4}
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