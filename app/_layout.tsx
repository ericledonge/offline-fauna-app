import { useEffect } from "react";
import { Platform, StyleSheet, View, useWindowDimensions } from "react-native";
import { MD3Theme } from "react-native-paper";
import { useFonts } from "expo-font";
import { Stack, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import "react-native-reanimated";

import { Providers } from "@/components/Providers";
import { Header } from "../components/Header";
import { useTheme } from "@/hooks/useTheme";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Désactiver l'animation native sur web
if (Platform.OS === "web") {
  // @ts-ignore
  global.useNativeDriver = false;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Providers>
      <RootLayoutNav />
    </Providers>
  );
}

function RootLayoutNav() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 768; // Breakpoint pour les tablettes

  if (Platform.OS === "web") {
    return (
      <View style={styles.webContainer}>
        {!isSmallScreen && (
          <View style={styles.webSidebar}>
            <Header />
          </View>
        )}
        <View
          style={[styles.webContent, isSmallScreen && styles.webContentFull]}
        >
          <Slot />
        </View>
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        header: ({ navigation }) => (
          <Header
            title={""}
            showBackButton={navigation.canGoBack()}
            onBackPress={navigation.goBack}
          />
        ),
      }}
    />
  );
}

const createStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    webContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: theme.colors.background,
    },
    webSidebar: {
      width: 300,
      borderRightWidth: 1,
      borderRightColor: theme.colors.outlineVariant,
      padding: 16,
    },
    webContent: {
      flex: 1,
      padding: 16,
    },
    webContentFull: {
      width: "100%",
    },
    mobileContainer: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background,
    },
  });
