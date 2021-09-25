import logo from "./logo.svg";
import "./App.css";
import {
  ApolloClient,
  ApolloCache,
  ApolloProvider,
  HttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Progress from "./components/progress";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`GraphQL error: ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:3030/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});
function App() {
  return (
    <ApolloProvider client={client}>
      {" "}
      <Progress />
    </ApolloProvider>
  );
}

export default App;
