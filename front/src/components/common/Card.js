import "../../styles/Card.css";

const Card = ({ children }) => {
    return (
        <div className="Card Card-Size">
            { children }
        </div>
    );
};

export default Card;
