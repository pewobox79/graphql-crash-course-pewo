import {useMutation} from "@apollo/client";
import {DELETE_CLIENT} from "../../mutations/cleintMutations.ts";
import {GET_CLIENTS} from "../../queries/clientQueries.ts";

const ClientItem=(props:{id: string, name: string})=> {
console.log("props", props)
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: {
            id: props.id
        },
        update(cache, {data:{deleteClient}}){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const {clients} = cache.readQuery({
                query: GET_CLIENTS
            });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clients: clients.filter((clients:{id: string}) => clients.id!== deleteClient.id)
                }
            })
        }
    })

    return <div style={ {display: "flex", justifyContent: "center", alignItems: "center"} }>
        <h3>{ props.name }</h3>
        <button onClick={()=>deleteClient()}>delete</button></div>
}

export default ClientItem