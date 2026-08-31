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
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from '@react-native-firebase/auth';

import styles from '../styles/registerStyles';

type RegisterScreenProps = {
  navigation: any;
};

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  // =========================
  // STATE
  // =========================

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Show / Hide password
  const [showPassword, setShowPassword] = useState(false);

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
  // REGISTER
  // =========================

  async function handleRegister() {
    // Check empty fields
    if (!name.trim() || !email.trim() || !password.trim()) {
      showMessage(
        'Missing Fields',
        'Please fill in all the required fields.',
        'error',
      );

      return;
    }

    // Password validation
    if (password.length < 6) {
      showMessage(
        'Weak Password',
        'Your password must contain at least 6 characters.',
        'error',
      );

      return;
    }

    try {
      const auth = getAuth();

      // Create Firebase account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      // Save user's name
      await updateProfile(userCredential.user, {
        displayName: name.trim(),
      });

      // Firebase automatically signs the user in
      // after registration, so sign them out.
      await signOut(auth);

      // Show success modal
      showMessage(
        'Registration Successful',
        'Your account has been created successfully. Please login to continue.',
        'success',
      );
    } catch (error: any) {
      console.log('Registration error:', error);

      if (error.code === 'auth/email-already-in-use') {
        showMessage(
          'Email Already Registered',
          'An account with this email already exists. Please login instead.',
          'error',
        );
      } else if (error.code === 'auth/invalid-email') {
        showMessage(
          'Invalid Email',
          'Please enter a valid email address and try again.',
          'error',
        );
      } else if (error.code === 'auth/weak-password') {
        showMessage(
          'Weak Password',
          'Please choose a stronger password with at least 6 characters.',
          'error',
        );
      } else if (error.code === 'auth/operation-not-allowed') {
        showMessage(
          'Registration Unavailable',
          'Email and password registration is currently disabled.',
          'error',
        );
      } else {
        showMessage(
          'Registration Failed',
          error.message || 'Something went wrong. Please try again.',
          'error',
        );
      }
    }
  }

  // =========================
  // MODAL BUTTON
  // =========================

  function handleModalButton() {
    setModalVisible(false);

    if (modalType === 'success') {
      navigation.replace('Login');
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
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          {/* =========================
              LOGO
          ========================= */}

          <Text style={styles.logo}>TaskFlow</Text>

          {/* =========================
              HEADING
          ========================= */}

          <Text style={styles.heading}>Create Account</Text>

          <Text style={styles.subtitle}>Start organizing your day</Text>

          {/* =========================
              NAME
          ========================= */}

          <Text style={styles.label}>Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
            returnKeyType="next"
          />

          {/* =========================
              EMAIL
          ========================= */}

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

          {/* =========================
              PASSWORD
          ========================= */}

          <Text style={styles.label}>Password</Text>

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Create a password"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleRegister}
            />

            <Pressable
              style={styles.showButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.showText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </Pressable>
          </View>

          {/* =========================
              REGISTER BUTTON
          ========================= */}

          <Pressable style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Create Account</Text>
          </Pressable>

          {/* =========================
              LOGIN
          ========================= */}

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account?</Text>

            <Pressable onPress={() => navigation.replace('Login')}>
              <Text style={styles.loginLink}>Login</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* =========================
          CUSTOM MESSAGE MODAL
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
                {modalType === 'success' ? 'Continue to Login' : 'Try Again'}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
