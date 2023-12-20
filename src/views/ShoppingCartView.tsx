import React, { useState } from 'react';
import { CircularProgress, Button, Drawer, List, ListItem, ListItemText, IconButton, Badge, Typography, Box, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { RemoveCircleOutline } from '@mui/icons-material';
import { ItemData } from '../interfaces';
import { blue, blueGrey, green, orange, red, teal, yellow } from '@mui/material/colors';

export default function ShoppingCartView(props: {
  items: Array<ItemData>,
  maxSize?: number,
  onRemoveItem: (index: number) => void,
  onCheckout: () => void,
}) {

  const maxSize = props.maxSize || 5;
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
            color: blueGrey[300],
            fontStyle: 'italic',
          }}>
          {item.type}
          </Typography>
        </div>
        <Tooltip title="Remove from Cart" placement="bottom">
          <IconButton onClick={onRemoveItem}
            sx={{
              color: teal[200],
              marginLeft: 'auto',
            }}
          >
            <RemoveCircleOutline />
          </IconButton>
        </Tooltip>
      </ListItem>
    )
  }

  const progress = props.items ? props.items.length / maxSize * 100 : 0;
  const cartIsFull = props.items?.length >= maxSize;
  const colorOfProgress = cartIsFull ? green[400] : blue[400];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Tooltip title="Shopping Cart" placement="bottom">
        <Box position="relative" display="inline-flex">
          <CircularProgress variant="determinate" value={progress} sx={{ height: 'auto', color: colorOfProgress }} />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center">
            <IconButton disabled={!props.items} onClick={() => setOpen(true)} color="inherit">
              <Badge badgeContent={props.items.length} color={ cartIsFull ? 'success' : 'info' }>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Box>
      </Tooltip>
      <Drawer anchor="top" open={open} onClose={() => setOpen(false)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          bgcolor: 'rgba(0, 0, 0, 0.5)',
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
        <Button onClick={props.onCheckout} variant="contained" color="primary" sx={{
          marginTop: '10px',
        }}>
          Checkout
        </Button>
      </Drawer>
    </div>
  );
};