import React from 'react';
import { Route, Switch, HashRouter, BrowserRouter } from "react-router-dom";
import CreateRoom from "./components/create-room-page/createRoom";
import Room from "./components/room/room";
import './App.css'

function App() {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}> 
      <Switch>
        <Route path="/" exact component={CreateRoom} />
        <Route path="/room/:roomId/:streamId" component={Room} />
      </Switch>
    </HashRouter>
  );
}

export default App;
