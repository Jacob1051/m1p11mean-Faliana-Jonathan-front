export const addDureeToDate = (dateDebut: Date, duree: number): Date => {
  const dureeServiceEnMillisecondes = duree * 60000; // 60000 millisecondes = 1 minute
  // Ajouter la durée du service à la date de début
  let dateFin = new Date(dateDebut.getTime() + dureeServiceEnMillisecondes);
  // Arrondir la date de fin à la minute la plus proche
  dateFin = new Date(Math.round(dateFin.getTime() / 60000) * 60000);
  // console.log(dateFin);
  return dateFin;
}