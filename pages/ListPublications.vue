<template>
  <v-container>
    <v-row>
      
    </v-row>
    <v-row>
      <v-col cols="12">
        <h1>Mes Publications</h1>
      </v-col>
    </v-row>

    <!-- Affichage des publications -->
    <v-row v-if="publications.length">
      <v-col
        v-for="publication in publications"
        :key="publication.id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card>
          <v-col cols="12">
            <!-- Affichage du nom de l'utilisateur -->
            <h1>Publications de {{ publication.user.name }}</h1>
          </v-col>
          <v-card-title>{{ publication.titre }}</v-card-title>
          <v-card-text>
            <p>{{ publication.contenu }}</p>

            <!-- Affichage du PDF -->
            <div v-if="publication.pdf">
              <v-btn
                color="primary"
                @click="downloadFile(publication.pdf, 'pdf')"
                >Télécharger PDF</v-btn
              >
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

          <!-- Boutons Modifier et Supprimer -->
          <v-card-actions>
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
          <v-text-field
            label="Titre"
            v-model="editedPublication.titre"
          ></v-text-field>
          <v-textarea
            label="Contenu"
            v-model="editedPublication.contenu"
          ></v-textarea>

          <v-file-input
            label="Modifier PDF"
            accept="application/pdf"
            v-model="editedFiles.pdf"
          />
          <v-file-input
            label="Modifier Photo"
            accept="image/*"
            v-model="editedFiles.photo"
          />
          <v-file-input
            label="Modifier Vidéo"
            accept="video/*"
            v-model="editedFiles.video"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="closeEditDialog"
            >Annuler</v-btn
          >
          <v-btn color="blue darken-1" text @click="updatePublication"
            >Enregistrer</v-btn
          >
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
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  mounted() {
    this.fetchPublications(); // Appel à la récupération des publications quand le composant est monté
  },
  methods: {
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
        console.log("aaaaaa",this.publications)
      } catch (error) {
        this.toast.error("Erreur lors de la récupération des publications.");
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
          // Utilisez Vue.set si vous êtes encore sur Vue 2.x, sinon utilisez `this.publications.splice`
          this.$set(this.publications, index, response.data.publication);
        }

        this.toast.success("Publication mise à jour avec succès.");
        this.closeEditDialog();
      } catch (error) {
        
      }
    },

    // Générer l'URL du fichier
    getFileUrl(filePath) {
      return `http://127.0.0.1:8000/storage/${filePath.replace("public/", "")}`;
    },

    // Télécharger le fichier
    async downloadFile(filePath, fileType) {
      try {
        const response = await this.$axios.get(
          `http://127.0.0.1:8000/storage/${filePath.replace("public/", "")}`,
          { responseType: "blob" }
        );
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute("download", `fichier.${fileType}`);
        document.body.appendChild(fileLink);
        fileLink.click();
      } catch (error) {
        //this.toast.error("Erreur lors du téléchargement du fichier.");
      }
    },
  },
};
</script>

<style scoped>
.v-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

v-card {
  margin-bottom: 20px;
}
</style>
