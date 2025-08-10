import { getCategories, getMenu } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const { category, query } = useLocalSearchParams<{ query: string; category: string }>();

  const { data, refetch, loading } = useAppwrite({ fn: getMenu, params: { category, query, limit: 6 } });
  const { data: categories } = useAppwrite({ fn: getCategories });

  useEffect(() => {
    refetch({ category, query, limit: 6 });
  }, [category, query, refetch]);

  return (
    <SafeAreaView>
      <Text>Search</Text>
    </SafeAreaView>
  );
}
