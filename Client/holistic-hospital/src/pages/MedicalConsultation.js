import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MenuContext from "../contexts/MenuContext/MenuContext";
//Components imports
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

import "../components/cssFiles/FormDemo.css";
import { PatientInConsult } from "../helpers/PatientInConsult";
import UserRecordTable from "../components/EmergentWindows/UserRecordTable";
import CreatePrescription from "../components/EmergentWindows/CreatePrescription";



export default function MedicalConsultation() {
  const navigate = useNavigate();
  const menuContext = useContext(MenuContext);
  const patient = PatientInConsult;
  const [value, setValue] = useState('');
  if (patient.at(0).gender === 'm')
    patient.at(0).gender = 'Masculino'
  else if (patient.at(0).gender === 'f')
    patient.at(0).gender = 'Femenino'


  return (

    <div className="flex flex-col  items-center justify-center h-screen ">
      {/*
        *User creation emergent window 
      */}

      <UserRecordTable />
      <CreatePrescription />
      <h1 className="text-3xl">Consulta</h1>
      <h2 className='lg:text-xl'><b>Nombre: </b>{patient.at(0).name + ' ' + patient.at(0).last_name}</h2>
      <h2 className='lg:text-xl'><b>Edad: </b>{patient.at(0).age}</h2>
      <h2 className='lg:text-xl'><b>Género: </b>{patient.at(0).gender}</h2>
      <h2 className='lg:text-xl'><b>Discutido en cita:</b></h2>
      <InputTextarea onChange={(e) => setValue(e.target.value)} rows={5} cols={50} />
      <br />
      <div className="lg:flex lg:flex-row lg:justify-evenly xsm:flex-col xsm:justify-center lg:w-1/2">
        <div className="xsm:m-1 lg:justify-evenly lg:flex">
          <Button label="Abrir Expediente" className="p-button-info" onClick={() => {
            menuContext.settingEmergentShowRecordState();
          }} />
        </div>
        <div className="xsm:m-1 lg:justify-evenly lg:flex">
          <Button label="Agregar prescripción" className="p-button-secondary" onClick={() => {
            menuContext.settingEmergentPrescriptionState();
          }} />
        </div>
        <div className="xsm:m-1 lg:justify-evenly lg:flex">
          <Button label="Finalizar cita" className="p-button-warning" onClick={()=>{navigate("/landing/citas-dia")}} />
        </div>



      </div>

    </div>
  );
}
