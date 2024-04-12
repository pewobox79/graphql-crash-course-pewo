import './App.css'
import {Header} from "./components/Header.tsx";
import {Footer} from "./components/Footer.tsx";
import MainContent from "./components/MainContent.tsx";

import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import Clients from "./components/Clients";
import NewClientForm from "./components/NewClientForm.tsx";

function App() {

    const client = new ApolloClient({
        uri: "http://localhost:5001/graphql",
        cache: new InMemoryCache()
    });
    return (
        <ApolloProvider client={ client }>
            <Header/>
            <MainContent>
                <NewClientForm/>
                <Clients/>
            </MainContent>
            <Footer/>
        </ApolloProvider>

    )
}

export default App
