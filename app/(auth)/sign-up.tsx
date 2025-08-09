import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { createUser } from "@/lib/appwrite";
import { SignUpForm, SignUpFormKeys } from "@/type";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";

const INPUTS: SignUpForm[] = [
  { formName: "name", placeholder: "Enter your full name", label: "Full name" },
  { formName: "email", placeholder: "Enter your email", label: "Email", keyboardType: "email-address" },
  { formName: "password", placeholder: "Enter your password", label: "Password", secureTextEntry: true },
];

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<Record<SignUpFormKeys, string>>({ name: "", email: "", password: "" });

  const handleSubmit = async () => {
    const { name, email, password } = form;
    if (!name || !email || !password) {
      Alert.alert("Error", "Please enter valid email address & password.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createUser({ email, name, password });
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      {INPUTS.map(({ formName, label, placeholder, keyboardType, secureTextEntry }) => (
        <Input
          key={formName}
          placeholder={placeholder}
          value={form[formName]}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onChangeText={(value) => setForm((state) => ({ ...state, [formName]: value }))}
          label={label}
        />
      ))}

      <Button title="Sign Up" isLoading={isSubmitting} onPress={handleSubmit} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">Already have an account?</Text>
        <Link href="/sign-in" className="base-bold text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
}
