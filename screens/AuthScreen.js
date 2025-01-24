import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, TextInput, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Hook pour accéder à la navigation
import { AuthContext } from "../context/AuthContext";


export default function AuthScreen() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation(); // Accès à la navigation
  const { setUserLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const checkTokens = async () => {
      const jwtToken = await AsyncStorage.getItem("jwtToken");
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      console.log("JWT Token :", jwtToken);
      console.log("Refresh Token :", refreshToken);
    };
  
    checkTokens();
  }, []);


  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const login = async () => {
    setLoading(true);
    setError(null);
    try {
  
      // Étape 1 : Requête de connexion
      const response = await axios.post(
        "http://192.168.1.79:4000/api/auth/login",
        formData,
        {
          headers: {
            "X-Client-Type": "mobile", // Indique que la requête vient de l'application mobile
          },
        }
      );
  
      console.log("Réponse reçue du backend :", response.data);
  
    //   const token = response.data.token;

    const { token, refreshToken } = response.data;

      console.log("Token reçu :", token);
  
      // Étape 2 : Stocker le token dans AsyncStorage
      await AsyncStorage.setItem("jwtToken", token);
      console.log("Token stocké avec succès");

      if (refreshToken) {
        // Stocker le refresh token (uniquement pour mobile)
        await AsyncStorage.setItem("refreshToken", refreshToken);
      }
  
      // Étape 3 : Vérification immédiate via /check
      if (token) {
    //     const checkResponse = await axios.get(
    //       "http://192.168.1.79:4000/api/auth/check",
    //       {
    //         headers: {
    //             "X-Client-Type": "mobile",
    //           Authorization: `${token}`, // Envoie le token dans l'en-tête Authorization
    //         },
    //       }
    //     );
  
    //     console.log("Réponse du /check :", checkResponse.data);
  
    //     if (checkResponse.data.isAuthenticated) {
    //       console.log("Utilisateur authentifié :", checkResponse.data.user);
  
    //       // Mettre à jour l'état global (via AuthContext)
          setUserLoggedIn(true);}
  
    //       // Rediriger vers la navigation principale
    //       navigation.reset({
    //         index: 0,
    //         routes: [{ name: "MainApp" }],
    //       });
    //     } else {
    //       throw new Error("L'authentification a échoué après la connexion.");
    //     }
    //   } else {
    //     throw new Error("Token non valide ou absent.");
    //   }
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      setError(
        err.response?.data?.message || "Une erreur est survenue, veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };
  

    // Fonction de déconnexion
    const logout = async () => {
        try {
          // Supprimer le token du stockage
          await AsyncStorage.removeItem("jwtToken");
          await AsyncStorage.removeItem("refreshToken");
          console.log("Token supprimé");
          setUserLoggedIn(false);
          // Rediriger vers l'écran Auth
          navigation.reset({
            index: 0,
            routes: [{ name: "Auth" }],
          });
        } catch (err) {
          console.error("Erreur lors de la déconnexion :", err);
        }
      };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        label="Email"
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
        keyboardType="email-address"
        autoCapitalize="none"
        right={<TextInput.Icon icon="email" />}
      />
      <TextInput
        label="Mot de passe"
        value={formData.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
        right={<TextInput.Icon icon="eye" />}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button
        mode="contained"
        onPress={login}
        loading={loading}
        disabled={loading || !formData.email || !formData.password}
        style={styles.button}
      >
        Se connecter
      </Button>

            <Button
        mode="outlined"
        onPress={logout}
        style={styles.button}
      >
        Déconnexion
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});
