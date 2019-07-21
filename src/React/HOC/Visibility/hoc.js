import React, { Component, Suspense } from 'react';
import ReactDOM from 'react-dom'

export default function withVisibility(ComposedComponent){

   class VisibilityComponent extends Component {

    constructor(props){
      super (props)
      this.state = {hidden:false}
      this.event_name = null;
      this.vis_prop = null;
      this.listeners = [];
    }

    componentDidMount() {
      this.vis_prop = this.getHiddenProp();
      if (this.vis_prop ) {
        this.event_name = this.vis_prop.replace(/[H|h]idden/,'') + 'visibilitychange';
        document.addEventListener(this.event_name, this._handleFocus.bind(this));
      }
      this._handleFocus();
     }

     componentWillUnmount() {
         document.removeEventListener(this.event_name, this._handleFocus.bind(this));
     }

      isHidden() {
        var prop = this.getHiddenProp();
        if (!prop) return false;
        return document[prop];
      }

      getHiddenProp(){
        if(typeof(document) == 'undefined'){
          console.warn('visibility change is not supported')

          return null
        }
        var prefixes = ['webkit','moz','ms','o'];

        // if 'hidden' is natively supported just return it
        if ('hidden' in document) return 'hidden';

        // otherwise loop over all the known prefixes until we find one
        for (var i = 0; i < prefixes.length; i++){
            if ((prefixes[i] + 'Hidden') in document)
                return prefixes[i] + 'Hidden';
        }



        // otherwise it's not supported
        console.warn('visibility change is not supported')
        return null;
      }

     _handleFocus(e){
       this.setState({hidden:this.isHidden()})
       this.listeners.map(cb=>{
         cb(this.isHidden())
       })
     }


    render() {
      return (
        <ComposedComponent {...this.props} hidden={this.state.hidden} onVisibilityChange={(cb)=>{this.listeners.push(cb)}}/>
      );
    }
  }

  return VisibilityComponent;
}
