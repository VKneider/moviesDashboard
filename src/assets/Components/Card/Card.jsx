import "./Card.css";

export default function Card({ poster, title, description }) {
    return (
            <article className="card">
                <img className="card-poster" src={poster} alt="movie poster" />
                <h3>{title}</h3>
                <p>{description.slice(0,100)}...</p>
            </article>
    );
}
