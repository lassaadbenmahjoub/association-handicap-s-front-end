<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Contact</h3>
        <p class="contact-info">Adresse : <span class="address">23 Rue des Lumières, Ville ABC</span></p>
        <p class="contact-info">Téléphone : <span class="phone">01 23 45 67 89</span></p>
        <p class="contact-info">Email : <a href="mailto:info@aveugles-loisir.org">info@aveugles-loisir.org</a></p>
      </div>
      <div class="footer-section">
        <h3>Liens Utiles</h3>
        <ul>
          <li><a href="/adhesion">Devenir Membre</a></li>
          <li><a href="/activites">Nos Activités</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/mentions-legales">Mentions Légales</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Suivez-nous</h3>
        <ul class="social-media">
          <li><a href="#"><i class="fab fa-facebook"></i> Facebook</a></li>
          <li><a href="#"><i class="fab fa-twitter"></i> Twitter</a></li>
          <li><a href="#"><i class="fab fa-instagram"></i> Instagram</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 Association de Culture et de Loisir pour les Aveugles - Tous droits réservés</p>
    </div>
    <img src="@/assets/images/login.jpg" alt="Image Description" class="footer-image" />
  </footer>
</template>

<script>
export default {
  // Logic specific to the footer if needed
}
</script>

<style scoped>
.footer {
  background-color: #ffffff; /* Couleur de fond blanche */
  color: #000000; /* Couleur du texte noir */
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; /* Pour le positionnement de l'image */
}

.footer-content {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1200px;
}

.footer-section {
  flex: 1;
  padding: 0 1rem;
}

.footer-section h3 {
  margin-bottom: 1rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section a {
  color: #000000; /* Couleur du lien noir */
  text-decoration: none;
}

.footer-section a:hover {
  text-decoration: underline;
}

.social-media {
  display: flex;
  gap: 0.5rem;
}

.social-media i {
  margin-right: 0.5rem;
}

.footer-bottom {
  margin-top: -1rem;
  border-top: 1px solid #eee;
  padding-top: 1rem;
  text-align: center;
  width: 100%;
}

.contact-info {
  color: green; /* Couleur verte pour les informations de contact */
}

.address {
  color: #000000; /* Couleur noire pour l'adresse */
}

.phone {
  color: #000000; /* Couleur noire pour le téléphone */
}

/* Style pour l'image dans le footer */
.footer-image {
  position: absolute; 
  bottom: 40px; 
  right: 50px; 
  width: 280px;
  height: 250px;
}
</style>
