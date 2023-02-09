
import { useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { PlayerForm, UpdatePlayerStats } from "../api/api"

// type initialState = {
//     playerID: number,
//     shotAttempts: number,
//     madeBaskets: number,
//     rebounds: number,
//     assists: number,
//     blocks: number

// }


export function UpdatePlayer(){

    const [form,setForm] = useState<PlayerForm>({
        playerId: 0,
        shotAttempts: 0,
        madeBaskets: 0,
        rebounds: 0,
        assists: 0,
        blocks: 0
    })

    const queryClient = useQueryClient();// will get us access to the query client object in the app.tsx

    // mutations are when you change the data. Anything other than a read
    const updatePlayerMutation = useMutation(UpdatePlayerStats, {
        onSuccess: () => queryClient.invalidateQueries("playercache") // whenever we successfully create a player. React Query will automatically refresh the players cache
    });


    function updatePlayer(){
        const newPlayerStats: PlayerForm ={
            playerId: form.playerId,
            shotAttempts: form.shotAttempts,
            madeBaskets: form.madeBaskets,
            rebounds: form.rebounds,
            assists: form.assists,
            blocks: form.blocks
            
            

            
            
        
        }

        updatePlayerMutation.mutate(newPlayerStats);// calls createPlayer passing in the newPlayer object
    }



    return <>

        <fieldset>
            <legend>Update player stats</legend>

            <input type="text" placeholder="playerID" onChange={e=>setForm({...form,playerId: Number(e.target.value)})}/>
            <input type="text" placeholder="shot attempts" onChange={e=>setForm({...form, shotAttempts: Number(e.target.value)})}/>
            <input type="text" placeholder="Baskets" onChange={e=>setForm({...form, madeBaskets:Number(e.target.value)})} />
            <input type="text" placeholder="Rebound" onChange={e=>setForm({...form, rebounds:Number(e.target.value)})} />
            <input type="text" placeholder="Assists" onChange={e=>setForm({...form, assists:Number(e.target.value)})} />
            <input type="text" placeholder="Blocks" onChange={e=>setForm({...form, blocks:Number(e.target.value)})} />
            
        </fieldset>

       

        <button onClick={updatePlayer} >update Player</button>
    
    
    </>

}