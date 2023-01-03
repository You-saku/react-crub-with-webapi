import {useState, useEffect, useRef} from 'react'
import { Link } from "react-router-dom";
import UserType from '../data/UserType';

const Users = () => {
    const [users, setUsers] = useState<UserType[]>([]);

    // get
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
            setUsers(data)
        });
    },[])

    // post
    // 各useRefはこちらを参考に →　https://zenn.dev/tns_00/articles/react-typescript-form-error-of-value
    const postName = useRef<HTMLInputElement>(null!)
    const postEmail = useRef<HTMLInputElement>(null!)
    const postAge = useRef<HTMLInputElement>(null!)
    const userCreate = (e: any) => {
        e.preventDefault();
        const postData = {
            name: postName.current.value,
            email: postEmail.current.value,
            age: parseInt(postAge.current.value), // 何故かstringのままになってしまうので
        };

        console.log(postData);

        if (window.confirm("ユーザーを作成しますか?")) {
            fetch('http://localhost:80/api/users', 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });
        }
    };

    // delete
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
                setUsers(data)
            });
        }
    };

    return (
        <div>
            <Link to = '/'>ホームへ戻る</Link>
            <h2>ユーザー一覧</h2>
                <ul>
                {
                    users.map(user =>
                        <li key={user.ID}>
                            {user.name}
                            <Link to = {user.ID.toString()}>詳細情報</Link>
                            <button onClick={() => userDelete(user.ID)}>削除</button>
                        </li>
                    )
                }
                </ul>
            <h2>ユーザー作成</h2>
            <form>
                <input ref={postName} type="text" placeholder='名前'/>
                <input ref={postEmail} type="text" placeholder='メールアドレス'/>
                <input ref={postAge} type="number" placeholder='年齢'/>
                <button onClick={userCreate}>作成</button>
            </form>
        </div>
    )
}

export default Users;
