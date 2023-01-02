import {useState, useEffect} from 'react'
import User from '../../../data/User'

const Users = () => {
    const [users, setPosts] = useState<User[]>([])
    useEffect(() => {
        fetch('http://localhost:80/api/users', 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => {
            setPosts(data)
        });
    },[])

    const userDelete = (userId: number) => {
        if (window.confirm("削除してもよろしいですか？")) {
            fetch(`http://localhost:80/api/users/${userId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(data => {
                setPosts(data)
            });
        }
    };

    return (
        <div>
            <h2>ユーザー一覧</h2>
            <ul>
                {
                    users.map(user => 
                    <li key={user.ID}> 名前：{user.name}様 年齢：{user.age} <button onClick={() => userDelete(user.ID)}>削除</button></li>
                    )
                }
            </ul>
        </div>
    )
}

export default Users;
