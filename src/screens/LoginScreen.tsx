import React, { useState } from 'react';

import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';

import styles from '../styles/loginStyles';

type LoginScreenProps = {
  navigation: any;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  // =========================
  // STATE
  // =========================

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Show / Hide password
  const [showPassword, setShowPassword] = useState(false);

  // Loading
  const [loading, setLoading] = useState(false);

  // Custom message modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error'>('success');

  // =========================
  // SHOW MESSAGE
  // =========================

  function showMessage(
    title: string,
    message: string,
    type: 'success' | 'error',
  ) {
    setModalTitle(title);
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  }

  // =========================
  // LOGIN
  // =========================

  async function handleLogin() {
    const cleanEmail = email.trim();

    // Empty fields
    if (!cleanEmail || !password) {
      showMessage(
        'Missing Fields',
        'Please enter your email and password to continue.',
        'error',
      );

      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      showMessage(
        'Invalid Email',
        'Please enter a valid email address and try again.',
        'error',
      );

      return;
    }

    try {
      setLoading(true);

      const auth = getAuth();

      // Firebase login
      await signInWithEmailAndPassword(auth, cleanEmail, password);

      // Successful login
      showMessage(
        'Welcome Back! 👋',
        'You have successfully logged in to TaskFlow. Let’s get things done!',
        'success',
      );
    } catch (error: any) {
      console.log('Login error:', error);

      if (error.code === 'auth/invalid-credential') {
        showMessage(
          'Login Failed',
          'The email or password is incorrect. Please check your details and try again.',
          'error',
        );
      } else if (error.code === 'auth/user-not-found') {
        showMessage(
          'Account Not Found',
          'No account was found with this email. Please register first.',
          'error',
        );
      } else if (error.code === 'auth/wrong-password') {
        showMessage(
          'Incorrect Password',
          'The password you entered is incorrect. Please try again.',
          'error',
        );
      } else if (error.code === 'auth/invalid-email') {
        showMessage(
          'Invalid Email',
          'Please enter a valid email address.',
          'error',
        );
      } else if (error.code === 'auth/user-disabled') {
        showMessage(
          'Account Disabled',
          'This account has been disabled. Please contact support.',
          'error',
        );
      } else if (error.code === 'auth/too-many-requests') {
        showMessage(
          'Too Many Attempts',
          'There have been too many unsuccessful attempts. Please wait and try again later.',
          'error',
        );
      } else {
        showMessage(
          'Login Failed',
          error.message || 'Something went wrong. Please try again.',
          'error',
        );
      }
    } finally {
      setLoading(false);
    }
  }

  // =========================
  // MODAL BUTTON
  // =========================

  function handleModalButton() {
    setModalVisible(false);

    if (modalType === 'success') {
      navigation.replace('Home');
    }
  }

  // =========================
  // UI
  // =========================

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
        >
          <View style={styles.content}>
            {/* LOGO */}

            <Text style={styles.logo}>TaskFlow</Text>

            {/* HEADING */}

            <Text style={styles.heading}>Welcome Back 👋</Text>

            <Text style={styles.subtitle}>Login to manage your tasks</Text>

            <View style={styles.form}>
              {/* EMAIL */}

              <Text style={styles.label}>Email</Text>

              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                returnKeyType="next"
              />

              {/* PASSWORD */}

              <Text style={styles.label}>Password</Text>

              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={password}
                  onChangeText={setPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />

                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.showButton}
                >
                  <Text style={styles.showPassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Text>
                </Pressable>
              </View>

              {/* LOGIN BUTTON */}

              <Pressable
                style={[styles.loginButton, loading && styles.disabledButton]}
                onPress={handleLogin}
                disabled={loading}
              >
                <Text style={styles.loginButtonText}>
                  {loading ? 'Logging in...' : 'Login'}
                </Text>
              </Pressable>

              {/* REGISTER */}

              <View style={styles.registerRow}>
                <Text style={styles.registerText}>Don't have an account?</Text>

                <Pressable onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.registerLink}> Register</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* =========================
          MODERN MESSAGE MODAL
      ========================= */}

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.messageModal}>
            {/* ICON */}

            <View
              style={[
                styles.messageIconContainer,
                modalType === 'success'
                  ? styles.successIconBackground
                  : styles.errorIconBackground,
              ]}
            >
              <Text
                style={[
                  styles.messageIcon,
                  modalType === 'success'
                    ? styles.successIcon
                    : styles.errorIcon,
                ]}
              >
                {modalType === 'success' ? '✓' : '!'}
              </Text>
            </View>

            {/* TITLE */}

            <Text style={styles.messageTitle}>{modalTitle}</Text>

            {/* MESSAGE */}

            <Text style={styles.messageText}>{modalMessage}</Text>

            {/* BUTTON */}

            <Pressable
              style={[
                styles.messageButton,
                modalType === 'success'
                  ? styles.successButton
                  : styles.errorButton,
              ]}
              onPress={handleModalButton}
            >
              <Text style={styles.messageButtonText}>
                {modalType === 'success' ? 'Continue to TaskFlow' : 'Try Again'}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
