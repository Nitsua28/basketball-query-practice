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
        const variables = {lnameToSearch: form.lname}
        const body = JSON.stringify({query,variables})
        const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body, headers:{"Content-Type":"application/json"}});
        const responseBody = await httpResponse.json();
        const players:BasketballPlayer[] = responseBody.data.players;
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