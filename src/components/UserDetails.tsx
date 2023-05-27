import { Avatar, Box, Paper, Typography } from "@mui/material";
import { User } from "../models/User";

export interface UserDetailsProps {
  data: User | undefined;
}

const TextField = ({
  label,
  value,
  isBio = false,
}: {
  label: string;
  value: string;
  isBio?: boolean;
}) => (
  <Box width={"100%"}>
    <Typography fontSize={10} gutterBottom color={"white"} textAlign={"left"}>
      {label}
    </Typography>
    <Typography
      textAlign={"left"}
      fontSize={12}
      gutterBottom
      color={"white"}
      sx={{
        height: isBio ? "4rem" : "auto",
        outline: "1px solid gray",
        display: "-webkit-box",
        overflow: "hidden",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 3,
        borderRadius: 1,
        padding: 0.75,
        userSelect: "none",
        textOverflow: "ellipsis",
        whiteSpace: isBio ? "normal" : "nowrap",
      }}
    >
      {value}
    </Typography>
  </Box>
);

function UserDetails(props: UserDetailsProps) {
  const { data } = props;
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
      {!data ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            height: "100%",
          }}
        >
          <Typography
            variant="body1"
            gutterBottom
            textAlign={"center"}
            color={"#DCDCDC"}
          >
            Select a user to see details
          </Typography>
        </Box>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
          gap={1}
          sx={{
            p: 0.1,
            overflowX: "hidden",
            overflowY: "auto",
            height: "100%",
          }}
        >
          <Avatar
            key={data.profile.username}
            alt={data.profile.firstName}
            src={data.avatar}
            sx={{
              width: 75,
              height: 75,
              outline: "1px solid gray",
              background: "gray",
            }}
          />
          <Typography
            variant="body2"
            gutterBottom
            textAlign={"center"}
            color={"white"}
          >
            @{data.profile.username}
          </Typography>
          <TextField label={""} value={data.Bio} isBio />
          <TextField
            label={"Full name"}
            value={data.profile.firstName + " " + data.profile.lastName}
          />
          <TextField label={"Job title"} value={data.jobTitle} />
          <TextField label={"Email"} value={data.profile.email} />
        </Box>
      )}
    </Paper>
  );
}

export default UserDetails;
