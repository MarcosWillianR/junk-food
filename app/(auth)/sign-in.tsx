import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { signIn } from "@/lib/appwrite";

export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async () => {
    const { email, password } = form;
    if (!email || !password) {
      Alert.alert("Error", "Please enter valid email address & password.");
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn({ email, password });
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Errors", error.message);
      Sentry.captureEvent(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <Input
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(value) => setForm((state) => ({ ...state, email: value }))}
        label="Email"
        keyboardType="email-address"
      />

      <Input
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(value) => setForm((state) => ({ ...state, password: value }))}
        label="Password"
        secureTextEntry
      />

      <Button title="Sign In" isLoading={isSubmitting} onPress={handleSubmit} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">Don&apos;t have an account?</Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
}
