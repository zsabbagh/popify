import { Box, Fade, Paper } from '@mui/material';
interface Props {
  show: boolean;
  transition: boolean;
  fadeInTime: number;
}

const OnLoadView = (props: Props) => {
  const icon = (
    <div
      style={{
        display: props.show ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        backgroundColor: '#333',
      }}
    >
      <img className='pulse' style={{width: "200px", height: "200px"}} src='logo.svg'></img>
    </div>
  );

  return (
    <Fade timeout={props.fadeInTime} appear={false} in={!props.transition}>
      {icon}
    </Fade>
  );
};

export default OnLoadView;
