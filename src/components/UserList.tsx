import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {
  Box,
  ListItemButton,
  Paper,
  Theme,
  useMediaQuery,
} from "@mui/material";

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
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: "400px",
        width: "100%",
        height: matches ? "60vh" : "min-content",
        overflow: "hidden",
        p: matches ? 4 : 2,
        borderRadius: 4,
        background: "rgba(17, 25, 40, 0.75)",
        backdropFilter: " blur(16px) saturate(180%)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1);",
      }}
    >
      <Typography
        variant={matches ? "h5" : "body1"}
        gutterBottom
        fontWeight={"bold"}
        textAlign={"center"}
        color={"white"}
      >
        User list
      </Typography>

      {isError && (
        <Typography
          variant={matches ? "h5" : "body1"}
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
            flexDirection: matches ? "column" : "row",
          }}
        >
          {data?.map((i) => (
            <ListItemButton
              role="listitem"
              key={i.profile.username}
              selected={selectedUserId === i.id}
              onClick={() => setSelectedUser(i.id)}
              sx={{
                gap: matches ? 2 : 0.5,
                "&.Mui-selected": {
                  background: "rgba(255,255,255,0.25)",
                  borderRadius: 4,
                },
                "& > MuiTouchRipple-root": {
                  borderRadius: 4,
                },
                minWidth: matches ? "100%" : "fit-content",
                flexDirection: matches ? "row" : "column",
                justifyContent: matches ? "flex-start" : "center",
                alignItems: "center",
              }}
            >
              <ListItemAvatar>
                <Avatar
                  key={i.profile.username}
                  alt={i.profile.firstName}
                  src={i.avatar}
                  sx={{ outline: "white", minWidth: matches ? "auto" : "0" }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={i.profile.firstName + " " + i.profile.lastName}
                color="white"
                sx={{
                  "&>.MuiTypography-root": {
                    fontSize: matches ? "1rem" : "0.75rem",
                  },
                }}
                secondary={
                  matches && (
                    <>
                      <Typography
                        sx={{ display: "inline", color: "white" }}
                        component="span"
                        variant="body2"
                      >
                        {i.profile.username}
                      </Typography>
                    </>
                  )
                }
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </Paper>
  );
}
