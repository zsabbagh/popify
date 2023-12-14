import { Rating } from '@mui/material';
import { Model } from '../interfaces';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';

interface Props {
  model: Model;
  uri: string;
}

const PersonalRatingPresenter: React.FC<Props> = (props: Props) => {
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const ratingValue = await props.model.getRating(props.uri);
        setRating(ratingValue);
      } catch (error) {
        console.error('Error fetching rating:', error);
      }
    };

    fetchRating();
  }, []);

  const onRatingChange = (value: number | null) => {
    if (value !== null) {
      setRating(value);
      props.model.submitRating(props.uri, value);
    }
  };

  if (rating === null) {
    return <Loader />;
  }

  return (
    <>
      <Rating
        value={rating}
        onChange={(event, value) => {
          onRatingChange(value);
        }}
      />
    </>
  );
};

export default PersonalRatingPresenter;
