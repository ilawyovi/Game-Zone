import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import NavBar from "./NavBar";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
    >
      <GridItem area="nav" >
       <NavBar />
      </GridItem>

      <Show above="lg">
      <GridItem area="aside">
        Aside
      </GridItem>
      </Show>

      <GridItem area="main" >
        <GameGrid />
      </GridItem>
    </Grid>

  );
}

export default App;
