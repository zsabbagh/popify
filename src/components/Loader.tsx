import { CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress size={200}/>
    </div>
  );
};

export default Loader;
