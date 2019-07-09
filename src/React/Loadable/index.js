import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../Widgets/Loading'

export default  (loader)=>{
  const LoadableComponent =  Loadable({
    loader: loader,

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
