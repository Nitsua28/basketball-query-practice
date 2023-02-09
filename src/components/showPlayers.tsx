import { useQuery } from "react-query"
import { getAllPlayers } from "../api/api"



export function PlayerViewer(){

    // useQuery will make an httpRequest using the function you passed as the second paramater when the component loads.
    // the first parameter "players" is the cache key. It is the label of the data we got back from the web server
    // this key is important becasuse we can use this key ANYWHERE in our code and have the data be shared and in sync
    
    //useQuery returns an object literal with tons of properties.
    // isLoading is true when the http request is made but not completed
    // isError is true when the request was finished but you got back an error
    // data is the actual data from the http request if successful
    const {isLoading, isError, data = []} = useQuery("playercache", getAllPlayers);

    if(isLoading){
        return <p>LOADING</p>
    }

    if(isError){
        return <p>OH NO THERE WAS A PROBLEM</p>
    }

    return <>
        <h1>Table of Players</h1>
        <table>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Shot Attempts</th>
                <th>made Baskets</th>
                <th>rebounds</th>
                <th>Assists</th>
                <th>blocks</th>
            </tr>
            
            {data.map(p => 
                <tr>

                    <th>{p.fname}</th>
                    <th>{p.lname}</th>
                    <th>{p.careerStats.shotAttempts}</th>
                    <th>{p.careerStats.madeBaskets}</th>
                    <th>{p.careerStats.rebounds}</th>
                    <th>{p.careerStats.assists}</th>
                    <th>{p.careerStats.blocks}</th>
                </tr>)}
            
        </table>
    </>
}