<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>Liste des Membres</h2>
        <v-data-table
          :headers="headers"
          :items="members"
          item-value="id"
          class="elevation-1"
        >
          <!-- Slot pour les actions (éditer/supprimer) -->
          <template v-slot:item.actions="{ item }">
            <v-btn icon @click="openEditDialog(item)">
              <v-icon>mdi-pencil</v-icon> <!-- Icône d'édition -->
            </v-btn>
            <v-btn icon @click="confirmDeleteMember(item)">
              <v-icon>mdi-delete</v-icon> <!-- Icône de suppression -->
            </v-btn>
          </template>
        </v-data-table>

        <!-- Boîte de dialogue pour éditer un membre -->
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Modifier le Membre</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="editedMember.name"
                  label="Nom"
                  :rules="[v => !!v || 'Nom requis']"
                />
                <v-text-field
                  v-model="editedMember.adresse"
                  label="Adresse"
                  :rules="[v => !!v || 'Adresse requise']"
                />
                <v-text-field
                  v-model="editedMember.telephone"
                  label="Téléphone"
                  :rules="[v => !!v || 'Téléphone requis']"
                />
                <v-text-field
                  v-model="editedMember.email"
                  label="Email"
                  :rules="[v => !!v || 'Email requis']"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="updateMember">Enregistrer</v-btn>
              <v-btn color="grey" text @click="closeEditDialog">Annuler</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Boîte de dialogue de confirmation de suppression -->
        <v-dialog v-model="confirmDialog" max-width="400px">
          <v-card>
            <v-card-title>
              <span class="headline">Confirmation de Suppression</span>
            </v-card-title>
            <v-card-text>
              Êtes-vous sûr de vouloir supprimer ce membre ?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="deleteMember(confirmedMember)">Supprimer</v-btn>
              <v-btn color="grey" text @click="closeConfirmDialog">Annuler</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import axios from "~/plugins/axios";

export default {
  setup() {
    const members = ref([]); // Tableau des membres
    const toast = useToast();
    const $axios = axios().provide.axios; 

    // État pour la boîte de dialogue
    const dialog = ref(false);
    const confirmDialog = ref(false); // État pour la boîte de dialogue de confirmation
    const editedMember = ref({}); // Membre à éditer
    const confirmedMember = ref(null); // Membre à confirmer pour suppression
    const valid = ref(false); // État de validation du formulaire

    const headers = [
      { text: "Nom", value: "name" },
      { text: "Adresse", value: "adresse" },
      { text: "Téléphone", value: "telephone" },
      { text: "Email", value: "email" },
      { text: "Actions", value: "actions", sortable: false },
    ];

    // Fonction pour récupérer les membres
    const getMembers = async () => {
      try {
        const response = await $axios.get("/api/members");
        members.value = response.data.members;
      } catch (error) {
        toast.error("Erreur lors de la récupération des membres : " + error.message);
      }
    };

    // Ouvrir la boîte de dialogue pour éditer un membre
    const openEditDialog = (member) => {
      editedMember.value = { ...member }; // Cloner le membre pour l'éditer
      dialog.value = true; // Ouvrir la boîte de dialogue
    };

    // Fermer la boîte de dialogue d'édition
    const closeEditDialog = () => {
      dialog.value = false; // Fermer la boîte de dialogue
      editedMember.value = {}; // Réinitialiser le membre édité
    };

    // Ouvrir la boîte de dialogue de confirmation de suppression
    const confirmDeleteMember = (member) => {
      confirmedMember.value = member; // Sauvegarder le membre à supprimer
      confirmDialog.value = true; // Ouvrir la boîte de dialogue de confirmation
    };

    // Fermer la boîte de dialogue de confirmation
    const closeConfirmDialog = () => {
      confirmDialog.value = false; // Fermer la boîte de dialogue
      confirmedMember.value = null; // Réinitialiser le membre confirmé
    };

    // Mettre à jour le membre
    const updateMember = async () => {
      if (valid.value) {
        try {
          await $axios.put(`/api/members/${editedMember.value.id}`, editedMember.value);
          toast.success("Membre mis à jour avec succès.");
          closeEditDialog(); // Fermer la boîte de dialogue après mise à jour
          getMembers(); // Rafraîchir la liste des membres
        } catch (error) {
          toast.error("Erreur lors de la mise à jour du membre : " + error.message);
        }
      } else {
        toast.error("Veuillez remplir tous les champs requis.");
      }
    };

    // Fonction pour supprimer un membre
    const deleteMember = async (member) => {
      try {
        await $axios.delete(`/api/members/${member.id}`);
        toast.success("Membre supprimé avec succès.");
        closeConfirmDialog(); // Fermer la boîte de dialogue de confirmation
        getMembers(); // Rafraîchir la liste après suppression
      } catch (error) {
        toast.error("Erreur lors de la suppression du membre : " + error.message);
      }
    };

    // Appel de la fonction lors du montage du composant
    onMounted(() => {
      getMembers();
    });

    return {
      members,
      headers,
      deleteMember,
      toast,
      dialog,
      confirmDialog,
      editedMember,
      confirmedMember,
      openEditDialog,
      closeEditDialog,
      confirmDeleteMember,
      closeConfirmDialog,
      updateMember,
      valid,
    };
  },
};
</script>

<style scoped>
.v-container {
  max-width: 900px;
  margin: 0 auto;
}
</style>
