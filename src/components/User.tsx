import {useState, useEffect, useRef} from 'react'
import { Link, useParams } from "react-router-dom";
import UserType from '../data/UserType';

const User = () => {
    // paramsはObjectで取得するのでキーを指定
    const userId = useParams().id;

    // 初期化しないと'undefined'でエラーした
    const [user, setUser] = useState<UserType>({
        ID: 0,
        name: '',
        email: '',
        age: 0, 
    });

    // stateで管理してるものを変更できる？
    const valueChange = (e: any) => {
        setUser(e.target.value);
    };

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

    // put
    // 各useRefはこちらを参考に →　https://zenn.dev/tns_00/articles/react-typescript-form-error-of-value
    const putName = useRef<HTMLInputElement>(null!)
    const putEmail = useRef<HTMLInputElement>(null!)
    const putAge = useRef<HTMLInputElement>(null!)
    const userUpdate = (e: any) => {
        // https://developer.mozilla.org/ja/docs/Web/API/Event/preventDefault
        e.preventDefault();
        const postData = {
            name: putName.current.value,
            email: putEmail.current.value,
            age: parseInt(putAge.current.value), // 何故かstringのままになってしまうので
        };

        if (window.confirm("ユーザーを更新しますか?")) {
            fetch(`http://localhost:80/api/users/${userId}`, 
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });
        }
    };

    return (
        <div>
            <h2>ユーザー詳細</h2>
            <form>
            <input ref={putName} type="text" value={user.name} onChange={valueChange} placeholder='名前'/>
                <input ref={putEmail} type="text" value={user.email} onChange={valueChange} placeholder='メールアドレス'/>
                <input ref={putAge} type="number" value={user.age} onChange={valueChange} placeholder='年齢'/>
                <button onClick={userUpdate}>更新</button>
            </form>
            <Link to = '/users'>一覧へ戻る</Link>
        </div>
    )
}

export default User;
