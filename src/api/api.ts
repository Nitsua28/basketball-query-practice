export type BasketballPlayer = {
    playerId: number
    fname:       string
    lname:       string
    bioMetrics: BioMetrics
    careerStats: CareerStats
}

export type BioMetrics = {
    heightInches: number
    weightLbs:    number
}

export type CareerStats = {
    shotAttempts: number
    madeBaskets:  number
    rebounds:     number
    assists:      number
    blocks:       number
}


export type PlayerForm = {
    playerId: number
    shotAttempts: number
    madeBaskets:  number
    rebounds:     number
    assists:      number
    blocks:       number

  
}

export type LastNameForm = {
    lname: string
}

export type NewPlayerForm = {
    fname: string
    lname: string
    heightInches: number
    weightLbs: number
}

export async function addPlayer(newPlayer: NewPlayerForm):Promise<BasketballPlayer[]>{

    const query = `mutation AddPlayer($playerInput: NewPlayerInput!){
  
        addPlayer(input:$playerInput){
          playerId
        }
      }`
    
    const variables = {playerInput:newPlayer};
    const requestBody: string = JSON.stringify({query,variables});
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody, headers:{'Content-Type':"application/json"}});
    const responseBody = await httpResponse.json();
    const playerInfo:{playerId:number} = responseBody;
    const updateQuery = `mutation AddPlayer($Input: StatsInput!){
  
        mergeStats(input:$Input){
          ...on BaksetballPlayer{
            playerId
            careerStats{
              shotAttempts
                  madeBaskets
                  rebounds
                  assists
                  blocks
            }
          }
          ...on PlayerDoesNotExist{
      			playerId
      			message
    			}
        
      }
    }`  

    const updateVariables = {
        input:
        {
            "Input": {
            "playerId": playerInfo,
            "shotAttempts": 0,
                "madeBaskets": 0,
            "rebounds": 0,
            "assists": 0,
            "blocks": 0
            }
        }
    }

    const request_Body: string = JSON.stringify({query: updateQuery,variables: updateVariables});
    const http_Response = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:request_Body, headers:{"Content-Type":"application/json"}});
    const response_Body = await http_Response.json()
    const player: BasketballPlayer[] = response_Body.data
    return player

}
export async function getPlayerByLastName(form: LastNameForm):Promise<BasketballPlayer[]>{
        const query = `query PlayersByLname($lnameToSearch:String){
            players(lname:$lnameToSearch){
              fname
              lname
              bioMetrics{
                heightInches
                }
            }
          }`
        console.log(form)
        const variables = {lnameToSearch: form.lname}
        const body = JSON.stringify({query,variables})
        const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-Type":"application/json"}});
        const responseBody = await httpResponse.json();
        const players:BasketballPlayer[] = responseBody.data.players;
        console.log(players)
        return players
    }
export async function getAllPlayers():Promise<BasketballPlayer[]>{
    const query = `query {
        players{
            fname
            lname

            careerStats{
            assists
            blocks
            madeBaskets
            shotAttempts
            rebounds
            }
        }
        
        }`  
    const body = JSON.stringify({query:query})
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-Type":"application/json"}});
    const responseBody = await httpResponse.json();
    const players:BasketballPlayer[] = responseBody.data.players;
    return players
}

export async function UpdatePlayerStats(basketballPlayer : PlayerForm):Promise <BasketballPlayer[]>{
  
    const query = `mutation mergeStats($playerInput: StatsInput!){
        mergeStats(input: $playerInput){
            ...on BaksetballPlayer{
            playerId
            careerStats{
              shotAttempts
                  madeBaskets
                  rebounds
                  assists
                  blocks
            }
      
          }
        }
      }`

    const variables = {playerInput:basketballPlayer}
    const requestBody: string = JSON.stringify({query,variables});
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody, headers:{"Content-Type":"application/json"}});
    const responseBody = await httpResponse.json()
    const player: BasketballPlayer[] = responseBody.data.players
    return player

}