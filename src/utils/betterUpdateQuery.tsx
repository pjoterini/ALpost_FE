import { Cache, QueryInput } from "@urql/exchange-graphcache";

export function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (
    result: Result,
    query: Query
  ) =>
    | Query
    | {
        me:
          | { __typename?: "User" | undefined; id: number; username: string }
          | null
          | undefined;
      }
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}
