import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5F2',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    marginTop: 20,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#7B2525',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backText: {
    fontSize: 32,
    color: '#FFFFFF',
    marginTop: -4,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },

  headerSpace: {
    width: 42,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#222',
  },

  descriptionInput: {
    height: 100,
    paddingTop: 14,
  },

  dateButton: {
    minHeight: 65,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  dateIcon: {
    fontSize: 24,
    marginRight: 14,
  },

  dateLabel: {
    fontSize: 12,
    color: '#888',
  },

  dateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 3,
  },

  priorityContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  priorityButton: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
  },

  lowSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },

  mediumSelected: {
    backgroundColor: '#E0A800',
    borderColor: '#E0A800',
  },

  highSelected: {
    backgroundColor: '#7B2525',
    borderColor: '#7B2525',
  },

  priorityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },

  selectedText: {
    color: '#FFFFFF',
  },

  addButton: {
    height: 54,
    backgroundColor: '#7B2525',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },

  disabledButton: {
    opacity: 0.6,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },

  cancelButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  cancelText: {
    color: '#7B2525',
    fontSize: 15,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  messageModal: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 26,
    alignItems: 'center',

    elevation: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },

  messageIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  successIconBackground: {
    backgroundColor: '#E8F7EE',
  },

  errorIconBackground: {
    backgroundColor: '#FDECEC',
  },

  messageIcon: {
    fontSize: 36,
    fontWeight: '800',
  },

  successIcon: {
    color: '#198754',
  },

  errorIcon: {
    color: '#DC3545',
  },

  messageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 10,
  },

  messageText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#777777',
    textAlign: 'center',
    marginBottom: 24,
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
