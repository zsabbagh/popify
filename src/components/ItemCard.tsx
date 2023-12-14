import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Tooltip, Typography } from '@mui/material';
import { blue, blueGrey, green, red } from '@mui/material/colors';
import { Album, Groups, Add, Close } from '@mui/icons-material';
import { Link } from "react-router-dom";
import ItemDialog from './ItemDialog';
import { ItemData } from '../interfaces';
import ItemDetails from './ItemDetails';

const pastelColors = [
  'rgba(255, 99, 71, 0.2)', // red
  'rgba(255, 165, 0, 0.2)', // orange
  'rgba(255, 215, 0, 0.2)', // yellow
  'rgba(255, 255, 0, 0.2)', // now greenish
  'rgba(173, 255, 47, 0.2)',
  'rgba(154, 205, 50, 0.2)',
  'rgba(0, 255, 127, 0.2)',
];

export default function ItemCard(props: {
    item: ItemData;
    index: number;
    itemIsInCart: boolean;
    onItemSelected: Function;
    onAddItemToCart: (item: ItemData) => void;
    onRemoveItemFromCart: (id: string) => void;
    transition?: boolean;
    cartIsFull?: boolean;
    onCardClick?: (item: any) => void }) {
  const item = props.item;
  const index = props.index;
  const {type, image, name, album, popularity} = item;
  const artists = item.artists ? item.artists.join(', ') : '';

  function onItemCartButtonClickACB(event: any) {
    event.stopPropagation();
    if (props.itemIsInCart) {
      props.onRemoveItemFromCart(item.id);
    } else {
      props.onAddItemToCart(item);
    }
  }

  const disableAddToCart = !props.itemIsInCart && props.cartIsFull;
  const tooltipAddToCart = disableAddToCart ? 'Cart is full' : (
    props.itemIsInCart ? 'Remove from Cart' : 'Add to Cart'
  );

  return (
    <Card
      sx={{
        float: 'left',
        position: 'relative',
        maxWidth: 345,
        background: image ? 'transparent' : 'linear-gradient(45deg, #EBF3F8 10%, #DEF2F3 90%)',
        borderRadius: '20px',
        height: '95%',
        width: '95%',
        ':hover': {
          boxShadow: '0 0 40px rgba(33,33,33,.4)',
          transition: 'all .5s ease-in-out',
        },
      }}
      onClick={() => { props.onCardClick ? props.onCardClick(item) : null }}
    >
      {image ? (
        <CardMedia
          component="img"
          height="140"
          width="140"
          image={image}
          sx={{
            maskImage: 'linear-gradient(to top, transparent 0%, black 30%)',
            objectFit: 'cover',
            zIndex: 1,
          }}
        />
      ) : (
        <CardMedia></CardMedia>
      )}
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            width: '80%',
          }}
        >
          <ItemDetails item={item} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center',
            width: '50%',
          }}
        >
          nr
          <Avatar
            sx={{
              bgcolor: blueGrey[200],
              marginLeft: '10px',
            }}
          >
            {index + 1}
          </Avatar>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {type === 'artist' ? (
          <>
        
            <Link to={`/artist/${item.id}`} >
                <Button size="small">Go To Page</Button>
            </Link>
          </>
        ) : (
          <Button size="small">Go To Page</Button>
        )}
        <Tooltip title={tooltipAddToCart}>
          <span>
            <Button onClick={onItemCartButtonClickACB} disabled={disableAddToCart}>
              {
                props.itemIsInCart ? (
                  <Close sx={{ color: red[400] }} />
                ) : (
                  <Add sx={{ color: disableAddToCart ? blueGrey[100] : green[400] }} />
                )
              }
            </Button>
          </span>
        </Tooltip>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'right',
            marginLeft: 'auto',
            alignItems: 'center',
            width: '50%',
          }}
        >
          Popularity:
          <Avatar sx={{ bgcolor: 'transparent', color: 'black' }}>{popularity}</Avatar>
        </Box>
      </CardActions>
    </Card>
  );
}
