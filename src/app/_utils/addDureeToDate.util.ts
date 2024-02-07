export const addDureeToDate = (dateDebut: Date, duree: number): Date => {
  const dureeServiceEnMillisecondes = duree * 60000; // 60000 millisecondes = 1 minute
  // Ajouter la durée du service à la date de début
  let dateFin = new Date(dateDebut.getTime() + dureeServiceEnMillisecondes);
  // Arrondir la date de fin à la minute la plus proche
  dateFin = new Date(Math.round(dateFin.getTime() / 60000) * 60000);
  // console.log(dateFin);
  return dateFin;
}

export function addOneMinute(date:Date) {
  // Crée une copie de la date pour ne pas modifier l'original
  const newDate = new Date(date);
  
  // Ajoute une minute à la date
  newDate.setMinutes(newDate.getMinutes() + 1);
  
  return newDate;
}
