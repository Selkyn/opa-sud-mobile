import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("jwtToken");
        const refreshToken = await AsyncStorage.getItem("refreshToken");

        if (token) {
          // Vérifie si le token est valide via /check
          try {
            const response = await api.get("/auth/check", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (response.status === 200) {
              setUserLoggedIn(true);
              return; // Fin de la vérification
            }
          } catch (err) {
            console.log("JWT Token expiré ou invalide. Tentative de rafraîchir...");
          }
        }

        // Si le token est invalide ou absent, utilise le refresh token
        if (refreshToken) {
          try {
            const refreshResponse = await api.post("/auth/refreshToken", {
              refreshToken,
            });

            const newToken = refreshResponse.data.accessToken;
            await AsyncStorage.setItem("jwtToken", newToken);
            setUserLoggedIn(true);
          } catch (err) {
            console.error("Erreur lors du rafraîchissement du token :", err);
            setUserLoggedIn(false);
          }
        } else {
          setUserLoggedIn(false); // Aucun refresh token disponible
        }
      } catch (error) {
        console.error("Erreur lors de la vérification d'authentification :", error);
        setUserLoggedIn(false);
      } finally {
        setLoading(false); // Arrête le chargement une fois terminé
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ userLoggedIn, setUserLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
