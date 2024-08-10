const CarDetails = ({car,index}) => {
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

    return (
        <tr>
            <td>{index}</td>
            <td>{car.Plate}</td>
            <td>{formattedDate}</td>
            <td>{formattedTime}</td>
            <td>{car.status}</td>
            
        </tr>
    )
}

export default CarDetails