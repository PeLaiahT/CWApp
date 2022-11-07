import { IonBackButton, IonButton, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonPage, IonRouterLink, IonThumbnail, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { useEffect, useState } from "react";
import { getAllTrip, deleteAllTrip } from '../databaseHandler';
import { Trip } from '../models/Trip';

const ViewAll = () => {

    const [allTrips, setAllTrips] = useState<Trip[]>([]);

    const fetchDataFromDB = async () => {
        const allTr = await getAllTrip()
        setAllTrips(allTr)
    }

    useEffect(() => {
        fetchDataFromDB()
    }, [])

    const handleDeleteAllItem = () => {
        deleteAllTrip()
        alert('Deleting Succesfull!')
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="dark" >
                    <IonButton slot='start' color="warning">
                        <IonBackButton defaultHref="/home" text="Back" color="danger" />
                    </IonButton>
                    <IonTitle>All trips</IonTitle>
                    <IonButton slot='end' color='warning'>
                        <IonRouterLink href={'/home'}>
                            <IonIcon onClick={handleDeleteAllItem} name='close-circle-outline' color='danger'></IonIcon>
                        </IonRouterLink>

                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {allTrips.map(c =>
                        <IonItem>
                            <IonLabel>
                                <IonRouterLink href={'/TripDetail/' + c.id}>{c.name}</IonRouterLink>
                                <IonLabel>{c.date}</IonLabel>
                                <IonLabel>{c.destination}</IonLabel>
                            </IonLabel>
                        </IonItem>
                    )}
                </IonList>

            </IonContent>

        </IonPage>
    )
}
export default ViewAll;