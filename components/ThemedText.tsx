import { Text, type TextProps } from "react-native";

import { Typography, Colors, FontFamily } from "@/constants/theme";

export type ThemedTextProps = TextProps & {
  type?: "hero" | "h1" | "h2" | "h3" | "body" | "caption" | "small" | "link";
  color?: "primary" | "secondary" | "tertiary" | "accent";
};

export function ThemedText({
  style,
  type = "body",
  color = "primary",
  ...rest
}: ThemedTextProps) {
  const getColor = () => {
    if (type === "link") {
      return Colors.link;
    }

    switch (color) {
      case "primary":
        return Colors.text.primary;
      case "secondary":
        return Colors.text.secondary;
      case "tertiary":
        return Colors.text.tertiary;
      case "accent":
        return Colors.text.accent;
      default:
        return Colors.text.primary;
    }
  };

  const getTypeStyle = () => {
    switch (type) {
      case "hero":
        return { ...Typography.hero, fontFamily: FontFamily.poppinsBold };
      case "h1":
        return { ...Typography.h1, fontFamily: FontFamily.poppinsSemiBold };
      case "h2":
        return { ...Typography.h2, fontFamily: FontFamily.poppinsSemiBold };
      case "h3":
        return { ...Typography.h3, fontFamily: FontFamily.poppinsMedium };
      case "body":
        return { ...Typography.body, fontFamily: FontFamily.poppinsRegular };
      case "caption":
        return { ...Typography.caption, fontFamily: FontFamily.robotoRegular };
      case "small":
        return { ...Typography.small, fontFamily: FontFamily.robotoRegular };
      case "link":
        return { ...Typography.body, fontFamily: FontFamily.poppinsRegular };
      default:
        return { ...Typography.body, fontFamily: FontFamily.poppinsRegular };
    }
  };

  return (
    <Text style={[{ color: getColor() }, getTypeStyle(), style]} {...rest} />
  );
}
