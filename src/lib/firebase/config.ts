const config: Record<string, string | undefined> = {
  apiKey: "AIzaSyBOx3jtk_ryNLoQFvIuy9a0hbV_zS1tITw",
  authDomain: "agetware-e-commerce.firebaseapp.com",
  projectId: "agetware-e-commerce",
  storageBucket: "agetware-e-commerce.firebasestorage.app",
  messagingSenderId: "466904378085",
  appId: "1:466904378085:web:e888a0a66e26e22f3f020c",
};

Object.keys(config).forEach((key) => {
  const configValue = config[key] + "";
  if (configValue.charAt(0) === '"') {
    config[key] = configValue.substring(1, configValue.length - 1);
  }
});

export const firebaseConfig = config;
