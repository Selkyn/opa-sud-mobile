import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://192.168.1.79:4000/api", // URL de base de ton backend
});

// Intercepteur pour ajouter automatiquement le token JWT
api.interceptors.request.use(
  async (config) => {
    // Récupérer le token depuis AsyncStorage
    const token = await AsyncStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `${token}`; // Ajouter le token à l'en-tête Authorization
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Propager l'erreur si la requête échoue
  }
);

// Intercepteur pour gérer les erreurs globales, y compris le renouvellement du token
api.interceptors.response.use(
  (response) => response, // Passer les réponses correctes
  async (error) => {
    const originalRequest = error.config;

    // Vérifie si l'erreur est liée à une authentification (401) et si ce n'est pas déjà une tentative de rafraîchissement
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("Refresh token manquant");
        }

        // Demander un nouveau access token avec le refresh token
        const refreshResponse = await axios.post(
          "http://192.168.1.79:4000/api/auth/refreshToken",
          { refreshToken }
        );

        const { accessToken } = refreshResponse.data;

        // Mettre à jour le token dans AsyncStorage
        await AsyncStorage.setItem("jwtToken", accessToken);

        // Ajouter le nouveau token à la requête originale
        originalRequest.headers.Authorization = `${accessToken}`;

        // Relancer la requête originale avec le nouveau token
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Erreur lors du rafraîchissement du token :", refreshError);

        // Supprimer les tokens invalides
        await AsyncStorage.removeItem("jwtToken");
        await AsyncStorage.removeItem("refreshToken");

        // Afficher une alerte et potentiellement rediriger vers l'écran d'authentification
        alert("Votre session a expiré, veuillez vous reconnecter.");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Propager les autres erreurs
  }
);

// Méthode pour vérifier le token manuellement
api.checkAuth = async () => {
  try {
    const response = await api.get("/auth/check");
    console.log("Utilisateur authentifié :", response.data.user);
    return { isAuthenticated: true, user: response.data.user };
  } catch (error) {
    console.error("Erreur d'authentification :", error);
    await AsyncStorage.removeItem("jwtToken");
    return { isAuthenticated: false, user: null };
  }
};

export default api;
