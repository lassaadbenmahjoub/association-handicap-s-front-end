import { defineStore } from "pinia";
import axios from "~/plugins/axios";
const $axios = axios().provide.axios;

export const useUserStore = defineStore("user", {
  state: () => ({
    id: "",
    name: "",
    email: "",
    role: "",
    status: "",
    api_token: "",
    isLoggedIn: false,
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await $axios.post("/api/auth/login", {
          email,
          password,
        });

        const { token, user } = response.data;
        const { id, email: userEmail, name, role, status } = user;

        if (!token || !userEmail || !id || !status) {
          throw new Error("Incomplete response data.");
        }

        // Store user details in state
        this.$state.api_token = token;
        this.$state.email = userEmail;
        this.$state.id = id;
        this.$state.name = name;
        this.$state.role = role;
        this.$state.status = status;
        this.$state.isLoggedIn = true;
          localStorage.setItem("token", token);
      } catch (error) {
        console.error("Login failed:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Login failed.");
      }
    },

    async register(name, email, password, confirmPassword, nomAssociation, typeOrganisation, adresse, telephone, role) {
      try {
        const response = await $axios.post("/api/auth/register", {
          name,
          email,
          password,
          password_confirmation: confirmPassword,
          nom_association: nomAssociation,
          type_organisation: typeOrganisation,
          adresse,
          telephone,
          role
        });
  
        return response.data; // Return response data if needed
      } catch (error) {
        console.error("Registration failed:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Registration failed.");
      }
    },
  
    async getUser() {
      try {
        // Check if token exists in localStorage and set it in Axios headers
        const token = localStorage.getItem("token");
        if (token) {
          $axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        const response = await $axios.get("/api/user");
        const user = response.data.user;
        this.user = response.data.user; // Stockez l'utilisateur
        this.userId = response.data.user.id; // Assurez-vous que vous récupérez l'ID ici

        if (!user) {
          throw new Error("User data is missing.");
        }

        const { id, name, email, role, status,nom_association } = user;

        if (!id || !name || !email || !role || !status  || !nom_association ) {
          throw new Error("Incomplete user data.");
        }
        this.$state.id = id;
        this.$state.name = name;
        this.$state.email = email;
        this.$state.role = role;
        this.$state.nom_association = nom_association;
        this.$state.status = status;
        this.$state.isLoggedIn = true;

      } catch (error) {
        console.error("Failed to fetch user:", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || "Failed to fetch user.");
      }
    },

   
    async logout() {
      await $axios.post('/api/auth/logout')
      this.resetState()
  },
    resetState() {
      this.$state.id = "";
      this.$state.name = "";
      this.$state.email = "";
      this.$state.status = "";
      this.$state.role = "";
      this.$state.api_token = "";
      this.$state.isLoggedIn = false;
      
    },
  },
  persist: true, // Ensure state persistence across sessions
});
 