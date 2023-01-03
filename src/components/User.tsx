import {useState, useEffect} from 'react'
import { Link, useParams } from "react-router-dom";
import UserType from '../data/UserType';

const User = () => {
    // 初期化しないと'undefined'でエラーした
    const [user, setUser] = useState<UserType>({
        ID: 0,
        name: '',
        email: '',
        age: 0, 
    });

    // paramsはObjectで取得するのでキーを指定
    const userId = useParams().id;
    // get
    useEffect(() => {
        fetch(`http://localhost:80/api/users/${userId}`, 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => {
            setUser(data)
        });
    },[userId])

    return (
        <div>
            <h2>ユーザー詳細</h2>
            <ul>
                <li>
                    名前：{user.name}様,
                    メールアドレス：{user.email},
                    年齢：{user.age}
                </li>
            </ul>
            <Link to = '/users'>一覧へ戻る</Link>
        </div>
    )
}

export default User;
