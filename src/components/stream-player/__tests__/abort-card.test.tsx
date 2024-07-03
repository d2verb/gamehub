import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { AboutCard } from "../about-card";

const defaultAboutCardProps = {
  hostName: "dummy",
  hostIdentity: "dummy",
  viewerIdentity: "dummy",
  bio: null,
  followedByCount: 1,
};

describe("AboutCard", () => {
  afterEach(() => {
    cleanup();
  });

  test("shows follower number (singular)", () => {
    render(<AboutCard {...{ ...defaultAboutCardProps, followedByCount: 1 }} />);
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("follower")).toBeDefined();
  });

  test("shows follower number (plural)", () => {
    render(<AboutCard {...{ ...defaultAboutCardProps, followedByCount: 2 }} />);
    expect(screen.getByText("2")).toBeDefined();
    expect(screen.getByText("followers")).toBeDefined();
  });

  test("shows bio text if bio exists", () => {
    const expectedBio = "This is my bio";
    render(<AboutCard {...{ ...defaultAboutCardProps, bio: expectedBio }} />);
    expect(screen.getByText(expectedBio)).toBeDefined();
  });

  test("shows 'No bio' if bio is null", () => {
    const expectedBio = "No bio";
    render(<AboutCard {...{ ...defaultAboutCardProps, bio: null }} />);
    expect(screen.getByText(expectedBio)).toBeDefined();
  });

  test("shows hostname", () => {
    const expectedHostname = "dummy user";
    render(
      <AboutCard
        {...{ ...defaultAboutCardProps, hostName: expectedHostname }}
      />,
    );
    expect(screen.getByText(`About ${expectedHostname}`)).toBeDefined();
  });

  test("shows bio modal if user is host", () => {
    render(
      <AboutCard
        {...{
          ...defaultAboutCardProps,
          hostIdentity: "test-user",
          viewerIdentity: "host-test-user",
        }}
      />,
    );
    expect(screen.getByRole("button", { name: "Edit" })).toBeDefined();
  });

  test("doesn't show bio modal if user is not host", () => {
    render(
      <AboutCard
        {...{
          ...defaultAboutCardProps,
          hostIdentity: "test-user",
          viewerIdentity: "test-user",
        }}
      />,
    );

    let error = undefined;
    try {
      screen.getByRole("button", { name: "Edit" });
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
  });
});
