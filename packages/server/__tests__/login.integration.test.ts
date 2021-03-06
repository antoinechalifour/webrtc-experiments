/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AwilixContainer } from "awilix";

import { TalkieApp } from "../src/application/server";
import { TalkieTestClient, GraphQLSpace } from "./utils/TalkieTestClient";
import { createTestApp } from "./utils/createTestApp";

describe("login", () => {
  let app: TalkieApp;
  let port: string;
  let container: AwilixContainer;
  let client: TalkieTestClient;
  let space: GraphQLSpace;
  let rtcConfiguration: RTCConfiguration;

  beforeEach(async () => {
    ({ app, port, container } = await createTestApp());

    client = TalkieTestClient.createAnonymousClient(port);
    rtcConfiguration = container.resolve<RTCConfiguration>("rtcConfiguration");

    await app.run();

    const createSpaceResult = await client.createSpace();

    space = createSpaceResult.data!.createSpace.space;
  });

  afterEach(async () => {
    await app.stop();
  });

  it("should return a session with the given user name", async () => {
    // Given
    const userName = "Jane doe";

    // When
    const response = await client.login(space.slug, userName);

    // Then
    expect(response.data!.login).toMatchObject({
      success: true,
      session: {
        token: expect.any(String),
        user: {
          id: expect.any(String),
          name: userName,
        },
        space: {
          id: space.id,
          slug: space.slug,
        },
      },
      rtcConfiguration,
    });
  });
});
