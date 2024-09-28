<template>
  <header class="header">
    <div class="logo">
      <h1>Association de Culture et de Loisir pour les Aveugles</h1>
    </div>
    <nav class="nav-menu">
      <ul>
        <li><a href="/">Accueil</a></li>
        <li><a href="/activites">Activités</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/about">À propos</a></li>
      </ul>
    </nav>
    <div class="accessibility-options">
      <button @click="increaseTextSize">A+</button>
      <button @click="decreaseTextSize">A-</button>
      <button @click="toggleContrast">Contraste élevé</button>
    </div>
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
  background-color: #004080;
  padding: 1rem;
  color: white;
}

.logo h1 {
  font-size: 1.5rem;
  margin: 0;
}

.nav-menu ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.nav-menu a {
  color: white;
  text-decoration: none;
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
