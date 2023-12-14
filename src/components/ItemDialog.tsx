import * as React from 'react';
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grow,
    Paper,
    Typography,
} from '@mui/material';
import { ItemData } from '../interfaces';
import ItemDetails from './ItemDetails';

export default function ItemDialog(props: {
    item: ItemData | undefined,
    open: boolean,
    onClose: (item: ItemData | undefined) => void
}) {

    const { id, type, image, name, album, popularity } = props.item || {};

    const open = props.item ? props.open : false;

    return (
        <React.Fragment>
            <Dialog open={open} onClose={() => props.onClose(props.item)} maxWidth="sm" fullWidth sx={{
                backdropFilter: 'blur(5px)',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}>
                <div style={{ width: '100%', height: '10%', margin: '0 auto', overflow: 'hidden' }}>
                    <div style={{ display: 'inline-block', position: 'relative', right: '-50%' }}>
                        <img src={image} style={{
                            position: 'relative',
                            left: '-50%',
                            top: '-12%',
                        }} />
                    </div>
                </div>
                <ItemDetails item={props.item} spacing={{ left: 20, top: 20 }} titleStyle={{fontSize: '1.4rem'}} />
                <DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.onClose(props.item)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}