import { Link } from "react-router-dom";
const Home = () => {
    return (
        <div>
            <h1>ホーム</h1>
            <Link to = '/users'>ユーザー画面へ</Link>
        </div>
    )
}

export default Home;
