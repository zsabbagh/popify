import {
    List,
    ListItemAvatar,
    Avatar,
    IconButton,
    Tooltip,
    ListItem,
    ListItemText,
    Box,
    Typography,
} from "@mui/material";
import { ItemData, SpotifyTrack } from "../interfaces";
import { blue, teal } from "@mui/material/colors";
import { RemoveCircleOutline } from "@mui/icons-material";

interface Props {
    items: ItemData[] | SpotifyTrack[] | null | undefined;
    title?: string;
    onRemoveItem?: (index: number) => void;
    nameOfList?: string;
    emptyText?: string;
}

export default function ItemListView(props: Props) {
    function itemACB(item: ItemData | SpotifyTrack, index: number) {
        const id = item.id;
        const name = item.name;
        let image = '';
        const hasImage = (item as ItemData)?.image;
        const isSpotifyTrack = (item as SpotifyTrack)?.album?.images;
        if (!isSpotifyTrack) {
            image = (item as ItemData)?.image;
        } else if (isSpotifyTrack && (item as SpotifyTrack)?.album?.images?.length > 0) {
            image = (item as SpotifyTrack)?.album?.images[0].url;
        }

        let altText = item.type;

        if (isSpotifyTrack) {
            altText = (item as SpotifyTrack)?.artists.map((artist) => artist.name).join(', ');
        }

        return (
            <ListItem sx={{
                height: 60,
                width: '100%',
                background: '#f5f5f5',
                marginLeft: '10px',
                marginRight: '10px',
                borderRadius: '50px',
                marginTop: '10px'
            }} key={id}>
                <ListItemAvatar>
                    <Avatar variant="square" alt={`Avatar ${id}`} src={image} />
                </ListItemAvatar>
                <ListItemText primary={name} secondary={altText} />
                {
                    props.onRemoveItem ?
                        <Tooltip title={`Remove${props.nameOfList ? ' from ' + props.nameOfList : ''}`} placement="bottom">
                            <IconButton
                                onClick={() => props.onRemoveItem ? props.onRemoveItem(index) : undefined}
                                sx={{
                                    color: teal[200],
                                    marginLeft: 'auto',
                                }}>
                                <RemoveCircleOutline />
                            </IconButton>
                        </Tooltip> :
                        <></>
                }
            </ListItem>
        );
    }

    const emptyText = props.emptyText ? props.emptyText : 'No items to display.';

    return (
        props.items === null || props.items === undefined ?
        <Typography sx={{ mt: 2, mb: 0, color: blue[500] }} variant="body1" component="div" textAlign="center">
            {emptyText}
        </Typography> :
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            marginTop: '20px',
        }}>
            {
                props.title ?
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '80%',
                        marginTop: '20px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}>
                        <div style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2px 5px',
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            width: '100%',
                            borderBottom: `1px solid ${blue[200]}`,
                        }}>
                            <Typography variant="h6" component="div" textAlign="center">
                                {props.title}
                            </Typography>
                        </div>
                    </Box>
                    : <></>
            }
            <Box sx={{
                paddingLeft: '10px',
                paddingRight: '25px',
            }}>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {props.items.map(itemACB)}
                </List>
            </Box>
        </Box>
    )
}