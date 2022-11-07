import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRadio, IonRadioGroup, IonTitle, IonToolbar } from '@ionic/react';
import { Trip } from '../models/Trip';
import { insertTrip } from '../databaseHandler';
import { useEffect, useState } from 'react';


const Home: React.FC = () => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [destination, setDestination] = useState('')
  const [duration, setDuration] = useState('')
  const [transportation, setTransportation] = useState('')
  const [riskassessment, setRiskAssessment] = useState<string>('')
  const [validate, setValidate] = useState(false)


  const saveHandle = async () => {
    if (!validate) {
      alert('Please input required fields!!')
      return
    }
    const newCus: Trip = {
      name: name,
      date: date,
      description: description,
      destination: destination,
      duration: duration,
      transportation: transportation,
      riskassessment: riskassessment,

    }
    await insertTrip(newCus)
    alert('Adding Succesfull!')
  }

  useEffect(() => {
    if (name === '' || date === '' || destination === '' || riskassessment === '') {
      setValidate(false)
    } else {
      setValidate(true)
    }
    console.log(validate)
  }, [name, date, destination, riskassessment]

  )

  return (
    <IonPage>
      <IonHeader class="ion-text-center">
        <IonToolbar color="dark"   >
          <IonTitle>Create a new trip</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <IonItem>
          <IonLabel position='floating'>
            Name <span style={{ color: 'red' }}>*</span>
          </IonLabel>
          <IonInput onIonChange={e => setName(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>
            Date  <span style={{ color: 'red' }}>*</span>
          </IonLabel>
          <IonInput onIonChange={e => setDate(e.detail.value!)}></IonInput>

        </IonItem>
        <IonItem>
          <IonLabel position='floating'>
            Destination <span style={{ color: 'red' }}>*</span>
          </IonLabel>
          <IonInput onIonChange={e => setDestination(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>
            Description
          </IonLabel>
          <IonInput onIonChange={e => setDescription(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>
            Duration
          </IonLabel>
          <IonInput onIonChange={e => setDuration(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>
            Transportation
          </IonLabel>
          <IonInput onIonChange={e => setTransportation(e.detail.value!)}></IonInput>
        </IonItem>
        <IonList>
          <IonRadioGroup value={riskassessment} onIonChange={e => setRiskAssessment(e.detail.value!)}>
            <IonListHeader>
              <IonLabel>Risk assessment <span style={{ color: 'red' }}>*</span></IonLabel>
            </IonListHeader>
            <IonItem>
              <IonLabel>Yes</IonLabel>
              <IonRadio slot='start' color="success" value="yes"></IonRadio>
            </IonItem>
            <IonItem>
              <IonLabel>No</IonLabel>
              <IonRadio slot='start' color="danger" value="No"></IonRadio>
            </IonItem>
          </IonRadioGroup>
        </IonList>
        <IonItem>
          <IonButton onClick={saveHandle} expand='block' class='ion-margin' color="primary">Save</IonButton>
          <IonButton href='/ViewAll' expand='block' class='ion-margin' color="secondary">View All</IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;


