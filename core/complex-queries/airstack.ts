import { fetchQuery, init } from "@airstack/node";

init(process.env.AIRSTACK_API_KEY!);

export async function fetchPoaps(fid: string) {
  const { data, error } = await fetchQuery(`query MyQuery {
        Poaps(input: {filter: {owner: {_eq: "fc_fid:${fid}"}}, blockchain: ALL, limit: 10}) {
          Poap {
            eventId
            poapEvent {
              eventName
              eventURL
              startDate
              endDate
              country
              city
              contentValue {
                image {
                  extraSmall
                  large
                  medium
                  original
                  small
                }
              }
            }
          }
          pageInfo {
            nextCursor
            prevCursor
          }
        }
      }`);

  return { data, error };
}
