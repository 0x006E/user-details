import { screen } from "@testing-library/react";
import UserDetails from "../src/components/UserDetails";
import { User } from "../src/models/User";
import { customRender } from "./customRender";

describe("UserDetails", () => {
  const mockUser: User = {
    createdAt: "2021-12-17T07:09:25.106Z",
    avatar: "https://cdn.fakercloud.com/avatars/laasli_128.jpg",
    Bio: "Magni placeat laboriosam reiciendis in officiis non nihil placeat.",
    jobTitle: "Dynamic Web Designer",
    profile: {
      username: "Xander.Hammes",
      firstName: "Marilyne",
      lastName: "Ruecker",
      email: "Micaela_Schoen@yahoo.com",
    },
    id: "1",
  };

  it("should render the component without data", () => {
    customRender(<UserDetails data={undefined} />);
    const selectUserMessage = screen.getByText("Select a user to see details");
    expect(selectUserMessage).toBeInTheDocument();
  });

  it("should render the component with user data", () => {
    customRender(<UserDetails data={mockUser} />);
    const avatarElement = screen.getByAltText(mockUser.profile.firstName);
    const usernameElement = screen.getByText(`@${mockUser.profile.username}`);
    const bioElement = screen.getByText(mockUser.Bio);
    const fullNameElement = screen.getByText(
      `${mockUser.profile.firstName} ${mockUser.profile.lastName}`
    );
    const jobTitleElement = screen.getByText(mockUser.jobTitle);
    const emailElement = screen.getByText(mockUser.profile.email);

    expect(avatarElement).toBeInTheDocument();
    expect(usernameElement).toBeInTheDocument();
    expect(bioElement).toBeInTheDocument();
    expect(fullNameElement).toBeInTheDocument();
    expect(jobTitleElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
  });

  it("should render the text field with ellipsis when not bio", () => {
    customRender(<UserDetails data={mockUser} />);
    const bioElement = screen.getByText(mockUser.jobTitle);
    expect(bioElement).toHaveStyle(
      "white-space: nowrap; text-overflow: ellipsis;"
    );
  });

  it("should render the bio text field with multiple lines when bio", () => {
    customRender(<UserDetails data={mockUser} />);
    const bioElement = screen.getByText(mockUser.Bio);
    expect(bioElement).toHaveStyle("white-space: normal;");
  });
});
