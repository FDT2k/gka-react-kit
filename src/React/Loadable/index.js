import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../Widgets/Loading'

export default  (file,loader)=>{
  const LoadableComponent =  Loadable({
    loader: loader(file),
    modules: [file],
    webpack: () => [require.resolveWeak(file)],
    loading: (props)=>{
      if (props.error) {
        return <div>Error! {props.error.stack}<button onClick={ props.retry }>Retry</button></div>;
      } else if (props.pastDelay) {
        return (<Loading/>);
      } else {
        return null;
      }

    },
    delay: 500
  })


  return props=>(<LoadableComponent {...props}/>)
}
