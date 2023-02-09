import { useState } from "react"
import { useMutation, useQueryClient } from "react-query";
import { addPlayer, NewPlayerForm } from "../api/api";



export function CreatePlayerForm(){

    const [form, setForm] = useState<NewPlayerForm>(
        {
            fname:"",
            lname:"",
            heightInches: 0,
            weightLbs: 0
        });
    const [isVisible,setVisible] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const addPlayerMutation = useMutation(addPlayer, {
        onSuccess: () =>{
            setVisible(true);
            queryClient.invalidateQueries("playercache")
        }
    });

    function submitPlayer(){
        const playerInput: NewPlayerForm = {
            fname: form.fname,
            lname: form.lname,
            heightInches: 0,
            weightLbs: 0
            
        }
        addPlayerMutation.mutate(playerInput);
    }


    return <>
        <h3>Create a Player</h3>
            <input type="text" placeholder="John" onChange={e => setForm({...form, fname:e.target.value})}/>
            <input type="text" placeholder="Smith" onChange={e => setForm({...form, lname: e.target.value})}/>

        <button onClick={submitPlayer}>Add Player</button>

        {isVisible ? <h5>Player Created</h5> : <> </> }
        
    </>
}