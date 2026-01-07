import { Oval } from 'react-loader-spinner';

export function Spinner(){
  return (
    <div style={{
      width: '100%',
      height: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      <Oval
        height="120"
        width="120"
        color="#4fa94d"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible
      />
    </div>
  );
}
