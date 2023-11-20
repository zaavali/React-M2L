import { useEffect, useState } from 'react'
import axios from 'axios'


export default function User() {
    const [formdata, setFormData] = useState({ id: '', nom: '', email: '', mdp: '', admin: '' })
    const [user, setUser] = useState([])
    const [affichage, setAffichage] = useState(false)

    const handleChangeData = (e) => {
        setFormData((data) => ({ ...data, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formdata)
        try {
            await axios.put(`http://localhost:4000/user/${formdata.id}`, formdata);
            console.log("Update request executed successfully!");
        } catch (error) {
            console.error(error);
        }
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        console.log(formdata)
        try {
            await axios.post('http://localhost:4000/user/', formdata);
            console.log("Create request executed successfully!");
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/user/${id}`);
            console.log("Delete request executed successfully!");
        } catch (error) {
            console.error(error);
        }
    }

    const recup = async () => {
        await axios.get('http://localhost:4000/user/').then((res) => {
            console.log(res)
            setUser(res.data)
            setAffichage(true)
        })
    }
 

    useEffect(() => {
        recup()
    }, [])

    return (
        <div>
            <h1>User Test</h1>
            {affichage ? (
                user.map((user) => (
                    <div key={user.id}>
                        <fieldset>
                            <p>id: {user.id}</p>
                            <p> nom: {user.nom}</p>
                            <p> email: {user.email}</p>
                            <button onClick={() => handleDelete(user.id)}>Delete</button>
                        </fieldset>
                    </div>
                ))
            ) : (
                <p>Chargement...</p>
            )}
            <div>
                <form onSubmit={handleSubmit} >
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='id'
                        placeholder='choose an id'
                    />
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='nom'
                        placeholder='choose a name'
                    />
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='email'
                        placeholder='choose a mail'
                    />
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='mdp'
                        placeholder='choose a password'
                    />
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='admin'
                        placeholder='choose admin value'
                    />
                    <button type='submit'> Update an user</button>
                </form>
                <form onSubmit={handleCreate}>
                <input
                        onChange={handleChangeData}
                        type='text'
                        name='id'
                        placeholder='choose an id'
                    />
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='nom'
                        placeholder='choose a name'
                    />
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='email'
                        placeholder='choose a mail'
                    />
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='mdp'
                        placeholder='choose a password'
                    />
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='admin'
                        placeholder='choose admin value'
                    />
                    <button type='submit'>Create an user</button>
                </form>
            </div>
        </div>
    )
}










































