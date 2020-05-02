import { SpacePort } from "../usecase/ports/SpacePort";
import { SpaceId } from "../domain/entities/SpaceId";
import { Space } from "../domain/entities/Space";
import { SpaceNotFoundError } from "../domain/errors/SpaceNotFoundError";

export class SpaceMemoryAdapter implements SpacePort {
  private _byId = new Map<SpaceId, Space>();
  private _bySlug = new Map<string, Space>();

  findSpaceById(spaceId: SpaceId): Promise<Space> {
    const space = this._byId.get(spaceId);

    if (space) return Promise.resolve(space);

    throw new SpaceNotFoundError(spaceId.get());
  }

  findSpaceBySlug(slug: string): Promise<Space> {
    const space = this._bySlug.get(slug);

    if (space) return Promise.resolve(space);

    throw new SpaceNotFoundError(slug);
  }

  saveSpace(space: Space): Promise<void> {
    this._byId.set(space.id, space);
    this._bySlug.set(space.slug, space);

    return Promise.resolve();
  }
}