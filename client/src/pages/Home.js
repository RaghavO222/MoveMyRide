import {useEffect} from 'react'
import { useCarsContext } from '../hooks/useCarsContext'
import { useAuthContext } from '../hooks/useAuthContext'

import CarDetails from '../components/CarDetails'
import ReqForm from '../components/ReqForm'

const Home = () => {
    const {cars,dispatch} = useCarsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchCars = async () => {
            const response = await fetch('/api/car',{
                headers:{
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_CARS',payload: json})
            }
        }

        if(user){
            fetchCars()
        }

    },[dispatch,user])
    return (
        <div className="home">
            <ReqForm />
            <table className="car-table">
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Plate Number</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {cars && cars.map((car, index) => (
                        <CarDetails key={car._id} car={car} index={index + 1}  />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Home