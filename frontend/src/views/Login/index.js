import React, {useState} from 'react';
import api from '../../services/api.js'

export default function Login({history}) {

    const [email, setEmail] = useState('')

    async function handleSubmit(event){
        
        event.preventDefault()

        const response = await api.post('/sessions', { email })
        const {_id} = response.data
        localStorage.setItem('user', _id)
        
        history.push('/dashboard')
    }


    return (
        <>
            <p>Provide <strong>spots</strong> to developers and find <strong>talents</strong> for your company
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input
                    onChange={event => setEmail(event.target.value)}
                    type="emai"
                    id="email"
                    placeholder="Your best e-mail"
                />
                <button type="submit" className="btn">Login</button>
            </form>
        </>
    );
}
