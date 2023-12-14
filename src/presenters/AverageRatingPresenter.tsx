import { Rating } from '@mui/material';
import { Model } from '../interfaces';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';

interface Props {
  model: Model;
  uri: string;
}

const AverageRatingPresenter: React.FC<Props> = (props: Props) => {
  const [averageRating, setAverageRating] = useState<{ count: number; average: number } | null>(null);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const averageRating = await props.model.getAverageRating(props.uri);
        setAverageRating(averageRating);
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };

    fetchAverageRating();
  }, []);



  if (averageRating === null) {
    return <Loader />;
  }

  return (
    <>
      <div>
        <Rating value={averageRating.average} readOnly />
        <span>{`${averageRating.count} reviews!`}</span>
      </div>
    </>
  );
};

export default AverageRatingPresenter;
