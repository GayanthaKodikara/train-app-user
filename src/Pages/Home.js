


import "../bootstrap-5.1.3-dist/css/bootstrap.css"
import { useEffect, useState } from "react";

import { db } from '../firebase-config';
import { collection, getDocs } from "firebase/firestore";




function Home () {

    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const [trains, setTrains] = useState([]);
    
    
    
    useEffect(() => {
        getTrains();
    }, []);


    const getTrains = async () => {
        const querySnapshot = await getDocs(collection(db, "Trains" ));
        setTrains(querySnapshot.docs.map((doc) => ({
            ...doc.data()
        })));
    }

    


    const clearTexts = () => {
        setStart('');
        setEnd('');
       
    }

    
    return(
        <div>
            <div class="start">
            <label for="formGroupExampleInput" class="form-label">Start Station</label>
            <input type="text" value={start} onChange={(e) => { setStart(e.target.value) }} 
             class="form-control" id="formGroupExampleInput" placeholder="ex : Colombo"/>
            </div>
            <div class="end">
            <label for="formGroupExampleInput2" class="form-label">End Station</label>
            <input type="text" value={end} onChange={(e) => { setEnd(e.target.value) }} 
            class="form-control" id="formGroupExampleInput2" placeholder="ex : Kandy"/>
            </div>

            <button type="button" class="btn btn-primary" style={{ marginLeft: 10 }} onClick={getTrains}>Find Train</button>
            <button type="button" class="btn btn-danger" style={{ marginLeft: 20 }} onClick={clearTexts}>Reset</button>




            <div className="col">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Start Station</th>
                                    <th scope="col">End Station</th>
                                    <th scope="col">Start Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    trains.map(trains => {
                                        return (
                                            <tr>
                                                <td>{trains.start}</td>
                                                <td>{trains.end}</td>
                                                <td>{trains.time}</td>
                                                
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

        </div>

    )
}
export default Home