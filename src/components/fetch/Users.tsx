import React, {useState, useEffect} from 'react'
import User from '../../data/Users'

const Users = () => {

    const [users, setPosts] = useState<User[]>([])

    useEffect(() => {
        fetch('http://localhost:80/api/users', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setPosts(data)
        })
    },[])

    return (
        <div>
            <h2>ユーザー一覧</h2>
            <ul>
                {
                    users.map(user => 
                    <li key={user.ID}> 名前：{user.name}様 年齢：{user.age}</li>
                    )
                }
            </ul>

        </div>
    )
}

export default Users;
