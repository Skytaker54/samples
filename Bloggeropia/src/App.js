import './App.css';
import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <div className="bg-success w-100 h-100 page">
      <header>
        <h1 className="logo p-4 ps-5  shadow-lg bg-warning">
          <Link role="button" className="home-button text-danger bg-gradient rounded-pill border-bottom border-3 border-success text-decoration-none" to='/'>Bloggeropia!</Link>
        </h1>
        <h2 className="tagline text-primary text-end fw-bold px-3">the best blogs on the internet - guaranteed!</h2>
      </header>
      <Outlet/>
    </div>
  );
}

export default App;
