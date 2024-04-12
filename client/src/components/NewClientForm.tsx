import {useState} from "react";
import {ADD_CLIENT} from "../mutations/cleintMutations.ts";
import {GET_CLIENTS} from "../queries/clientQueries.ts";
import {useMutation} from "@apollo/client";

const NewClientForm = () => {

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: ""
    })

    const [response, setResponse] = useState<{addClient: {name: string}}>()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [addClient] = useMutation(ADD_CLIENT, {
        variables: {
            name: user.name,
            email: user.email,
            phone: user.phone
        },
        update(cache, {data: {addClient}}) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const {clients} = cache.readQuery({
                query: GET_CLIENTS
            });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clients: [...clients, addClient]
                }
            })
        }
    })

    function handleChange(event: { target: { name: string, value: string } }) {
        setUser({...user, [event.target.name]: event.target.value})
    }

    function handleSubmit(e: { preventDefault: () => void }) {
        e.preventDefault()
        if (user.name === "", user.email === "", user.phone === "") {
            alert("Please enter values to the fields")
        }

        addClient().then(res => setResponse(res.data))
        setUser({
            name: "",
            email: "",
            phone: ""
        })
    }

    console.log("response", response)

    return <><form onSubmit={ handleSubmit }>
        <input type="text" name="name" placeholder={ "name" } onChange={ handleChange }/>
        <input type="text" name="email" placeholder={ "email" } onChange={ handleChange }/>
        <input type="text" name="phone" placeholder={ "phone" } onChange={ handleChange }/>
        <button type="submit">Add Client</button>
    </form>

    {response && <p>new user has been added {response ? response.addClient?.name : "null"}</p>}
        </>
}

export default NewClientForm