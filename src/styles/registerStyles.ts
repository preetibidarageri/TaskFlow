import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5F2',
  },

  keyboard: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },

  logo: {
    fontSize: 38,
    fontWeight: '800',
    color: '#7B2525',
    textAlign: 'center',
    marginBottom: 35,
  },

  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    color: '#777',
    marginBottom: 28,
    textAlign: 'center',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 18,
    color: '#222',
  },

  button: {
    height: 52,
    backgroundColor: '#7B2525',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700',
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  loginText: {
    color: '#777',
    fontSize: 14,
  },

  loginLink: {
    color: '#7B2525',
    fontSize: 14,
    fontWeight: '700',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 15,
  },

  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },

  showButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  showText: {
    color: '#7B2525',
    fontWeight: '600',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  messageModal: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',

    elevation: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },

  messageIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  successIconBackground: {
    backgroundColor: '#E8F5E9',
  },

  errorIconBackground: {
    backgroundColor: '#FDECEC',
  },

  messageIcon: {
    fontSize: 38,
    fontWeight: '800',
  },

  successIcon: {
    color: '#2E7D32',
  },

  errorIcon: {
    color: '#C62828',
  },

  messageTitle: {
    fontSize: 23,
    fontWeight: '800',
    color: '#7B2525',
    textAlign: 'center',
    marginBottom: 10,
  },

  messageText: {
    fontSize: 15,
    lineHeight: 23,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 25,
  },

  messageButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  successButton: {
    backgroundColor: '#7B2525',
  },

  errorButton: {
    backgroundColor: '#C62828',
  },

  messageButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default styles;
