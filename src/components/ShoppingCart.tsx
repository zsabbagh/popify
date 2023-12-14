import React, { useState } from 'react';
import { Button, Drawer, List, ListItem, ListItemText, IconButton, Badge, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { RemoveCircleOutline } from '@mui/icons-material';
import { ItemData } from '../interfaces';
import { blue, blueGrey } from '@mui/material/colors';

export default function ShoppingCart(props: {
  items: Array<ItemData>,
  onRemoveItem: (index: number) => void,
  onCheckout: () => void,
}) {

  const [itemsSize, setItemsSize] = useState(props.items?.length || 0); // [items, setItems
  const [open, setOpen] = useState(false);

  function generateListItem(item: ItemData, index: number) {
    function onRemoveItem(event: any) {
      event.stopPropagation();
      props.onRemoveItem(index);
    }
    return (
      <ListItem key={index}
        sx={{
          borderBottom: '1px solid #ccc',
          backgroundColor: blueGrey[50],
          borderRadius: '25px',
          marginTop: '5px',
          ':hover': {
            backgroundColor: blueGrey[100],
            transition: 'background-color 0.3s ease-in-out',
            dropShadow: '0 0 20px rgba(33,33,33,.2)',
          },
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
        }}>
          <Typography variant="body1" sx={{
            fontWeight: 700,
            color: blueGrey[900],
          }}>
            {item.name}
          </Typography>
          <Typography variant="body2" sx={{
            color: blueGrey[200],
            fontStyle: 'italic',
          }}>
          {item.type}
          </Typography>
        </div>
        <IconButton onClick={onRemoveItem} color="inherit"
          sx={{
            marginLeft: 'auto',
          }}
        >
          <RemoveCircleOutline />
        </IconButton>
      </ListItem>
    )
  }

  return (
    <div>
      <IconButton disabled={!props.items} onClick={() => setOpen(true)} color="inherit">
        <Badge badgeContent={props.items.length} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Drawer anchor="top" open={open} onClose={() => setOpen(false)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '400px',
        }}>
          <List sx={{
            marginTop: '50px',
          }}>
            {
              props.items.length === 0 ?
                <ListItem>
                  <ListItemText sx={{ textAlign: 'center' }}
                  primary="Your shopping cart is empty." />
                </ListItem>
                : props.items.map(generateListItem)
            }
          </List>
        </div>
        <Button onClick={props.onCheckout} variant="contained" color="primary">
          Checkout
        </Button>
      </Drawer>
    </div>
  );
};