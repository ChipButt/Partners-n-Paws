(function () {
  "use strict";

  const firebaseConfig = {
    apiKey: "AIzaSyCpmlSpnI4TAYiVuO0WAUv-fCQM6lB6HLQ",
    authDomain: "partners-n-paws.firebaseapp.com",
    projectId: "partners-n-paws",
    storageBucket: "partners-n-paws.firebasestorage.app",
    messagingSenderId: "90602644003",
    appId: "1:90602644003:web:de9f40ca61e9da791f4796",
    measurementId: "G-5XSFDR4BW5"
  };

  const services = {
    enabled: false,
    mode: "demo",
    app: null,
    auth: null,
    db: null
  };

  try {
    const firebaseLoaded =
      typeof window.firebase !== "undefined" &&
      typeof window.firebase.initializeApp === "function";

    if (firebaseLoaded) {
      if (!window.firebase.apps.length) {
        window.firebase.initializeApp(firebaseConfig);
      }

      services.enabled = true;
      services.mode = "firebase";
      services.app = window.firebase.app();
      services.auth = window.firebase.auth();
      services.db = window.firebase.firestore();

      console.log("Firebase mode enabled.");
    } else {
      console.warn("Firebase SDK not loaded. Falling back to demo mode.");
    }
  } catch (error) {
    console.warn("Firebase init failed, falling back to demo mode.", error);
  }

  window.firebaseServices = services;
})();
