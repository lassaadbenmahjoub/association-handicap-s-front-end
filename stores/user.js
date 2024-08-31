import { defineStore } from "pinia";
import axios from "~/plugins/axios";
const $axios = axios().provide.axios;
export const useUserStore = defineStore("user", {
  state: () => ({
    id: "",
    name: "",
    email: "",
    role: "",
    api_token: "",
    isLoggedIn: false,
    isAuthenticated:false,
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await $axios.post("/api/auth/login", {
          email,
          password
        });

        // Extract data from the response according to the new structure
        const { token, user } = response.data;
        const { id, email: userEmail, name } = user;

        if (!token || !userEmail || !id) {
          throw new Error("Incomplete response data.");
        }

        localStorage.setItem("token", token);
        this.api_token = token;
        this.email = userEmail;
        this.id = id;
        this.name = name; // Assuming `full_name` should be updated with the `name` field from the user object
        this.isLoggedIn = true;
        this.isAuthenticated = true; // Update isAuthenticated
      } catch (error) {
        console.error(
          "Login failed:",
          error.response?.data?.message || error.message
        );
        // Handle login error (e.g., show an alert or a toast notification)
        throw new Error(error.response?.data?.message || "Login failed.");
      }
    },

    // user.js or wherever your store is defined
  // user.js or wherever your store is defined
  async register(name, email, password, confirmPassword, nomAssociation, typeOrganisation, adresse, telephone, role) {
   
  
    try {
      const response = await $axios.post("/api/auth/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
        nom_association: nomAssociation, // Verify field name
        type_organisation: typeOrganisation, // Verify field name
        adresse, // Include if required
        telephone,
        role
      });
  
      return response.data; // Return response data if needed
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data?.message || error.message
      );
      throw new Error(
        error.response?.data?.message || "Registration failed."
      );
    }
  }
  
  ,
  

    async getUser() {
      try {
        const response = await $axios.get("/api/user");
        const user = response.data.user;
console.log("zzzzzzzzz",user)
        if (!user) {
          throw new Error("User data is missing.");
        }

        const { id, name, email ,role} = user;

        if (!id || !name || !email|| !role) {
          throw new Error("Incomplete user data.");
        }

        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.isLoggedIn = true;
      } catch (error) {
        console.error(
          "Failed to fetch user:",
          error.response?.data?.message || error.message
        );
        // Handle error
        throw new Error(
          error.response?.data?.message || "Failed to fetch user."
        );
      }
    },

    async logout() {
      try {
        await $axios.post("/api/auth/logout");
        this.resetState();
        localStorage.removeItem("token");
      } catch (error) {
        console.error(
          "Logout failed:",
          error.response?.data?.message || error.message
        );
        // Handle logout error
        throw new Error(error.response?.data?.message || "Logout failed.");
      }
    },

    resetState() {
      this.id = "";
      this.name = "";
      this.email = "";
      this.role ="";
      this.api_token = "";
      this.isLoggedIn = false;
      this.isAuthenticated = false; // Reset isAuthenticated
    },
    checkAuth() {
        return this.isAuthenticated; // Method to check authentication status
      }
  },
  persist: true,
});
