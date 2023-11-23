import { Chain, Selector, ModelTypes, ValueTypes, Gql } from './codegen/src/zeus/index.ts'

export class CyaniteApiClient {
    public readonly gqlUrl = 'https://api.cyanite.ai/graphql';

    protected readonly agent = Chain(this.gqlUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('CYANITE_ACCESS_TOKEN')}`,
      },
    });

    protected pageSelector = Selector('PageInfo')({
        hasNextPage: true,
      });

    async getLibrary(input: ValueTypes["LibraryTracksFilter"]): Promise<ModelTypes["LibraryTrackConnection"]> {
        return await this.agent('query')({
            libraryTracks: [
                { },
                { pageInfo: this.pageSelector, edges: {
                  cursor: true,
                  node: {
                    title: true
                  }
                }}
            ],
          });

    }
}