:root{
  --bg:#0f1114;
  --panel:#171b21;
  --panel-2:#20262e;
  --line:#313a45;
  --text:#f3f5f7;
  --muted:#a8b2bd;
  --gold:#e1b866;
  --green:#35c08d;
  --red:#f36e6e;
  --blue:#5aa7ff;
  --shadow:0 18px 40px rgba(0,0,0,.28);
  --radius:22px;
  --radius-sm:14px;
  --max:1200px;
}

*{
  box-sizing:border-box;
}

html, body{
  margin:0;
  padding:0;
  background:
    radial-gradient(circle at top right, rgba(90,167,255,.10), transparent 35%),
    radial-gradient(circle at top left, rgba(225,184,102,.08), transparent 35%),
    var(--bg);
  color:var(--text);
  font-family:"Inter", Arial, sans-serif;
  min-height:100%;
}

body{
  min-height:100vh;
}

button,
input,
textarea,
select{
  font:inherit;
}

button{
  cursor:pointer;
}

img{
  max-width:100%;
  display:block;
}

.hidden{
  display:none !important;
}

#appShell{
  max-width:var(--max);
  margin:0 auto;
  padding:20px;
}

.topbar{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:20px;
  margin-bottom:20px;
  flex-wrap:wrap;
}

.brand{
  display:flex;
  align-items:center;
  gap:14px;
}

.brand__icon{
  width:56px;
  height:56px;
  border-radius:18px;
  display:grid;
  place-items:center;
  font-size:28px;
  background:linear-gradient(135deg, var(--gold), #f4d191);
  color:#1a1a1a;
  box-shadow:var(--shadow);
}

.brand h1{
  margin:0;
  font-size:1.3rem;
}

.brand p{
  margin:4px 0 0;
  color:var(--muted);
  font-size:.95rem;
}

.topbar__actions{
  display:flex;
  gap:10px;
  flex-wrap:wrap;
}

.card{
  background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01)), var(--panel);
  border:1px solid var(--line);
  border-radius:var(--radius);
  box-shadow:var(--shadow);
}

.screen{
  display:none;
}

.screen.active{
  display:block;
}

.hero{
  padding:28px;
  display:grid;
  grid-template-columns:1.35fr .8fr;
  gap:24px;
  align-items:center;
}

.hero__text h2{
  margin:10px 0 12px;
  font-size:2.15rem;
  line-height:1.1;
}

.hero__text p{
  margin:0;
  color:var(--muted);
  line-height:1.65;
  max-width:62ch;
}

.hero__actions{
  display:flex;
  gap:12px;
  margin-top:22px;
  flex-wrap:wrap;
}

.hero__panel{
  display:grid;
  gap:12px;
}

.mini-card{
  background:var(--panel-2);
  border:1px solid var(--line);
  border-radius:18px;
  padding:18px;
}

.mini-card h3{
  margin:0 0 8px;
  color:var(--gold);
  font-size:1.2rem;
}

.mini-card p{
  margin:0;
  color:var(--muted);
}

.auth-grid{
  margin-top:20px;
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px;
}

.auth-card{
  padding:22px;
}

.auth-card h3{
  margin-top:0;
}

.form-stack{
  display:grid;
  gap:14px;
}

.form-stack label,
.form-grid label{
  display:grid;
  gap:8px;
}

input,
textarea,
select{
  width:100%;
  background:#0d1014;
  color:var(--text);
  border:1px solid var(--line);
  border-radius:14px;
  padding:13px 14px;
  outline:none;
}

input:focus,
textarea:focus,
select:focus{
  border-color:var(--blue);
  box-shadow:0 0 0 3px rgba(90,167,255,.14);
}

textarea{
  resize:vertical;
}

.primary-btn,
.secondary-btn,
.ghost-btn,
.success-btn,
.danger-btn{
  border:none;
  border-radius:14px;
  padding:13px 18px;
  font-weight:700;
  transition:transform .15s ease, opacity .15s ease, background .15s ease;
}

.primary-btn:hover,
.secondary-btn:hover,
.ghost-btn:hover,
.success-btn:hover,
.danger-btn:hover{
  transform:translateY(-1px);
}

.primary-btn{
  background:linear-gradient(135deg, var(--gold), #f6d48d);
  color:#141414;
}

.secondary-btn{
  background:#2b3340;
  color:var(--text);
  border:1px solid #435062;
}

.ghost-btn{
  background:transparent;
  color:var(--text);
  border:1px solid var(--line);
}

.success-btn{
  background:var(--green);
  color:#08150f;
}

.danger-btn{
  background:var(--red);
  color:#220909;
}

.pill{
  display:inline-flex;
  align-items:center;
  gap:8px;
  border-radius:999px;
  border:1px solid rgba(225,184,102,.35);
  background:rgba(225,184,102,.10);
  color:var(--gold);
  padding:7px 12px;
  font-size:.84rem;
  font-weight:700;
}

.demo-note{
  margin-top:18px;
  padding:14px 16px;
  border-radius:16px;
  background:rgba(90,167,255,.08);
  border:1px solid rgba(90,167,255,.22);
  color:#dcecff;
  line-height:1.5;
}

.screen-header{
  margin:8px 0 18px;
}

.screen-header h2{
  margin:0 0 6px;
  font-size:1.8rem;
}

.screen-header p{
  margin:0;
  color:var(--muted);
}

.profile-layout{
  display:grid;
  grid-template-columns:1.25fr .75fr;
  gap:20px;
}

.form-card,
.preview-card{
  padding:22px;
}

.form-card h3,
.preview-card h3{
  margin-top:0;
}

.form-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:14px;
  margin-bottom:20px;
}

.full-width{
  grid-column:1 / -1;
}

.checkbox-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px;
  padding:12px;
  border-radius:16px;
  border:1px solid var(--line);
  background:#0e1217;
}

.checkbox-grid label{
  display:flex;
  align-items:center;
  gap:10px;
}

.help-text,
.muted{
  color:var(--muted);
  font-size:.95rem;
}

.form-actions{
  display:flex;
  gap:12px;
  margin-top:16px;
  flex-wrap:wrap;
}

.profile-preview{
  display:grid;
  gap:14px;
}

.avatar-circle{
  width:90px;
  height:90px;
  border-radius:50%;
  display:grid;
  place-items:center;
  background:linear-gradient(135deg, #2a3340, #1b2129);
  border:1px solid var(--line);
  font-size:34px;
}

.profile-preview h4{
  margin:0;
  font-size:1.35rem;
}

.profile-preview p{
  margin:0;
  color:var(--muted);
  line-height:1.55;
}

.dog-panel{
  background:var(--panel-2);
  border:1px solid var(--line);
  border-radius:18px;
  padding:16px;
}

.dog-panel h5{
  margin:0 0 6px;
  font-size:1.05rem;
}

.browse-layout,
.activity-layout,
.date-layout{
  display:grid;
  grid-template-columns:1.1fr .7fr;
  gap:20px;
}

.swipe-card{
  padding:20px;
}

.swipe-card__content{
  display:grid;
  gap:18px;
}

.swipe-photo{
  width:100%;
  min-height:300px;
  border-radius:20px;
  background:
    linear-gradient(135deg, rgba(225,184,102,.17), rgba(90,167,255,.14)),
    var(--panel-2);
  border:1px solid var(--line);
  display:grid;
  place-items:center;
  font-size:90px;
}

.swipe-body{
  display:grid;
  gap:10px;
}

.swipe-topline{
  display:flex;
  justify-content:space-between;
  gap:14px;
  align-items:flex-start;
  flex-wrap:wrap;
}

.swipe-topline h3{
  margin:0;
  font-size:1.6rem;
}

.swipe-body p{
  margin:0;
  color:var(--muted);
  line-height:1.6;
}

.dog-chip-list{
  display:flex;
  gap:10px;
  flex-wrap:wrap;
}

.dog-chip{
  display:inline-flex;
  align-items:center;
  padding:9px 12px;
  border-radius:999px;
  background:#0d1014;
  border:1px solid var(--line);
  color:var(--text);
  font-size:.92rem;
}

.swipe-actions{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:12px;
  margin-top:18px;
}

.progress-card,
.summary-box{
  padding:20px;
}

.progress-card h3{
  margin-top:0;
}

.progress-list{
  margin:0;
  padding-left:20px;
  color:var(--muted);
  line-height:1.9;
}

.activity-list,
.date-list{
  display:grid;
  gap:12px;
  margin-top:16px;
}

.activity-item,
.date-item{
  display:flex;
  gap:14px;
  align-items:flex-start;
  padding:16px;
  border-radius:18px;
  border:1px solid var(--line);
  background:#0d1014;
}

.activity-item__body,
.date-item__body{
  display:grid;
  gap:6px;
}

.activity-item__body p,
.date-item__body p{
  margin:0;
  color:var(--muted);
  line-height:1.5;
}

.activity-distance{
  color:var(--gold);
  font-size:.9rem;
}

.summary-box{
  background:var(--panel-2);
  border:1px solid var(--line);
  border-radius:18px;
  min-height:150px;
  line-height:1.65;
  color:var(--muted);
}

.matches-list{
  display:grid;
  gap:14px;
}

.empty-state{
  padding:28px;
  text-align:center;
}

.empty-state h3{
  margin:0 0 8px;
}

.empty-state p{
  margin:0;
  color:var(--muted);
}

.match-card{
  display:grid;
  grid-template-columns:auto 1fr auto;
  gap:16px;
  align-items:center;
  padding:16px;
  border-radius:18px;
  background:var(--panel-2);
  border:1px solid var(--line);
}

.match-card__avatar{
  width:64px;
  height:64px;
  border-radius:16px;
  display:grid;
  place-items:center;
  font-size:28px;
  background:#0e1217;
  border:1px solid var(--line);
}

.match-card__body{
  display:grid;
  gap:4px;
}

.match-card__body h3{
  margin:0;
}

.match-card__body p{
  margin:0;
  color:var(--muted);
}

.toast{
  position:fixed;
  left:50%;
  bottom:20px;
  transform:translateX(-50%);
  background:#10161d;
  color:#fff;
  border:1px solid var(--line);
  border-radius:14px;
  padding:12px 16px;
  z-index:80;
  box-shadow:var(--shadow);
  max-width:min(90vw, 520px);
  text-align:center;
}

.modal-overlay{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.65);
  display:grid;
  place-items:center;
  padding:20px;
  z-index:90;
}

.modal{
  width:min(100%, 620px);
  padding:24px;
  position:relative;
}

.modal__close{
  position:absolute;
  top:12px;
  right:12px;
  width:40px;
  height:40px;
  border-radius:12px;
  border:1px solid var(--line);
  background:#10151b;
  color:var(--text);
  font-size:24px;
}

.modal h3{
  margin-top:0;
}

.modal p,
.modal li{
  color:var(--muted);
  line-height:1.6;
}

@media (max-width: 980px){
  .hero,
  .auth-grid,
  .profile-layout,
  .browse-layout,
  .activity-layout,
  .date-layout{
    grid-template-columns:1fr;
  }
}

@media (max-width: 680px){
  #appShell{
    padding:14px;
  }

  .hero{
    padding:20px;
  }

  .hero__text h2{
    font-size:1.75rem;
  }

  .form-grid{
    grid-template-columns:1fr;
  }

  .checkbox-grid{
    grid-template-columns:1fr;
  }

  .match-card{
    grid-template-columns:1fr;
    text-align:left;
  }

  .swipe-topline{
    flex-direction:column;
    align-items:flex-start;
  }

  .swipe-actions{
    grid-template-columns:1fr;
  }
}
