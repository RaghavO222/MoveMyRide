import { useRef,useState } from "react";
import { useCarsContext } from "../hooks/useCarsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Webcam from 'react-webcam';
import { storage } from '../firebase/firebase';
import { ref, uploadString, getDownloadURL } from "firebase/storage";

const ReqForm = () => {
    const {dispatch} = useCarsContext()
    const {user} = useAuthContext()
    const [Plate, setPlate] = useState('');
    const [error, setError] = useState(null);

    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [img,setImg] = useState('');
    const [showWebcam,setShowWebcam] = useState(false);
    const [photoUp,setPhotoUp] = useState(false);

    const capturePhoto = async (e) => {
        e.preventDefault();
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    };
    
    const uploadPhoto = async (e) => {
        e.preventDefault();
        if(window.confirm('Are you sure you want to upload this photo?')){            
            const fileRef = ref(storage, `images/${Plate}-${Date.now()}.jpg`);
            await uploadString(fileRef, capturedImage, 'data_url');
            setImg(await getDownloadURL(fileRef)) ;
            setShowWebcam(false);
            setPhotoUp(true);
        }        
    }

    const clPhoto = async (e) => {
        e.preventDefault();
        !photoUp && setShowWebcam(true);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user){
            setError('You must be logged in')
            return
        }

        if(!capturedImage){
            setError('You must click a photo')
            return
        }

        try{     

            const car = { Plate , img };

        const rp = await fetch(`/api/carDB/${Plate}`,{
            headers:{
                'Authorization' : `Bearer ${user.token}`
            }
        })

        if(rp.ok){
            const response = await fetch('/api/car', {
                method: 'POST',
                body: JSON.stringify(car),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${user.token}`
                }
            });
    
            const json = await response.json();
    
            if (!response.ok) {
                setError(json.error);
            }
            if (response.ok) {
                setPlate('');
                setError(null);
                setCapturedImage(null)
                console.log('new Req added', json);
                dispatch({type: 'CREATE_CARS', payload: json})
            }
        }else{
            setError('Car does not exists')
        }

        }catch(error){
            setError('Failed to upload image');
        }

        

        
    };

    return (
        <form className="create" onSubmit={handleSubmit} >
            <input 
                type="text"
                onChange={(e) => setPlate(e.target.value)}
                value={Plate}
                placeholder="Plate Number"
                required={true}
            />
            <button type="button" onClick={clPhoto} className={photoUp ? 'disabled-button' : ''}
                disabled={photoUp}>Photo</button>
            {showWebcam && (
                <div className="webcam-popup">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={320}
                    height={240}
                />
                <button onClick={capturePhoto}>Capture Photo</button>
                {capturedImage && (
                    <div>
                        <h2>Captured Photo:</h2>
                        <img src={capturedImage} alt="Captured" />
                        <button onClick={uploadPhoto}>Upload</button>
                    </div>
                )}
                
                </div>
            )}
            
            <button>+ Create Request</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default ReqForm;
