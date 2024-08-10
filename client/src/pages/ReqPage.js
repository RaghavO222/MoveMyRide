import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const ReqPage = () => {
    const { carId } = useParams();
    const [car, setCar] = useState(null);
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await fetch(`/api/car/${carId}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch car details');
                }

                const data = await response.json();

                if(response.ok){
                    setCar(data);
                }
                
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        };

        if (user) {
            fetchCarDetails();
        }
    }, [carId, user]);

    if (!car) {
        return (<div>Loading. . .</div>);
    }

    const UpdateStatus = async (newstatus) => {
        try{
            const response = await fetch(`/api/car/${carId}`,{
                method:'PATCH',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({status : newstatus})
            })

            if(!response.ok){
                throw new Error('Failed to update car status');
            }

            const updatedCar = await response.json();
            console.log(updatedCar)
            setCar(updatedCar);
            navigate('/admin');
        }catch(error){
            console.error('Error updating car status:', error);
        }
    }

    const sMail = async() => {
        try{
            const response = await fetch(`/api/carDB/sendMail/${car.Plate}`,{
                headers:{
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            if (!response.ok) {
                throw new Error('Failed to send email');
            }
        }catch(error){
            console.error('Error sending email:', error);
        }
    }

    const onReject = () => {
        if (window.confirm('Are you sure you want to reject this request?')) {
            UpdateStatus('Rejected')
        }
    }

    const onApprove = () => {
        if (window.confirm('Are you sure you want to approve this request?')) {
            UpdateStatus('Approved')
            sMail()
        }
    }

    return (
        <div>
            <h2>Car Details</h2>
            <p><strong>Plate:</strong> {car.Plate}</p>
            <p><strong>Status:</strong> {car.status}</p>
            <p><strong>Requested By:</strong> {car.user_id.email}</p>
            {car.img && (
                <div>
                    <h2>Car Image:</h2>
                    <img src={car.img} alt="Car" />
                </div>
            )}

            <div className="button-container">         
                {car.status === 'Pending' ? (
                    <>
                        <button className="reject-button" onClick={onReject}>Reject</button>
                        <button className="approve-button" onClick={onApprove}>Approve</button>
                    </>
                ) : (
                    <div className="status-box">
                        <p>Request: {car.status}</p>
                    </div>
                )}       
                
            </div>
        </div>
    )
}

export default ReqPage;