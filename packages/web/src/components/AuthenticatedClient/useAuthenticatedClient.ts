import { useMemo, useState } from "react";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { Client, defaultExchanges, subscriptionExchange } from "urql";

interface UseAuthenticatedClientOptions {
  token: string;
}

export const useAuthenticatedClient = ({
  token,
}: UseAuthenticatedClientOptions) => {
  const [isConnected, setConnected] = useState(false);
  const client = useMemo(() => {
    const subscriptionClient = new SubscriptionClient(
      process.env.REACT_APP_SUBSCRIPTION_URL!,
      {
        reconnect: true,
        connectionParams: { authToken: token },
        connectionCallback: (err) => {
          if (!err) {
            setConnected(true);
          }
        },
      }
    );

    return new Client({
      url: process.env.REACT_APP_GRAPHQL_URL!,
      fetchOptions: () => ({
        headers: { authorization: token ?? "" },
      }),
      exchanges: [
        ...defaultExchanges,
        subscriptionExchange({
          forwardSubscription(operation) {
            return subscriptionClient.request(operation);
          },
        }),
      ],
    });
  }, [token]);

  return { isConnected, client };
};
