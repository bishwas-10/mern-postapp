import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postSlice"
import authReducer from "./authSlice"
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer,persistStore} from "redux-persist";


// const deleteStoreAfterOneHour=()=>{
//      const persistedState = localStorage.getItem('persist:auth');
//      console.log(persistedState)
//      if(persistedState){
//           const {_persist,expirationDate}= JSON.parse(persistedState);
//           if (_persist && expirationDate) {
//                const currentTime = new Date().getTime();
         
//                if (currentTime > expirationDate ) {
//                  localStorage.removeItem('persist:auth');
//                }
//              }
//      }
// }

const rootReducer = combineReducers({
     posts: postsReducer,
     auth: authReducer,
    
})
const PersistConfig={
     key:'auth',
     version:1,
     storage,
     blacklist:['posts'],
    

}
const persistedReducer = persistReducer(PersistConfig,rootReducer )
 const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
// const expirationDate = new Date().getTime() + 3600000;
// const persistedState = JSON.stringify({_persist:{version:-1},expirationDate});
// localStorage.setItem('persist:auth',persistedState);

// deleteStoreAfterOneHour();
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export default store;

export const persistor= persistStore(store);