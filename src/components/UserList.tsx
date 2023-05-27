import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, ListItemButton, Paper } from "@mui/material";

import Loader from "./Loader";
import { User } from "../models/User";

export interface UserListProps {
  data: User[] | undefined;
  isLoading: boolean;
  isError: boolean;
  setSelectedUser: (userId: string) => void;
  selectedUserId: string | null;
}

export default function UserList(props: UserListProps) {
  const { data, isLoading, isError, setSelectedUser, selectedUserId } = props;
  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: "400px",
        width: "100%",
        height: "60vh",
        overflow: "hidden",
        p: 4,
        borderRadius: 4,
        background: "rgba(17, 25, 40, 0.75)",
        backdropFilter: " blur(16px) saturate(180%)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1);",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        fontWeight={"bold"}
        textAlign={"center"}
        color={"white"}
      >
        User list
      </Typography>

      {isError && (
        <Typography
          variant="h5"
          gutterBottom
          fontWeight={"bold"}
          textAlign={"center"}
          color={"gray.300"}
        >
          Error loading data
        </Typography>
      )}
      {isLoading ? (
        <Box
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
          sx={{ flexGrow: 1, height: "100%" }}
        >
          <Loader />
        </Box>
      ) : (
        <List
          sx={{
            width: "100%",
            bgcolor: "background.transparent",
            color: "white",
            overflowY: "auto",
            gap: 2,
            height: "calc(100% - 32px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {data?.map((i) => (
            <ListItemButton
              key={i.profile.username}
              alignItems="flex-start"
              selected={selectedUserId === i.id}
              onClick={() => setSelectedUser(i.id)}
              sx={{
                "&.Mui-selected": {
                  background: "rgba(255,255,255,0.25)",
                  borderRadius: 4,
                },
                "& > MuiTouchRipple-root": {
                  borderRadius: 4,
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  key={i.profile.username}
                  alt={i.profile.firstName}
                  src={i.avatar}
                  sx={{ outline: "white" }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={i.profile.firstName + " " + i.profile.lastName}
                color="white"
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline", color: "white" }}
                      component="span"
                      variant="body2"
                    >
                      {i.profile.username}
                    </Typography>
                  </>
                }
              />
            </ListItemButton>
          ))}
          <Divider component={"li"} />
        </List>
      )}
    </Paper>
  );
}
