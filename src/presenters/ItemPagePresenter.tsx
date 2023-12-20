import { Suspense, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Comment, Model, SpotifyArtist } from '../interfaces';
import { useParams } from 'react-router-dom';
import { CircularProgress, Skeleton } from '@mui/material';
import CommentView from '../views/CommentView';
import ItemPageView from '../views/ItemPageView';
import Loader from '../views/LoaderView';

interface Props {
    model: Model;
    type: string;
}

export default observer(function ItemPresenter(props: Props) {
    const { id } = useParams();
    const type = props.type;
    const item = props.model.items.find((x) => x.id === id);

    const [averageRating, setAverageRating] = useState<{ count: number; average: number } | null>(null);
    const [userRating, setUserRating] = useState<number | null>(null);
    const [comments, setComments] = useState<Comment[] | null>(null);
    const spotifyUri = `spotify:${type}:${id}`

    async function updateRating() {
        /* updates the average rating and the user rating */
        try {
            const averageRating = await props.model.getAverageRating(spotifyUri);
            setAverageRating(averageRating);
            const ratingValue = await props.model.getRating(spotifyUri);
            setUserRating(ratingValue);
        } catch (error) {
            console.error('Error fetching average rating:', error);
        }
    }

    async function onRatingChangeACB(value: number | null) {
        if (value !== null) {
            setUserRating(value);
            props.model.submitRating(spotifyUri, value);
        }
    }

    console.log("got type: " + type + " and id: " + id);

    async function updateComments() {
        try {
            const response = await props.model.getComments(spotifyUri);
            setComments(response);
        } catch (error) {
            console.error('Error fetching rating:', error);
        }
    }

    useEffect(() => {

        if (item) {
            //Load additional data
        } else {
            props.model.addItem(id!, type!);
        }
        updateRating();
        updateComments();
    }, []);

    useEffect(() => undefined, [comments]);

    async function onAddCommentACB(title: string, content: string) {
        const response = await props.model.postComment(spotifyUri, content, title);
        if (response) {
            setComments((oldComments) => [response, ...(oldComments || [])])
        }
    }

    useEffect(() => {
        updateRating();
    }, [userRating]);

    return (
        <>
            <ItemPageView
                item={item!}
                model={props.model}
                averageRating={averageRating!}
                onRatingChange={onRatingChangeACB}
                userRating={userRating}
                comments={comments}
                onAddComment={onAddCommentACB}
            />
        </>
    );
});
