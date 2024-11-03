import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import '../Style/Home.css'

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('TOKEN')
    if(!token){
      navigate('/signin')
    }
  }, [])
  return (
    <header>
      <Link className="home-link" to={"/"}>Home</Link>
      <span className="username"> {localStorage.getItem('EMAIL')} </span>
      <button
        onClick={() => {
          localStorage.clear();
          navigate('/signin');
        }}
        className="logout-btn"
      >LogOut</button>
    </header>
      
  )
}

export default Home
