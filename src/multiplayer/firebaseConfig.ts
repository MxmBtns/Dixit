/**
 * Firebase-configuratie voor online spelen.
 *
 * Maak op https://console.firebase.google.com een project aan, activeer
 * Cloud Firestore en plak hier de webconfiguratie. Zolang deze placeholder
 * blijft staan, verbergt de app de onlinemodus achter een melding en werkt
 * alles lokaal (samen op één telefoon).
 */
export const firebaseConfig = {
  apiKey: 'VUL_IN',
  authDomain: 'VUL_IN.firebaseapp.com',
  projectId: 'VUL_IN',
  storageBucket: 'VUL_IN.appspot.com',
  messagingSenderId: 'VUL_IN',
  appId: 'VUL_IN',
};

export function isFirebaseConfigured(): boolean {
  return firebaseConfig.projectId !== 'VUL_IN';
}
