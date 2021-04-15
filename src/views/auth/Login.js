import React, {useState} from 'react'
import App from '../../layouts/App'
import axios from 'axios';
import { useHistory } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { authenticatedUser } from '../../store';
axios.defaults.withCredentials = true;

export default function Login() {
    const history = useHistory();
    const setAuth = useSetRecoilState(authenticatedUser);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState([])

    let credentials = {email, password};

    const submitHandler = async (e) => {
        e.preventDefault();
        
        try {
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/login', credentials)
            let {data} = await axios.get('/api/me')
            setAuth({
                user: data.data,
                check: true,
            })
            history.push('/dashboard');
        } catch ({response}) {
            setErrors(response.data.errors);
        }
        // console.log(data.data);
    }

    return (
        <App title="login" className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <form onSubmit={submitHandler}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">E-mail</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="form-control"/>
                                    { errors.email && 
                                        <div className="text-danger mt-1">
                                            {errors.email[0]}
                                        </div>
                                    }
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-control">Password</label>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="form-control"/>
                                    { errors.password && 
                                        <div className="text-danger mt-1">
                                            {errors.password[0]}
                                        </div>
                                    }
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}
