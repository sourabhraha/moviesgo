



import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';


// currying function logger (obj, next, action)

// const logger = function ({dispatch, getState}){
//     return function(next) {
//       return function(action) {
//         // middleware code
//         console.log("ACTION_TYPE = ", action.type);
//         next(action);
//       }
//     }
// }

const logger = ({dispatch, getState}) => (next) => (action) => {
  // logger code
  if(typeof action !== 'function')
    console.log("ACTION_TYPE = ", action.type);
  next(action);
}

// const thunk = ({dispatch, getState}) => (next) => (action) => {

//   if(typeof action === 'function'){
//     action(dispatch);
//     return;
//   }
//   next(action);
// }
const store = createStore(rootReducer, applyMiddleware(logger, thunk));
 console.log('store', store);
//  console.log('BEFORE_STATE', store.getState());

// export const StoreContext = createContext();
// console.log('StoreContext', StoreContext);

// class Provider extends React.Component {
//   render () {

//     const {store} = this.props;
//     return  (
//             <StoreContext.Provider value = {store}>
//               {this.props.children}
//             </StoreContext.Provider>
//     );
//   }
// }

// const connectAppComponent = connection(callback)(App);

// export function connect (callback) {
//   return function (Component) {
//        class  ConnectedComponent extends React.Component {

//         constructor(props){
//           super(props);
//           this.unsubsrcibe = this.props.store.subscribe(() => this.forceUpdate() );
//         }

//         componentWillUnmount() {
//           this.unsubsrcibe();
//         }

//         render () {

//           const { store} = this.props;
//           const state = store.getState();
//           const dataToBePassedAsProps = callback(state);


//           return( <Component 
//                     {...dataToBePassedAsProps} 
//                     dispatch = {store.dispatch} 
//                   />
//           );

//         }
//       }
      

//       class ConnectedComponentWrapper extends React.Component {

//             render () {

//               return (
//               <StoreContext.Consumer>
//                 {(store) => <ConnectedComponent store = {store}/>}
//               </StoreContext.Consumer>
//               );    
//             }
//       }
//       return ConnectedComponentWrapper;
    
//   };
// }


//  store.dispatch({
//     type: 'ADD_MOVIES', 
//     movies: [{name: 'Superman'}]
//  });

ReactDOM.render(
  <React.StrictMode>

    <Provider store = {store}>
    <App/>
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);


