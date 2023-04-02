import { View, ScrollView, SafeAreaView } from "react-native";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES, FONT } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.gray2,
      }}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.gray2 },
          headerTitleStyle: {
            fontFamily: FONT.bold,
            fontSize: SIZES.xLarge,
            color: COLORS.primary,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.menu}
              dimension="60%"
            ></ScreenHeaderBtn>
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={images.profile}
              dimension="60%"
            ></ScreenHeaderBtn>
          ),
          headerTitle: "Job Hunt",
        }}
      ></Stack.Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }}
          ></Welcome>
          <Popularjobs></Popularjobs>
          <Nearbyjobs></Nearbyjobs>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
