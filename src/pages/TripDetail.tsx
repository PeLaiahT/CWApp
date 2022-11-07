import { IonBackButton, IonButton, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonRouterLink, IonSelect, IonSelectOption, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getTripById, deleteTrip } from '../databaseHandler';
import { Trip } from '../models/Trip';


interface IdParam {
  id: string
}


const TripDetail = () => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [destination, setDestination] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState('')
  const [transportation,setTransportation] = useState('')
  const [riskassessment, setRiskAssessment] = useState<string>('')
  const { id } = useParams<IdParam>()
  const [validate, setValidate] = useState(false)
 

  const fetchDataFromDB = async () => {
    const trip = await getTripById(Number.parseInt(id)) as Trip
    setName(trip.name)
    setDate(trip.date)
    setDestination(trip.destination)
    setDescription(trip.description)
    setTransportation(trip.transportation)
    setDuration(trip.duration)
    setRiskAssessment(trip.riskassessment)
  }
  useEffect(() => {
    fetchDataFromDB()
  })

  const handleDelete = () => {
    deleteTrip(Number.parseInt(id))
    alert('Deleting succesfull!' + id)
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
      <IonHeader>
        <IonToolbar color="dark" >
        <IonButton slot='start' color="warning">
                        <IonBackButton defaultHref="/home" text="Back" color="danger" />
                    </IonButton>
          <IonTitle>Trip detail</IonTitle>
          <IonButton slot='end' color="warning" >
            <IonRouterLink href={'/ViewAll'}>
              <IonIcon name="trash-outline" color="danger" onClick={handleDelete} size='large'></IonIcon>
            </IonRouterLink>
          </IonButton>

        </IonToolbar>

      </IonHeader>
      <IonContent >
        <IonItem>
          <IonLabel position='floating'>
            Name
          </IonLabel>
          <IonInput value={name}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>
            Date
          </IonLabel>
          <IonInput value={date}></IonInput>

        </IonItem>
        <IonItem>
          <IonLabel position='floating'>
            Destination
          </IonLabel>
          <IonInput value={destination}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>
            Description
          </IonLabel>
          <IonInput value={description}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>
            Duration
          </IonLabel>
          <IonInput value={duration}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>
            Transportation
          </IonLabel>
          <IonInput value={transportation}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position='floating'>
            Risk Assessment
          </IonLabel>
          <IonInput value={riskassessment}></IonInput>
        </IonItem>


      </IonContent>
    </IonPage>
  );
};

export default TripDetail;
