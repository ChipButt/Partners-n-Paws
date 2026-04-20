(function () {
  "use strict";

  const APP_DATA = window.APP_DATA || {
    activities: [],
    dateOptions: [],
    demoCandidates: []
  };

  const FIREBASE = window.firebaseServices || {
    enabled: false,
    mode: "demo",
    app: null,
    auth: null,
    db: null
  };

  const STORAGE_KEYS = {
    users: "paws_users",
    session: "paws_session",
    profilePrefix: "paws_profile_",
    matchesPrefix: "paws_matches_"
  };

  const state = {
    user: null,
    profile: null,
    currentCandidateIndex: 0,
    currentCandidate: null,
    currentMatch: null,
    matches: []
  };

  const $ = (id) => document.getElementById(id);

  const dom = {
    modeBadge: $("modeBadge"),

    screenLanding: $("screenLanding"),
    screenProfile: $("screenProfile"),
    screenBrowse: $("screenBrowse"),
    screenActivities: $("screenActivities"),
    screenDates: $("screenDates"),
    screenMatches: $("screenMatches"),

    navHomeBtn: $("navHomeBtn"),
    navBrowseBtn: $("navBrowseBtn"),
    navProfileBtn: $("navProfileBtn"),
    navMatchesBtn: $("navMatchesBtn"),
    logoutBtn: $("logoutBtn"),

    showSignupBtn: $("showSignupBtn"),
    showLoginBtn: $("showLoginBtn"),
    signupCard: $("signupCard"),
    loginCard: $("loginCard"),
    signupForm: $("signupForm"),
    loginForm: $("loginForm"),

    signupName: $("signupName"),
    signupEmail: $("signupEmail"),
    signupPassword: $("signupPassword"),
    loginEmail: $("loginEmail"),
    loginPassword: $("loginPassword"),

    profileForm: $("profileForm"),
    profileName: $("profileName"),
    profileAge: $("profileAge"),
    profileLocation: $("profileLocation"),
    profileCounty: $("profileCounty"),
    profileDistance: $("profileDistance"),
    profilePrivacy: $("profilePrivacy"),
    profileBio: $("profileBio"),
    dogName: $("dogName"),
    dogBreed: $("dogBreed"),
    dogAge: $("dogAge"),
    dogSize: $("dogSize"),
    dogTemperament: $("dogTemperament"),
    profilePhoto: $("profilePhoto"),
    dogVerificationPhoto: $("dogVerificationPhoto"),

    previewAvatar: $("previewAvatar"),
    previewName: $("previewName"),
    previewMeta: $("previewMeta"),
    previewBio: $("previewBio"),
    previewDogName: $("previewDogName"),
    previewDogMeta: $("previewDogMeta"),

    candidateAvatar: $("candidateAvatar"),
    candidateName: $("candidateName"),
    candidateDistance: $("candidateDistance"),
    candidateMeta: $("candidateMeta"),
    candidateBio: $("candidateBio"),
    candidateDogName: $("candidateDogName"),
    candidateDogBreed: $("candidateDogBreed"),
    candidateDogTemperament: $("candidateDogTemperament"),

    passBtn: $("passBtn"),
    likeBtn: $("likeBtn"),

    activityOptions: $("activityOptions"),
    activityMatchSummary: $("activityMatchSummary"),
    saveActivityChoicesBtn: $("saveActivityChoicesBtn"),

    dateOptions: $("dateOptions"),
    dateSummary: $("dateSummary"),
    saveDateChoicesBtn: $("saveDateChoicesBtn"),

    matchesList: $("matchesList"),

    toast: $("toast"),
    modalOverlay: $("modalOverlay"),
    modalContent: $("modalContent"),
    closeModalBtn: $("closeModalBtn"),

    activityOptionTemplate: $("activityOptionTemplate"),
    dateOptionTemplate: $("dateOptionTemplate"),
    matchCardTemplate: $("matchCardTemplate")
  };

  const screens = [
    dom.screenLanding,
    dom.screenProfile,
    dom.screenBrowse,
    dom.screenActivities,
    dom.screenDates,
    dom.screenMatches
  ];

  function safeParse(value, fallback) {
    try {
      return JSON.parse(value) ?? fallback;
    } catch {
      return fallback;
    }
  }

  function loadJSON(key, fallback) {
    return safeParse(localStorage.getItem(key), fallback);
  }

  function saveJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function removeStorage(key) {
    localStorage.removeItem(key);
  }

  function profileKey(uid) {
    return `${STORAGE_KEYS.profilePrefix}${uid}`;
  }

  function matchesKey(uid) {
    return `${STORAGE_KEYS.matchesPrefix}${uid}`;
  }

  function uuid() {
    return `id_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  }

  function showToast(message) {
    dom.toast.textContent = message;
    dom.toast.classList.remove("hidden");

    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(() => {
      dom.toast.classList.add("hidden");
    }, 3000);
  }

  function openModal(html) {
    dom.modalContent.innerHTML = html;
    dom.modalOverlay.classList.remove("hidden");
  }

  function closeModal() {
    dom.modalOverlay.classList.add("hidden");
  }

  function setModeBadge() {
    if (!dom.modeBadge) return;
    dom.modeBadge.textContent = FIREBASE.enabled ? "Firebase mode" : "Demo mode";
  }

  function showScreen(screenId) {
    screens.forEach((screen) => {
      if (screen) screen.classList.remove("active");
    });

    const screen = document.getElementById(screenId);
    if (screen) {
      screen.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function setSignedInUI(isSignedIn) {
    dom.navBrowseBtn.classList.toggle("hidden", !isSignedIn);
    dom.navProfileBtn.classList.toggle("hidden", !isSignedIn);
    dom.navMatchesBtn.classList.toggle("hidden", !isSignedIn);
    dom.logoutBtn.classList.toggle("hidden", !isSignedIn);
  }

  function getSelectedValues(selector) {
    return Array.from(document.querySelectorAll(selector))
      .filter((input) => input.checked)
      .map((input) => input.value);
  }

  function setSelectedValues(selector, values) {
    const selected = new Set(values || []);
    document.querySelectorAll(selector).forEach((input) => {
      input.checked = selected.has(input.value);
    });
  }

  function updateProfilePreview() {
    const name = dom.profileName.value.trim() || "Your name";
    const age = dom.profileAge.value.trim() || "Age";
    const location = dom.profileLocation.value.trim() || "Area";
    const bio = dom.profileBio.value.trim() || "Your bio will appear here.";
    const dogName = dom.dogName.value.trim() || "Dog name";
    const dogBreed = dom.dogBreed.value.trim() || "Breed";
    const dogSize = dom.dogSize.value.trim() || "Size";
    const dogTemperament = dom.dogTemperament.value.trim() || "Temperament";

    dom.previewName.textContent = name;
    dom.previewMeta.textContent = `${age} • ${location}`;
    dom.previewBio.textContent = bio;
    dom.previewDogName.textContent = dogName;
    dom.previewDogMeta.textContent = `${dogBreed} • ${dogSize} • ${dogTemperament}`;
  }

  function getLocalUsers() {
    return loadJSON(STORAGE_KEYS.users, []);
  }

  function saveLocalUsers(users) {
    saveJSON(STORAGE_KEYS.users, users);
  }

  function getLocalSession() {
    return loadJSON(STORAGE_KEYS.session, null);
  }

  function setLocalSession(user) {
    saveJSON(STORAGE_KEYS.session, user);
  }

  function clearLocalSession() {
    removeStorage(STORAGE_KEYS.session);
  }

  function getLocalProfile(uid) {
    return loadJSON(profileKey(uid), null);
  }

  function saveLocalProfile(uid, profile) {
    saveJSON(profileKey(uid), profile);
  }

  function getLocalMatches(uid) {
    return loadJSON(matchesKey(uid), []);
  }

  function saveLocalMatches(uid, matches) {
    saveJSON(matchesKey(uid), matches);
  }

  function sortMatches(matches) {
    return [...matches].sort((a, b) => (b.updatedAtMs || 0) - (a.updatedAtMs || 0));
  }

  function mapFirebaseUser(user) {
    if (!user) return null;

    return {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email || ""
    };
  }

  async function createAccount(name, email, password) {
    if (FIREBASE.enabled && FIREBASE.auth) {
      const credential = await FIREBASE.auth.createUserWithEmailAndPassword(email, password);

      if (credential.user && name) {
        try {
          await credential.user.updateProfile({ displayName: name });
        } catch (error) {
          console.warn("Could not set display name.", error);
        }
      }

      const mapped = mapFirebaseUser(credential.user);
      mapped.name = name || mapped.name;

      state.user = mapped;
      setLocalSession(mapped);
      return mapped;
    }

    const users = getLocalUsers();
    const existing = users.find((user) => user.email.toLowerCase() === email.toLowerCase());

    if (existing) {
      throw new Error("An account with that email already exists.");
    }

    const newUser = {
      uid: uuid(),
      name,
      email,
      password
    };

    users.push(newUser);
    saveLocalUsers(users);

    state.user = {
      uid: newUser.uid,
      name: newUser.name,
      email: newUser.email
    };

    setLocalSession(state.user);
    return state.user;
  }

  async function loginUser(email, password) {
    if (FIREBASE.enabled && FIREBASE.auth) {
      const credential = await FIREBASE.auth.signInWithEmailAndPassword(email, password);
      const mapped = mapFirebaseUser(credential.user);

      state.user = mapped;
      setLocalSession(mapped);
      return mapped;
    }

    const users = getLocalUsers();
    const existing = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );

    if (!existing) {
      throw new Error("Email or password not recognised.");
    }

    state.user = {
      uid: existing.uid,
      name: existing.name,
      email: existing.email
    };

    setLocalSession(state.user);
    return state.user;
  }

  async function logoutUser() {
    if (FIREBASE.enabled && FIREBASE.auth) {
      try {
        await FIREBASE.auth.signOut();
      } catch (error) {
        console.warn("Firebase sign out failed.", error);
      }
    }

    state.user = null;
    state.profile = null;
    state.currentMatch = null;
    state.matches = [];
    clearLocalSession();
    setSignedInUI(false);
    showScreen("screenLanding");
    showToast("Logged out.");
  }

  async function saveProfile(profile) {
    if (!state.user) {
      throw new Error("No active user.");
    }

    const cleanProfile = {
      ...profile,
      updatedAtMs: Date.now()
    };

    if (FIREBASE.enabled && FIREBASE.db) {
      try {
        await FIREBASE.db.collection("profiles").doc(state.user.uid).set(cleanProfile, { merge: true });
      } catch (error) {
        console.warn("Firestore profile save failed. Using local cache.", error);
      }
    }

    saveLocalProfile(state.user.uid, cleanProfile);
    state.profile = cleanProfile;
    return cleanProfile;
  }

  async function loadProfile(uid) {
    if (!uid) return null;

    if (FIREBASE.enabled && FIREBASE.db) {
      try {
        const doc = await FIREBASE.db.collection("profiles").doc(uid).get();

        if (doc.exists) {
          const profile = doc.data();
          saveLocalProfile(uid, profile);
          return profile;
        }
      } catch (error) {
        console.warn("Firestore profile load failed. Using local cache.", error);
      }
    }

    return getLocalProfile(uid);
  }

  async function saveMatch(match) {
    if (!state.user) return;

    match.updatedAtMs = Date.now();

    const existingIndex = state.matches.findIndex((item) => item.id === match.id);

    if (existingIndex >= 0) {
      state.matches[existingIndex] = { ...match };
    } else {
      state.matches.unshift({ ...match });
    }

    state.matches = sortMatches(state.matches);
    saveLocalMatches(state.user.uid, state.matches);

    if (FIREBASE.enabled && FIREBASE.db) {
      try {
        await FIREBASE.db
          .collection("users")
          .doc(state.user.uid)
          .collection("matches")
          .doc(match.id)
          .set(match, { merge: true });
      } catch (error) {
        console.warn("Firestore match save failed. Using local cache.", error);
      }
    }
  }

  async function loadMatches(uid) {
    if (!uid) return [];

    if (FIREBASE.enabled && FIREBASE.db) {
      try {
        const snapshot = await FIREBASE.db
          .collection("users")
          .doc(uid)
          .collection("matches")
          .get();

        const matches = snapshot.docs.map((doc) => doc.data());
        const sorted = sortMatches(matches);
        saveLocalMatches(uid, sorted);
        state.matches = sorted;
        return sorted;
      } catch (error) {
        console.warn("Firestore match load failed. Using local cache.", error);
      }
    }

    const localMatches = sortMatches(getLocalMatches(uid));
    state.matches = localMatches;
    return localMatches;
  }

  function fillProfileForm(profile) {
    if (!profile) return;

    dom.profileName.value = profile.name || "";
    dom.profileAge.value = profile.age || "";
    dom.profileLocation.value = profile.location || "";
    dom.profileCounty.value = profile.county || "";
    dom.profileDistance.value = profile.distancePreference || "10";
    dom.profilePrivacy.value = profile.privacy || "distance";
    dom.profileBio.value = profile.bio || "";
    dom.dogName.value = profile.dog?.name || "";
    dom.dogBreed.value = profile.dog?.breed || "";
    dom.dogAge.value = profile.dog?.age || "";
    dom.dogSize.value = profile.dog?.size || "";
    dom.dogTemperament.value = profile.dog?.temperament || "";

    setSelectedValues('input[name="activities"]', profile.activities || []);
    updateProfilePreview();
  }

  function getCandidatePool() {
    const matchedIds = new Set((state.matches || []).map((match) => match.personId));
    return APP_DATA.demoCandidates.filter((candidate) => !matchedIds.has(candidate.id));
  }

  function renderCandidate() {
    const pool = getCandidatePool();

    if (!pool.length) {
      state.currentCandidate = null;
      dom.candidateAvatar.textContent = "🎉";
      dom.candidateName.textContent = "No more demo profiles";
      dom.candidateDistance.textContent = "You're caught up";
      dom.candidateMeta.textContent = "Add more demo data later";
      dom.candidateBio.textContent = "You’ve worked through the starter profile deck.";
      dom.candidateDogName.textContent = "More";
      dom.candidateDogBreed.textContent = "profiles";
      dom.candidateDogTemperament.textContent = "later";
      return;
    }

    if (state.currentCandidateIndex >= pool.length) {
      state.currentCandidateIndex = 0;
    }

    const candidate = pool[state.currentCandidateIndex];
    state.currentCandidate = candidate;

    dom.candidateAvatar.textContent = candidate.avatar || "🐶";
    dom.candidateName.textContent = candidate.name;
    dom.candidateDistance.textContent = `${candidate.distanceMiles} miles away`;
    dom.candidateMeta.textContent = `${candidate.age} • ${candidate.town}, ${candidate.county}`;
    dom.candidateBio.textContent = candidate.bio;
    dom.candidateDogName.textContent = candidate.dog.name;
    dom.candidateDogBreed.textContent = candidate.dog.breed;
    dom.candidateDogTemperament.textContent = candidate.dog.temperament;
  }

  function nextCandidate() {
    state.currentCandidateIndex += 1;
    renderCandidate();
  }

  function getActivityById(id) {
    return APP_DATA.activities.find((activity) => activity.id === id) || null;
  }

  function getDateById(id) {
    return APP_DATA.dateOptions.find((item) => item.id === id) || null;
  }

  function buildActivityOptions() {
    dom.activityOptions.innerHTML = "";

    APP_DATA.activities.forEach((activity) => {
      const node = dom.activityOptionTemplate.content.firstElementChild.cloneNode(true);
      node.querySelector(".activity-checkbox").value = activity.id;
      node.querySelector(".activity-title").textContent = activity.title;
      node.querySelector(".activity-description").textContent = activity.description;
      node.querySelector(".activity-distance").textContent = activity.distanceLabel;
      dom.activityOptions.appendChild(node);
    });
  }

  function buildDateOptions() {
    dom.dateOptions.innerHTML = "";

    APP_DATA.dateOptions.forEach((item) => {
      const node = dom.dateOptionTemplate.content.firstElementChild.cloneNode(true);
      node.querySelector(".date-checkbox").value = item.id;
      node.querySelector(".date-title").textContent = item.title;
      node.querySelector(".date-description").textContent = item.description;
      dom.dateOptions.appendChild(node);
    });
  }

  function renderActivityScreen(match) {
    state.currentMatch = match;
    setSelectedValues(".activity-checkbox", match.activityChoices || []);

    dom.activityMatchSummary.innerHTML = `
      <strong>${match.personName}</strong><br>
      Dog: ${match.personDogName}<br><br>
      Choose the kinds of dog date you would enjoy.<br>
      The app compares your picks with theirs.
    `;

    showScreen("screenActivities");
  }

  function renderDateScreen(match) {
    state.currentMatch = match;
    setSelectedValues(".date-checkbox", match.dateChoices || []);

    const sharedActivityNames = (match.activityOverlap || [])
      .map((id) => getActivityById(id)?.title)
      .filter(Boolean)
      .join(", ") || "None yet";

    dom.dateSummary.innerHTML = `
      <strong>${match.personName}</strong><br>
      Shared activity fit: ${sharedActivityNames}<br><br>
      Now choose dates that work for you.
    `;

    showScreen("screenDates");
  }

  function getMatchActionLabel(match) {
    switch (match.stage) {
      case "activities":
      case "activity_retry":
        return "Continue";
      case "dates":
      case "date_retry":
        return "Pick date";
      case "ready":
        return "View";
      default:
        return "Open";
    }
  }

  function renderMatches() {
    dom.matchesList.innerHTML = "";

    if (!state.matches.length) {
      dom.matchesList.innerHTML = `
        <div class="empty-state">
          <h3>No matches yet</h3>
          <p>When you start liking profiles, your matches will show here.</p>
        </div>
      `;
      return;
    }

    state.matches.forEach((match) => {
      const node = dom.matchCardTemplate.content.firstElementChild.cloneNode(true);

      node.querySelector(".match-card__avatar").textContent = match.avatar || "🐕";
      node.querySelector(".match-name").textContent = match.personName;
      node.querySelector(".match-meta").textContent = `${match.personDogName} • ${match.personArea}`;
      node.querySelector(".match-status").textContent = match.statusText || "Matched";

      const button = node.querySelector(".match-open-btn");
      button.textContent = getMatchActionLabel(match);

      button.addEventListener("click", () => {
        state.currentMatch = match;

        if (match.stage === "activities" || match.stage === "activity_retry") {
          renderActivityScreen(match);
          return;
        }

        if (match.stage === "dates" || match.stage === "date_retry") {
          renderDateScreen(match);
          return;
        }

        const activityNames = (match.activityOverlap || [])
          .map((id) => getActivityById(id)?.title)
          .filter(Boolean)
          .join(", ") || "No shared activity selected yet";

        const dateName = match.finalDate
          ? (getDateById(match.finalDate)?.title || match.finalDate)
          : "No final date yet";

        const suggestedActivity = match.suggestedActivity
          ? (getActivityById(match.suggestedActivity)?.title || match.suggestedActivity)
          : "Not chosen yet";

        openModal(`
          <h3>${match.personName}</h3>
          <p><strong>Dog:</strong> ${match.personDogName}</p>
          <p><strong>Status:</strong> ${match.statusText || "Matched"}</p>
          <p><strong>Shared activities:</strong> ${activityNames}</p>
          <p><strong>Suggested activity:</strong> ${suggestedActivity}</p>
          <p><strong>Suggested date:</strong> ${dateName}</p>
        `);
      });

      dom.matchesList.appendChild(node);
    });
  }

  function createMatchFromCandidate(candidate) {
    return {
      id: uuid(),
      personId: candidate.id,
      personName: candidate.name,
      personDogName: candidate.dog.name,
      personArea: `${candidate.town}, ${candidate.county}`,
      avatar: candidate.avatar || "🐕",
      theirActivityLikes: candidate.activityLikes || [],
      theirDateLikes: candidate.dateLikes || [],
      activityChoices: [],
      activityOverlap: [],
      dateChoices: [],
      dateOverlap: [],
      suggestedActivity: null,
      finalDate: null,
      stage: "activities",
      statusText: "Matched on profile. Activity step pending.",
      createdAtMs: Date.now(),
      updatedAtMs: Date.now()
    };
  }

  async function handleLike() {
    if (!state.profile) {
      showToast("Save your profile first.");
      showScreen("screenProfile");
      return;
    }

    const candidate = state.currentCandidate;
    if (!candidate) {
      showToast("No more demo profiles.");
      return;
    }

    if (!candidate.likeBack) {
      showToast(`You liked ${candidate.name}. No match yet.`);
      nextCandidate();
      return;
    }

    const match = createMatchFromCandidate(candidate);
    state.currentMatch = match;
    await saveMatch(match);
    renderMatches();
    renderActivityScreen(match);

    openModal(`
      <h3>It’s a match with ${candidate.name}</h3>
      <p>You both liked each other.</p>
      <p>Next step: compare dog-date activities instead of forcing a first chat.</p>
    `);

    nextCandidate();
  }

  function handlePass() {
    if (!state.currentCandidate) {
      showToast("No more demo profiles.");
      return;
    }

    showToast(`Passed on ${state.currentCandidate.name}.`);
    nextCandidate();
  }

  async function saveActivityChoices() {
    if (!state.currentMatch) {
      showToast("No active match selected.");
      return;
    }

    const selections = getSelectedValues(".activity-checkbox");

    if (!selections.length) {
      showToast("Choose at least one activity.");
      return;
    }

    const overlap = selections.filter((id) => state.currentMatch.theirActivityLikes.includes(id));
    state.currentMatch.activityChoices = selections;
    state.currentMatch.activityOverlap = overlap;
    state.currentMatch.suggestedActivity = overlap[0] || null;

    if (overlap.length) {
      const names = overlap.map((id) => getActivityById(id)?.title).filter(Boolean);
      state.currentMatch.stage = "dates";
      state.currentMatch.statusText = `Shared activity found: ${names.join(", ")}`;
      await saveMatch(state.currentMatch);
      renderMatches();
      renderDateScreen(state.currentMatch);

      openModal(`
        <h3>Shared dog-date fit found</h3>
        <p>You both liked: <strong>${names.join(", ")}</strong></p>
        <p>Next step: compare your availability.</p>
      `);
    } else {
      state.currentMatch.stage = "activity_retry";
      state.currentMatch.statusText = "Matched on profile, but no shared activity yet.";
      await saveMatch(state.currentMatch);
      renderMatches();
      showScreen("screenMatches");

      openModal(`
        <h3>No shared activity yet</h3>
        <p>You matched on attraction, but not on the activity step.</p>
        <p>You can reopen this match later and try different activity choices.</p>
      `);
    }
  }

  async function saveDateChoices() {
    if (!state.currentMatch) {
      showToast("No active match selected.");
      return;
    }

    const selections = getSelectedValues(".date-checkbox");

    if (!selections.length) {
      showToast("Choose at least one date option.");
      return;
    }

    const overlap = selections.filter((id) => state.currentMatch.theirDateLikes.includes(id));
    state.currentMatch.dateChoices = selections;
    state.currentMatch.dateOverlap = overlap;

    if (overlap.length) {
      const finalDate = overlap[0];
      const finalDateLabel = getDateById(finalDate)?.title || finalDate;
      const activityLabel = getActivityById(state.currentMatch.suggestedActivity)?.title || "Dog date activity";

      state.currentMatch.finalDate = finalDate;
      state.currentMatch.stage = "ready";
      state.currentMatch.statusText = `Ready to propose: ${activityLabel} on ${finalDateLabel}`;

      await saveMatch(state.currentMatch);
      renderMatches();
      showScreen("screenMatches");

      openModal(`
        <h3>Date plan ready</h3>
        <p><strong>Suggested first date:</strong></p>
        <p>${activityLabel}</p>
        <p>${finalDateLabel}</p>
        <p>This is the point where a real app could unlock chat, booking links, or confirmation buttons.</p>
      `);
    } else {
      state.currentMatch.stage = "date_retry";
      state.currentMatch.statusText = "Matched on activity, but no shared date yet.";

      await saveMatch(state.currentMatch);
      renderMatches();
      showScreen("screenMatches");

      openModal(`
        <h3>No shared date yet</h3>
        <p>You matched on the activity step, but not on availability.</p>
        <p>You can reopen this match later and try different date choices.</p>
      `);
    }
  }

  async function handleSignupSubmit(event) {
    event.preventDefault();

    const name = dom.signupName.value.trim();
    const email = dom.signupEmail.value.trim();
    const password = dom.signupPassword.value.trim();

    if (!name || !email || !password) {
      showToast("Please fill in all sign-up fields.");
      return;
    }

    try {
      await createAccount(name, email, password);
      setSignedInUI(true);
      state.profile = await loadProfile(state.user.uid);
      await loadMatches(state.user.uid);
      renderMatches();

      dom.signupForm.reset();
      showToast("Account created.");
      showScreen("screenProfile");
    } catch (error) {
      showToast(error.message || "Could not create account.");
    }
  }

  async function handleLoginSubmit(event) {
    event.preventDefault();

    const email = dom.loginEmail.value.trim();
    const password = dom.loginPassword.value.trim();

    if (!email || !password) {
      showToast("Please enter your email and password.");
      return;
    }

    try {
      await loginUser(email, password);
      setSignedInUI(true);

      state.profile = await loadProfile(state.user.uid);
      await loadMatches(state.user.uid);
      renderMatches();

      dom.loginForm.reset();
      showToast("Logged in.");

      if (state.profile) {
        fillProfileForm(state.profile);
        renderCandidate();
        showScreen("screenBrowse");
      } else {
        showScreen("screenProfile");
      }
    } catch (error) {
      showToast(error.message || "Login failed.");
    }
  }

  async function handleProfileSubmit(event) {
    event.preventDefault();

    if (!state.user) {
      showToast("Create an account or log in first.");
      showScreen("screenLanding");
      return;
    }

    const profile = {
      uid: state.user.uid,
      email: state.user.email,
      name: dom.profileName.value.trim(),
      age: dom.profileAge.value.trim(),
      location: dom.profileLocation.value.trim(),
      county: dom.profileCounty.value.trim(),
      distancePreference: dom.profileDistance.value,
      privacy: dom.profilePrivacy.value,
      bio: dom.profileBio.value.trim(),
      activities: getSelectedValues('input[name="activities"]'),
      photos: {
        profileFilename: dom.profilePhoto.files?.[0]?.name || null,
        dogVerificationFilename: dom.dogVerificationPhoto.files?.[0]?.name || null
      },
      dog: {
        name: dom.dogName.value.trim(),
        breed: dom.dogBreed.value.trim(),
        age: dom.dogAge.value.trim(),
        size: dom.dogSize.value,
        temperament: dom.dogTemperament.value.trim()
      }
    };

    if (
      !profile.name ||
      !profile.age ||
      !profile.location ||
      !profile.bio ||
      !profile.dog.name ||
      !profile.dog.breed
    ) {
      showToast("Fill in the key profile and dog details first.");
      return;
    }

    try {
      await saveProfile(profile);
      updateProfilePreview();
      renderCandidate();
      showToast("Profile saved.");
      showScreen("screenBrowse");
    } catch (error) {
      showToast(error.message || "Could not save profile.");
    }
  }

  function bindPreviewInputs() {
    [
      dom.profileName,
      dom.profileAge,
      dom.profileLocation,
      dom.profileBio,
      dom.dogName,
      dom.dogBreed,
      dom.dogSize,
      dom.dogTemperament
    ].forEach((input) => {
      input.addEventListener("input", updateProfilePreview);
    });
  }

  function bindEvents() {
    dom.showSignupBtn.addEventListener("click", () => {
      dom.signupCard.classList.toggle("hidden");
      dom.loginCard.classList.add("hidden");
    });

    dom.showLoginBtn.addEventListener("click", () => {
      dom.loginCard.classList.toggle("hidden");
      dom.signupCard.classList.add("hidden");
    });

    dom.signupForm.addEventListener("submit", handleSignupSubmit);
    dom.loginForm.addEventListener("submit", handleLoginSubmit);
    dom.profileForm.addEventListener("submit", handleProfileSubmit);

    bindPreviewInputs();

    dom.passBtn.addEventListener("click", handlePass);
    dom.likeBtn.addEventListener("click", handleLike);
    dom.saveActivityChoicesBtn.addEventListener("click", saveActivityChoices);
    dom.saveDateChoicesBtn.addEventListener("click", saveDateChoices);

    dom.navHomeBtn.addEventListener("click", () => {
      if (state.user && state.profile) {
        renderCandidate();
        showScreen("screenBrowse");
      } else if (state.user) {
        showScreen("screenProfile");
      } else {
        showScreen("screenLanding");
      }
    });

    dom.navBrowseBtn.addEventListener("click", () => {
      renderCandidate();
      showScreen("screenBrowse");
    });

    dom.navProfileBtn.addEventListener("click", () => {
      showScreen("screenProfile");
    });

    dom.navMatchesBtn.addEventListener("click", () => {
      renderMatches();
      showScreen("screenMatches");
    });

    dom.logoutBtn.addEventListener("click", logoutUser);

    dom.closeModalBtn.addEventListener("click", closeModal);
    dom.modalOverlay.addEventListener("click", (event) => {
      if (event.target === dom.modalOverlay) {
        closeModal();
      }
    });
  }

  async function restoreDemoSession() {
    const cachedUser = getLocalSession();

    if (!cachedUser) {
      setSignedInUI(false);
      showScreen("screenLanding");
      return;
    }

    state.user = cachedUser;
    setSignedInUI(true);

    state.profile = await loadProfile(cachedUser.uid);
    await loadMatches(cachedUser.uid);
    renderMatches();

    if (state.profile) {
      fillProfileForm(state.profile);
      renderCandidate();
      showScreen("screenBrowse");
    } else {
      showScreen("screenProfile");
    }
  }

  async function restoreFirebaseSession() {
    return new Promise((resolve) => {
      let unsub = null;

      const finish = async (user) => {
        if (typeof unsub === "function") unsub();

        if (!user) {
          state.user = null;
          state.profile = null;
          state.matches = [];
          setSignedInUI(false);
          showScreen("screenLanding");
          resolve();
          return;
        }

        state.user = mapFirebaseUser(user);
        setLocalSession(state.user);
        setSignedInUI(true);

        state.profile = await loadProfile(state.user.uid);
        await loadMatches(state.user.uid);
        renderMatches();

        if (state.profile) {
          fillProfileForm(state.profile);
          renderCandidate();
          showScreen("screenBrowse");
        } else {
          showScreen("screenProfile");
        }

        resolve();
      };

      try {
        unsub = FIREBASE.auth.onAuthStateChanged(
          async (user) => {
            await finish(user);
          },
          async (error) => {
            console.warn("Auth restore failed. Falling back to landing screen.", error);
            setSignedInUI(false);
            showScreen("screenLanding");
            resolve();
          }
        );
      } catch (error) {
        console.warn("Firebase auth listener failed. Falling back to demo restore.", error);
        restoreDemoSession().then(resolve);
      }
    });
  }

  async function restoreSession() {
    if (FIREBASE.enabled && FIREBASE.auth) {
      await restoreFirebaseSession();
      return;
    }

    await restoreDemoSession();
  }

  function init() {
    setModeBadge();
    buildActivityOptions();
    buildDateOptions();
    bindEvents();
    updateProfilePreview();
    restoreSession();

    console.log(FIREBASE.enabled ? "Running in Firebase mode." : "Running in local demo mode.");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
