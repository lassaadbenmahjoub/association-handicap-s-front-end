<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <!-- Bouton à droite pour ajouter une nouvelle publication -->
        <v-btn
          color="primary"
          @click="redirectToAddPublication"
          class="add-publication-btn"
        >
          Ajouter une Publication
        </v-btn>
      </v-col>
    </v-row>

    <!-- Affichage des publications -->
    <v-row justify="center" v-if="publications.length">
      <v-col
        v-for="publication in publications"
        :key="publication.id"
        cols="12"
        md="8"
        lg="8"
      >
        <v-card class="publication-card">
          <v-col cols="12">
            <!-- Affichage du nom de l'utilisateur -->
            <h1 class="user-name">{{ publication.user.name }}</h1>
          </v-col>
          <v-card-title>{{ publication.titre }}</v-card-title>
          <v-card-text>
            <p>{{ publication.contenu }}</p>

            <!-- Affichage du PDF -->
            <!-- Affichage du PDF -->
            <div v-if="publication.pdf">
              <a
                :href="getFileUrl(publication.pdf)"
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir PDF
              </a>
            </div>

            <!-- Affichage de la photo -->
            <div v-if="publication.photo">
              <v-img
                :src="getFileUrl(publication.photo)"
                alt="photo"
                height="200px"
              ></v-img>
            </div>

            <!-- Affichage de la vidéo -->
            <div v-if="publication.video">
              <video width="100%" controls>
                <source :src="getFileUrl(publication.video)" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </v-card-text>

          <!-- Boutons Modifier et Supprimer (Affichés seulement si l'utilisateur connecté est l'auteur) -->
          <v-card-actions
            v-if="currentUser && currentUser.id === publication.user.id"
          >
            <v-btn color="success" @click="openEditDialog(publication)"
              >Modifier</v-btn
            >
            <v-btn color="error" @click="confirmDelete(publication.id)"
              >Supprimer</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12">
        <p>Aucune publication trouvée.</p>
      </v-col>
    </v-row>

    <!-- Dialog pour Modifier la Publication -->
    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Modifier Publication</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Titre"
                v-model="editedPublication.titre"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                label="Contenu"
                v-model="editedPublication.contenu"
              ></v-textarea>
            </v-col>

            <v-col cols="12">
              <v-file-input
                label="Modifier PDF"
                accept="application/pdf"
                v-model="editedFiles.pdf"
              />
            </v-col>

            <v-col cols="12">
              <v-file-input
                label="Modifier Photo"
                accept="image/*"
                v-model="editedFiles.photo"
              />
            </v-col>

            <v-col cols="12">
              <v-file-input
                label="Modifier Vidéo"
                accept="video/*"
                v-model="editedFiles.video"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="closeEditDialog">
            Annuler
          </v-btn>
          <v-btn color="blue darken-1" text @click="updatePublication">
            Enregistrer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog pour la confirmation de suppression -->
    <v-dialog v-model="deleteDialog" max-width="400px">
      <v-card>
        <v-card-title class="headline">Confirmation</v-card-title>
        <v-card-text>
          Êtes-vous sûr de vouloir supprimer cette publication ?
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="closeDeleteDialog"
            >Annuler</v-btn
          >
          <v-btn color="red darken-1" text @click="deletePublication"
            >Supprimer</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      publications: [], // Stockage des publications
      editDialog: false, // Pour afficher le dialog d'édition
      deleteDialog: false, // Pour afficher le dialog de confirmation de suppression
      editedPublication: {}, // Stocker les données de la publication en cours d'édition
      editedFiles: { pdf: null, photo: null, video: null }, // Stockage des fichiers modifiés
      publicationToDelete: null, // Stocker l'ID de la publication à supprimer
      currentUser: null, // Stocker les informations de l'utilisateur connecté
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  mounted() {
    this.fetchPublications();
    this.fetchCurrentUser();
  },
  methods: {
    redirectToAddPublication() {
      this.$router.push("/publications");
    },
    handleFileChange(fileType) {
      if (this.editedFiles[fileType]) {
        this.editedPublication[fileType] = this.editedFiles[fileType];
      }
    },

    // Récupération des publications
    async fetchPublications() {
      try {
        const response = await this.$axios.get("/api/publications");
        this.publications = response.data.publications;
      } catch (error) {
        this.toast.error("Erreur lors de la récupération des publications.");
      }
    },

    // Récupération des informations de l'utilisateur connecté
    async fetchCurrentUser() {
      try {
        const response = await this.$axios.get("/api/user");
        this.currentUser = response.data.user;
      } catch (error) {
        this.toast.error(
          "Erreur lors de la récupération des informations de l'utilisateur."
        );
      }
    },

    // Ouvrir le dialog d'édition
    openEditDialog(publication) {
      this.editedPublication = { ...publication }; // Copier les données
      this.editedFiles = { pdf: null, photo: null, video: null }; // Réinitialiser les fichiers
      this.editDialog = true;
    },

    // Fermer le dialog d'édition
    closeEditDialog() {
      this.editDialog = false;
      this.editedPublication = {};
      this.editedFiles = { pdf: null, photo: null, video: null };
    },

    // Confirmation avant suppression
    confirmDelete(publicationId) {
      this.publicationToDelete = publicationId;
      this.deleteDialog = true;
    },

    // Fermer le dialog de confirmation de suppression
    closeDeleteDialog() {
      this.deleteDialog = false;
      this.publicationToDelete = null;
    },

    // Supprimer la publication
    async deletePublication() {
      try {
        await this.$axios.delete(
          `/api/publications/${this.publicationToDelete}`
        );
        this.publications = this.publications.filter(
          (publication) => publication.id !== this.publicationToDelete
        );
        this.toast.success("Publication supprimée avec succès.");
        this.closeDeleteDialog();
      } catch (error) {
        this.toast.error("Erreur lors de la suppression de la publication.");
      }
    },

    // Mettre à jour la publication
    async updatePublication() {
      const formData = new FormData();
      formData.append("titre", this.editedPublication.titre);
      formData.append("contenu", this.editedPublication.contenu);

      if (this.editedFiles.pdf) {
        formData.append("pdf", this.editedFiles.pdf);
      }
      if (this.editedFiles.photo) {
        formData.append("photo", this.editedFiles.photo);
      }
      if (this.editedFiles.video) {
        formData.append("video", this.editedFiles.video);
      }

      try {
        const response = await this.$axios.put(
          `/api/publications/${this.editedPublication.id}`,
          formData
        );

        // Mettre à jour la publication dans la liste
        const index = this.publications.findIndex(
          (pub) => pub.id === this.editedPublication.id
        );
        if (index !== -1) {
          this.$set(this.publications, index, response.data.publication);
        }

        this.toast.success("Publication mise à jour avec succès.");
        this.closeEditDialog();
      } catch (error) {
        this.toast.error("Erreur lors de la mise à jour de la publication.");
      }
    },

    // Générer l'URL du fichier
    getFileUrl(filePath) {
      return `http://127.0.0.1:8000/storage/${filePath.replace("public/", "")}`;
    },

    // Télécharger le fichier
    downloadFile(filePath, fileType) {
      const link = document.createElement("a");
      link.href = this.getFileUrl(filePath);
      link.download = `${fileType}-${Date.now()}`;
      link.click();
    },
  },
};
</script>

<style scoped>
.page-title {
  margin-bottom: 30px;
}

.add-publication-btn {
  margin-left: auto; /* Aligner à droite */
}

.publication-card {
  margin-bottom: 20px;
}

.user-name {
  color: #888;
}

.d-flex {
  display: flex;
}

.justify-space-between {
  justify-content: space-between;
}

.align-center {
  align-items: center;
}
.btn-large {
  display: inline-block;
  padding: 10px 20px;
  background-color: #1976d2; /* couleur du bouton (bleu primaire Vuetify) */
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  font-size: 16px;
}

.btn-large:hover {
  background-color: #1565c0; /* couleur au survol */
}
</style>
