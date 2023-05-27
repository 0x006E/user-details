import { screen, fireEvent } from "@testing-library/react";
import { vitest } from "vitest";
import UserList, { UserListProps } from "../src/components/UserList";
import { User } from "../src/models/User";
import { customRender } from "./customRender";

describe("UserList", () => {
  const mockData: User[] = [
    {
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
    },
    {
      createdAt: "2021-12-17T10:04:31.795Z",
      avatar: "https://cdn.fakercloud.com/avatars/dgclegg_128.jpg",
      Bio: "Est aut sed temporibus hic natus mollitia.",
      jobTitle: "National Accountability Architect",
      profile: {
        username: "Travis.Shanahan",
        firstName: "Hans",
        lastName: "Connelly",
        email: "Jena33@gmail.com",
      },
      id: "2",
    },
  ];

  const mockProps: UserListProps = {
    data: mockData,
    isLoading: false,
    isError: false,
    setSelectedUser: vitest.fn(),
    selectedUserId: "1",
  };

  it("should render the component with user list", () => {
    customRender(<UserList {...mockProps} />);
    const userListElement = screen.getByText("User list");
    expect(userListElement).toBeInTheDocument();

    const userItems = screen.getAllByRole("listitem");
    expect(userItems).toHaveLength(mockData.length);

    mockData.forEach((user, index) => {
      const avatarElement = screen.getByAltText(user.profile.firstName);
      const fullNameElement = screen.getByText(
        `${user.profile.firstName} ${user.profile.lastName}`
      );

      expect(avatarElement).toBeInTheDocument();
      expect(fullNameElement).toBeInTheDocument();

      if (mockProps.selectedUserId === user.id) {
        expect(userItems[index]).toHaveClass("Mui-selected");
      } else {
        expect(userItems[index]).not.toHaveClass("Mui-selected");
      }
    });
  });

  it("should call setSelectedUser when a user item is clicked", () => {
    const setSelectedUser = vitest.fn();
    customRender(<UserList {...mockProps} setSelectedUser={setSelectedUser} />);
    const userItems = screen.getAllByRole("listitem");

    fireEvent.click(userItems[1]);
    expect(setSelectedUser).toHaveBeenCalledWith("2");
  });

  it("should customRender loading state when isLoading is true", () => {
    customRender(<UserList {...mockProps} isLoading={true} />);
    const loaderElement = screen.getByTestId("loader");
    expect(loaderElement).toBeInTheDocument();
  });

  it("should customRender error message when isError is true", () => {
    customRender(<UserList {...mockProps} isError={true} />);
    const errorMessageElement = screen.getByText("Error loading data");
    expect(errorMessageElement).toBeInTheDocument();
  });
});
