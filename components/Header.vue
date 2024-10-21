<template>
  <header class="header">
    <div class="logo">
      <h1>Association de Culture et de Loisir pour les Aveugles</h1>
    </div>
    <nav class="nav-menu">
      <router-link to="/login" class="login-button">
        <span class="icon">🔑</span> Connexion
      </router-link>
      <router-link to="/visiteur1" class="login-button">
        <span class="icon">🔍</span> Chercher 
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    increaseTextSize() {
      document.body.style.fontSize = "larger";
    },
    decreaseTextSize() {
      document.body.style.fontSize = "smaller";
    },
    toggleContrast() {
      document.body.classList.toggle("high-contrast");
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333; /* Changement de la couleur d'arrière-plan en gris foncé */
  padding: 1rem;
  color: white;
}

.logo h1 {
  font-size: 1.5rem;
  margin: 0;
  color: white;
}

.nav-menu {
  display: flex;
}

.login-button {
  background-color: #004080;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 1rem;
  text-decoration: none; /* Remove underline from link */
}

.login-button .icon {
  margin-right: 0.5rem; /* Espacement entre l'icône et le texte */
}

.accessibility-options button {
  background-color: #f1f1f1;
  color: #004080;
  border: none;
  padding: 0.5rem;
  margin-left: 0.5rem;
  cursor: pointer;
}

.accessibility-options button:hover {
  background-color: #ddd;
}

.high-contrast {
  background-color: #000;
  color: yellow;
}
</style>
