import React from 'react';
import { QueryClient, QueryClientProvider} from 'react-query'
import { CreatePlayerForm } from './components/addPlayer';
import { PlayerLookUp } from './components/playerLookUp';
import { PlayerViewer } from './components/showPlayers';
import { UpdatePlayer } from './components/updatePlayer';

const queryClient = new QueryClient();

// Sometimes you will find components with a convention endining in provider
// Your components are wrapped in between the provder tag
// that provider component will inject some functionality into every wrapped component

function App() {

  //query client provider will allow us to use custom hooks provided by react query
  return <>
  <QueryClientProvider client={queryClient}>

    <PlayerViewer/>
    <UpdatePlayer/>
    <PlayerLookUp/>
    <CreatePlayerForm/>

  </QueryClientProvider>
  </>
}

export default App;
