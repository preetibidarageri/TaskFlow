import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5F2',
  },

  keyboard: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 30,
  },

  content: {
    width: '100%',
    paddingHorizontal: 24,
  },

  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#7B2525',
    textAlign: 'center',
    marginBottom: 12,
  },

  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 30,
  },

  form: {
    width: '100%',
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#444',
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2DDD7',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },

  passwordContainer: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2DDD7',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },

  showButton: {
    paddingHorizontal: 15,
    height: '100%',
    justifyContent: 'center',
  },

  showPassword: {
    color: '#7B2525',
    fontSize: 14,
    fontWeight: '700',
  },

  loginButton: {
    height: 52,
    backgroundColor: '#7B2525',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
  },

  disabledButton: {
    opacity: 0.6,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },

  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  registerText: {
    color: '#777',
    fontSize: 14,
  },

  registerLink: {
    color: '#7B2525',
    fontSize: 14,
    fontWeight: '800',
  },

  // =========================
  // MODAL
  // =========================

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  messageModal: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 25,
    alignItems: 'center',
    elevation: 10,
  },

  messageIconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  successIconBackground: {
    backgroundColor: '#E5F6EA',
  },

  errorIconBackground: {
    backgroundColor: '#FCE8E8',
  },

  messageIcon: {
    fontSize: 34,
    fontWeight: '800',
  },

  successIcon: {
    color: '#2E8B57',
  },

  errorIcon: {
    color: '#C62828',
  },

  messageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },

  messageText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#777',
    textAlign: 'center',
    marginBottom: 22,
  },

  messageButton: {
    width: '100%',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  successButton: {
    backgroundColor: '#7B2525',
  },

  errorButton: {
    backgroundColor: '#7B2525',
  },

  messageButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});

export default styles;
