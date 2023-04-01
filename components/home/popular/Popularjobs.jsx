import React from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import styles from "./popularjobs.style";
import { useRouter } from "expo-router";
import { COLORS, SIZES, SIZESi } from "../../../constants";
import PopularjobCard from "../../common/cards/popular/PopularJobCard";
import { useFetch } from "../../../hook/useFetch";
import axios from "axios";

const Popularjobs = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search",
    params: {
      query: "Python developer in Texas, USA",
      page: "1",
      num_pages: "1",
    },
    headers: {
      "X-RapidAPI-Key": "fe813e6bc3msha43599271fec68fp10c2acjsnc97565a61526",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            colors={COLORS.primary}
          ></ActivityIndicator>
        ) : error ? (
          <Text>Something Went Wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularjobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              ></PopularjobCard>
            )}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          ></FlatList>
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
