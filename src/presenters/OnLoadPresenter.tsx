import { useEffect, useState } from 'react';
import OnLoadView from '../views/OnLoadView';

const OnLoadPresenter = () => {
  const fadeInTime = 1000;
  const [show, setShow] = useState<boolean>(true);
  const [transition, setTransition] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setTransition(true);
      setTimeout(() => {
        setShow(false);
      }, fadeInTime);
    }, fadeInTime);
  }, []);
  return <OnLoadView fadeInTime={fadeInTime} transition={transition} show={show} />;
};

export default OnLoadPresenter;
