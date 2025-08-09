import { CustomButtonProps } from "@/type";
import cn from "clsx";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export function Button({
  leftIcon,
  onPress,
  style,
  textStyle,
  isLoading = false,
  title = "Click me",
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isLoading}
      className={cn("custom-btn", style, isLoading ? "bg-primary/50" : "bg-primary")}
      onPress={onPress}
    >
      {leftIcon}

      <View className="flex-center flex-row">
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text className={cn("text-white-100 paragraph-semibold", textStyle)}>{title}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
