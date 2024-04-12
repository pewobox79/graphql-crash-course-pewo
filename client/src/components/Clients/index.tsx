import { useQuery} from "@apollo/client";
import {GET_CLIENTS} from "../../queries/clientQueries.ts";
import ClientItem from "./ClientItem.tsx";


//the code below is the same as we used to make the query in the graphiql

const Clients = () => {
    const {data, loading, error} = useQuery(GET_CLIENTS)

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;

    return <>{ !loading && !error && <div>
        { data?.clients.map((item:{id: string, name: string})  => {
            return <ClientItem
                key={item.id}
                id={item.id}
                name={item.name}/>
        }) }
    </div> }</>
}

export default Clients