import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

import { UserId } from "./UserId";
import { SpaceId } from "./SpaceId";

export class User {
  constructor(
    public id: UserId,
    public name: string,
    public spaceId: SpaceId
  ) {}

  static create(spaceId: SpaceId, userName: string | null): User {
    const name =
      userName ??
      uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        length: 2,
      });

    return new User(UserId.create(), name, spaceId);
  }
}
