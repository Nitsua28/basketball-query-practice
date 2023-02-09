
import { useState } from "react"
import {  useQuery, useQueryClient } from "react-query"
import { LastNameForm, getPlayerByLastName} from "../api/api"




export function PlayerLookUp(){

    const [form,setForm] = useState<LastNameForm>({
        lname: ""
    })

    const queryClient = useQueryClient();// will get us access to the query client object in the app.tsx

    const {isLoading, isError, data = []} = useQuery("playercache",() => (getPlayerByLastName(form)));


    if(isLoading){
        return <p>LOADING</p>
    }

    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }
    // mutations are when you change the data. Anything other than a read


    return <>

        <fieldset>
            <legend>Get player by Last Name</legend>

            <input type="text" placeholder="playerID" onChange={e=>setForm({...form, lname: e.target.value})}/>
            
        </fieldset>

       

        <div>{(data.length !== 0) ? data.map((p)=> <div> {p.fname} {p.lname} {p.bioMetrics.heightInches}</div>) : <div> </div> }</div>
    
    
    </>

}