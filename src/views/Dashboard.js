import React from 'react'
import { useRecoilValue } from 'recoil'
import App from '../layouts/App'
import { authenticatedUser } from '../store'

export default function Dashboard() {

    const auth = useRecoilValue(authenticatedUser);
    return (
        <App title="Dashboard">
           Wellcome to Dashboard {auth.user.name}
        </App>
    )
}
