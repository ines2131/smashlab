import analytics from "@react-native-firebase/analytics";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

const DEBUG_LOG_SKIPPED = __DEV__;

function warnSkipped(name: string, params?: Record<string, unknown>) {
  if (DEBUG_LOG_SKIPPED) {
    console.log(`[analytics:web-skip] ${name}`, params ?? "");
  }
}

export const logScreenView = async (params: {
  screen_name: string;
  screen_class?: string;
}): Promise<void> => {
  if (isWeb) {
    warnSkipped("logScreenView", params);
    return;
  }
  try {
    await analytics().logScreenView(params);
  } catch (err) {
    console.warn("[analytics] logScreenView failed", err);
  }
};
