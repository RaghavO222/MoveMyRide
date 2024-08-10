import { useNavigate } from "react-router-dom";

const ADCarDetails = ({car,index}) => {
    const navigate = useNavigate()
    const date = new Date(car.createdAt);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const handleClick = async (e) => {
        navigate(`/reqpage/${car._id}`)
    };

    return (
        <tr>
            <td>{index}</td>
            <td onClick={handleClick} className="plate-link">{car.Plate}</td>
            <td>{formattedDate}</td>
            <td>{formattedTime}</td>
            <td>{car.status}</td>
            <td>{car.user_id.email}</td>
        </tr>
    )
}

export default ADCarDetails