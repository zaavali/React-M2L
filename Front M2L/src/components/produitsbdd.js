import { useEffect, useState } from 'react'
import axios from 'axios'


export default function Prodbdd() {
    const [formdata, setFormData] = useState({ id: '', nom: '', description: '', prix: '', quantité: '' })
    const [produit, setUser] = useState([])
    const [affichage, setAffichage] = useState(false)

    const handleChangeData = (e) => {
        setFormData((data) => ({ ...data, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formdata)
        try {
            await axios.put(`http://localhost:4000/produit/${formdata.id}`, formdata);
            console.log("Update request executed successfully!");
        } catch (error) {
            console.error(error);
        }
    }

    const handleCreate = async (e) => {
        e.preventDefault()
        console.log(formdata)
        try {
            await axios.post('http://localhost:4000/produit/', formdata);
            console.log("Create request executed successfully!");
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/produit/${id}`);
            console.log("Delete request executed successfully!");
        } catch (error) {
            console.error(error);
        }
    }

    const recup = async () => {
        await axios.get('http://localhost:4000/produit/').then((res) => {
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
            <h1>Products Test</h1>
            {affichage ? (
                produit.map((produit) => (
                    <div key={produit.id}>
                        <fieldset>
                            <p>id: {produit.id}</p>
                            <p> nom: {produit.nom}</p>
                            <p> description: {produit.email}</p>
                            <p> prix: {produit.prix}</p>
                            <p> quantité: {produit.quantité}</p>
                            <button onClick={() => handleDelete(produit.id)}>Delete</button>
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
                        name='description'
                        placeholder='choose a description'
                    />
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='prix'
                        placeholder='choose a price'
                    />
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='quantité'
                        placeholder='choose quantity'
                    />
                    <button type='submit'> Update products</button>
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
                        name='description'
                        placeholder='choose a description'
                    />
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='prix'
                        placeholder='choose a price'
                    />
                    <input
                        onChange={handleChangeData}
                        type='text'
                        name='quantité'
                        placeholder='choose a quantity'
                    />
                    <button type='submit'>Create a product</button>
                </form>
            </div>
        </div>
    )
}




