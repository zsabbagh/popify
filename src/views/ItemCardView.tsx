import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, Tooltip, Typography } from '@mui/material';
import { blue, blueGrey, green, red } from '@mui/material/colors';
import { Album, Groups, Add, Close } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { ItemData } from '../interfaces';
import ItemDetails from './ItemDetailsView';
import { isValidType } from '../utils/spotifyFetcher';

export default function ItemCard(props: {
    item: ItemData;
    index: number;
    itemIsInCart: boolean;
    onAddItemToCart: (item: ItemData) => void;
    onRemoveItemFromCart: (id: string) => void;
    transition?: boolean;
    cartIsFull?: boolean;
    height?: string;
    width?: string;
    onCardClick?: (item: any) => void }) {
  const item = props.item;
  const index = props.index;
  const {type, image, name, album, popularity} = item;
  const height = props.height || '345px';
  const width = props.width || '345px';

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
        background: image ? 'transparent' : 'linear-gradient(45deg, #F4F4F5 10%, #F3F9FC 90%)',
        borderRadius: '20px',
        height: 'auto',
        width: '100%',
        maxWidth: width,
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
          <Avatar
            sx={{
              bgcolor: blueGrey[100],
              marginLeft: '10px',
            }}
          >
            <Typography variant='body2'>
              {index + 1}
            </Typography>
          </Avatar>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {
          isValidType(type) ?
          <Link to={`/${type}/${item.id}`} >
              <Button size="small">Go To Page</Button>
          </Link>
          : <></>
        }
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
