import Grid from "@mui/material/Unstable_Grid2/Grid2";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import useUsers from "./hooks/useUsers";
import { useState } from "react";

function App() {
  const { data, isLoading, isError } = useUsers();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedUser = data?.find((user) => user.id === selectedId);

  return (
    <Grid container spacing={2} flexGrow={1} height={"100%"}>
      <Grid
        xs={12}
        container
        md={6}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <UserList
          data={data}
          isError={isError}
          isLoading={isLoading}
          setSelectedUser={setSelectedId}
          selectedUserId={selectedId}
        />
      </Grid>
      <Grid
        xs={12}
        md={6}
        container
        justifyContent={"center"}
        alignItems={"center"}
      >
        <UserDetails data={selectedUser} />
      </Grid>
    </Grid>
  );
}

export default App;
