import { CustomInputProps } from "@/type";
import cn from "clsx";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

export function Input({
  placeholder = "Enter text",
  label,
  value,
  onChangeText,
  keyboardType,
  secureTextEntry,
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className="w-full">
      <Text className="label">{label}</Text>

      <TextInput
        className={cn("input", isFocused ? "border-primary" : "border-gray-300")}
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor="#888"
      />
    </View>
  );
}
