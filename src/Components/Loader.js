import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
  return (
    <div 
        style={{ display: 'flex', justifyContent: 'center', alignContent:'center', alignItems: 'center', height: '100%', margin: 'auto'
    }}>
      <CircularProgress 
      size={100}
      thickness={7}/>
    </div>
  );
}