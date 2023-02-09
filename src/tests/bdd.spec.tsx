
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import App from "../App"

test("Show all players", async ()=>{


    render(<App/>);// rendering my app function

    //lets check to see if there is a list of players
    const element = await screen.findByRole("table");// there is no list yet

    //check that a specific person or people are in the list
    const player1 = await screen.findByText(/Billy/);
    const player2 = await screen.findByText(/Marcus/)
    const player3 = await screen.findByText(/Tim/)
    const player4 = await screen.findByText(/Kevin/)
})


test("It should be able to create new players", async () => {

    render(<App/>)

    // checking to see if the elements are there
    const fnameInput = await screen.findByPlaceholderText("John");
    const lnameInput = await screen.findByPlaceholderText("Smith");

    const addButton = await screen.findByText(/Add Player/);

    // interact with elements like a user
    userEvent.type(fnameInput,"Austin");
    userEvent.type(lnameInput,"Chan");

    userEvent.click(addButton);

    //check to see that a element popped up saying player created
    const createdHeading = await screen.findByText(/Player Created/);

    //check that the person added is on the screen
    const Austin = await screen.findByText(/Austin/);

})

test("update", async () => {

    render(<App/>)

    // checking to see if the elements are there
    const IDInput = await screen.findByPlaceholderText("playerID");
    const shotInput = await screen.findByPlaceholderText("shot attempts");
    const basketInput = await screen.findByPlaceholderText("Baskets");
    const reboundInput = await screen.findByPlaceholderText("Rebound");
    const assistsInput = await screen.findByPlaceholderText("Assists");
    const blocksInput = await screen.findByPlaceholderText("Blocks");

    const updateButton = await screen.findByText(/update Player/);

    // interact with elements like a user
    userEvent.type(IDInput, "10001")
    userEvent.type(blocksInput, "6")

    userEvent.click(updateButton);

    //check that the person added is on the screen
    const blocksUpdated = await screen.findByText(/46/);

})