import { doc, getDoc } from "firebase/firestore";
import {getDb} from '../firebase';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Carousel from 'react-bootstrap/Carousel';
import './Home.css';
import { collection, addDoc } from 'firebase/firestore';

function Home() {
    const [pet_data, setPet_data] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const firestore = getDb();
  console.log(firestore)
     const queryParameters = new URLSearchParams(window.location.search);
    const type = queryParameters.get("id");
    const findOne = async id => {
        const d = await getDoc(doc(getDb(), "Pets", id));
        setPet_data(d.data());
    }
    useEffect(()=>{
        findOne(type);
    }, []);
    const location_url = "https://www.google.com/maps/search/?api=1&query="+pet_data.latitude+","+pet_data.longitude;
    
    const handlePopupOpen = () => {
        setShowPopup(true);
      };
    
      const handlePopupClose = () => {
        setShowPopup(false);
      };
      
    
      const handleSubmit = async() => {
        // Assuming you want to send a WhatsApp message with the provided details
        try {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;
                  const Petlocation = "https://www.google.com/maps/search/?api=1&query="+latitude+","+longitude;
            console.log('data Inserted');   
            // Add a new record to the 'Reports' collection
            const reportsCollectionRef = collection(firestore, 'Reports'); // Replace 'Reports' with your actual collection name
            addDoc(reportsCollectionRef, {
              ownerAddress:pet_data.owner_address,
              ownerContact1: pet_data.owner_contact,
              ownerContact2: pet_data.owner_alt_contact,
              ownername:pet_data.owner_name,
              ownerUid: pet_data.owner_uid,
              petColor: pet_data.breed,
              petId:pet_data.uid,
              petName:pet_data.name,
              reporterName:name,
              reporterPhone:phoneNumber ,
              Location:Petlocation,

              date: new Date(),
            });
            console.log('data Inserted');
        const whatsappLink = `https://api.whatsapp.com/send?phone=7017180843&text=I%20found%20your%20CoCo!%20Kindly%20contact%20Phone:%20${encodeURIComponent(phoneNumber)}%0ALocation:%20${encodeURIComponent(location_url)}`;
        window.open(whatsappLink, '_blank');
                },
        (error) => {
            console.error('Error getting location:', error);
          }
        );
            
    } catch (error) {
        console.error('Error submitting report:', error);
      }
      };
    
      
  return (
     <Container>
        <Row>
        <Col>
        <Container>
            <Row>
                <Col className="cardImgCont">
                    <img className="cardImg" src={pet_data.dog_image}/>
                </Col>
                <Col className="cardImgCont">
                    <img className="cardImg" src={pet_data.picture_with_owner} />
                </Col>
                <Col className="cardImgCont">
                    <img className="cardImg" src={pet_data.birthmark_image} />
                </Col>
            </Row>
        </Container>
        
        <div className="heading fs-3 mt-3 mb-3">About Pet</div>
        <button style={{ backgroundColor: 'yellow' }} onClick={handlePopupOpen}>
        Report Found!
      </button>
             <Table hover className="shadow mb-5" size="xl">
                <tbody>
                    <tr><td className="ps-5"><small>Name</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.name}</span></td></tr>
                    <tr><td className="ps-5"><small>Breed</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.breed}</span></td></tr>
                    <tr><td className="ps-5"><small>Species</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.species}</span></td></tr>
                    <tr><td className="ps-5"><small>Sex</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.sex}</span></td></tr>
                    <tr><td className="ps-5"><small>Weight</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.weight}</span></td></tr>
                    <tr><td className="ps-5"><small>Date Of Birth</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.dob}</span></td></tr>
                    <tr><td className="ps-5"><small>Birthmark</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.birthmark}</span></td></tr>
                    <tr><td className="ps-5"><small>Nature</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.nature}</span></td></tr>
                    <tr><td className="ps-5"><small>Last Pregnancy</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.last_pregnancy}</span></td></tr>
                    <tr><td className="ps-5"><small>Sterilized</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.sterilization}</span></td></tr>
                    <tr><td className="ps-5"><small>Multi-Disease Vaccinated</small></td><td className="pe-5" align="right"><span className="text-secondary">{(pet_data.vaccine9in1 ?? false)? "Yes":"No"}</span></td></tr>
                    {(pet_data.vaccine9in1 ?? false)?<tr><td className="ps-5"><small>Previous Multi Vaccination</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.vaccine9in1LastDate}</span></td></tr>:""}
                    <tr><td className="ps-5"><small>Upcoming Multi Vaccination</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.vaccine9in1UpcomingDate}</span></td></tr>
                    <tr><td className="ps-5"><small>Rabies Vaccinated</small></td><td className="pe-5" align="right"><span className="text-secondary">{(pet_data.vaccineRabies ?? false)? "Yes":"No"}</span></td></tr>
                    {(pet_data.vaccineRabies ?? false)?<tr><td className="ps-5"><small>Previous Rabies Vaccination</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.vaccineRabiesLastDate}</span></td></tr>:""}
                    <tr><td className="ps-5"><small>Upcoming Rabies Vaccination</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.vaccineRabiesUpcomingDate}</span></td></tr>
                     </tbody>
            </Table>
                    <div className="heading fs-3 mt-3 mb-3">Owner Details</div>
            <Table hover className="shadow mb-5" size="xl">
                <tbody>
                    <tr><td className="ps-5"><small>Owner Name</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.owner_name}</span></td></tr>
                    <tr><td className="ps-5"><small>Owner Contact</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.owner_contact}</span></td></tr>
                    <tr><td className="ps-5"><small>Owner Alt Contact</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.owner_alt_contact}</span></td></tr>
                    {(pet_data.secure ?? false)?"":<><tr><td className="ps-5"><small>Owner Address</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.owner_address}</span></td></tr>
                    <tr><td className="ps-5"><small>Location</small></td><td className="pe-5" align="right"><span className="text-secondary"><a href={location_url}>Location</a></span></td></tr></>}
                     </tbody>
            </Table>
            
             {/*       <div className="heading fs-3 mt-3 mb-3">Clinic Details</div>
            <Table hover className="shadow mb-5" size="xl">
                <tbody>
                    <tr><td className="ps-5"><small>Doctor Name</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.doctor_name}</span></td></tr>
                    <tr><td className="ps-5"><small>Clinic Name</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.clinic_name}</span></td></tr>
                    <tr><td className="ps-5"><small>Clinic Address</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.clinic_address}</span></td></tr>
                    <tr><td className="ps-5"><small>Clinic Hours</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.clinic_hours}</span></td></tr>
                    <tr><td className="ps-5"><small>Clinic Contact</small></td><td className="pe-5" align="right"><span className="text-secondary">{pet_data.clinic_contact}</span></td></tr>
                     </tbody>
            </Table>*/}
                    <div className="heading fs-3 mt-3 mb-3">Ongoing/Past Treatments</div>
                    {/* <ul>{display}</ul> */}
          
                
                
                {pet_data.treatment &&
          pet_data.treatment.map((treatmentString, index) => {
            const treatment = JSON.parse(treatmentString);
            return (
                <Table hover className="shadow mb-5" size="xl" >
                <tbody>
                <tr><td className="ps-5"><small>Infection</small></td><td className="pe-5" align="right"><span className="text-secondary">{treatment.infection}</span></td></tr>
                    <tr><td className="ps-5"><small>Treatment</small></td><td className="pe-5" align="right"><span className="text-secondary">{treatment.treatment}</span></td></tr>
                    <tr><td className="ps-5"><small>Last Visited On</small></td><td className="pe-5" align="right"><span className="text-secondary">{treatment.last_visit_date}</span></td></tr>
                    <tr><td className="ps-5"><small>Reccurs Every</small></td><td className="pe-5" align="right"><span className="text-secondary">{treatment.is_recurring}</span></td></tr>
                    </tbody>
                    </Table>
            );
          })}
                 

      {showPopup && (
  <div className="popup">
    <div className="popup-content">
    <span className="close" onClick={handlePopupClose}>
        &times;
      </span>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Phone Number:
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </label>
      <button onClick={handleSubmit}>Report & Call</button>
      
    </div>
  </div>
)}

                    
                    
                          
            
        </Col>
     </Row>
    </Container>
  );
}












export default Home;
