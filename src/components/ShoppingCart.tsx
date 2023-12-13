import React, { useState } from 'react';
import { Button, Drawer, List, ListItem, ListItemText, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ItemData } from '../interfaces';

export default function ShoppingCart(props: {
    items: Array<ItemData>,
    open: boolean,
    onClicked: () => void,
    onClosed: () => void,
    onRemoveItem: (index: number) => void,
    onCheckout: () => void,
}) {

    function generateListItem(item: ItemData, index: number) {
        function onRemoveItem(event: any) {
            event.stopPropagation();
            props.onRemoveItem(index);
        }
        return (
            <ListItem key={index}>
                <ListItemText primary={item.name} secondary={`$${item.type}`} />
                <IconButton onClick={onRemoveItem} color="inherit">
                    Remove
                </IconButton>
            </ListItem>
        )
    }

  return (
    <div>
      <IconButton onClick={props.onClicked} color="inherit">
        <Badge badgeContent={props.items.length} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Drawer anchor="right" open={props.open} onClose={props.onClosed}>
        <List>
          {props.items.map(generateListItem)}
        </List>
        <Button onClick={props.onCheckout} variant="contained" color="primary">
          Checkout
        </Button>
      </Drawer>
    </div>
  );
};