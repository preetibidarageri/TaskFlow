import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5F2',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },

  greeting: {
    fontSize: 14,
    color: '#777',
  },

  appTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#7B2525',
    marginTop: 3,
  },

  profile: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#7B2525',
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  summary: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
  },

  summaryBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
  },

  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7B2525',
  },

  summaryLabel: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },

  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },

  addButton: {
    backgroundColor: '#7B2525',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },

  taskTop: {
    flexDirection: 'row',
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#7B2525',
    borderRadius: 7,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxCompleted: {
    backgroundColor: '#7B2525',
  },

  check: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  taskInfo: {
    flex: 1,
  },

  taskTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },

  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },

  taskDescription: {
    fontSize: 13,
    color: '#777',
    marginTop: 5,
  },

  dateRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 14,
  },

  dateText: {
    fontSize: 12,
    color: '#666',
  },

  deadlineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },

  deadlineText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },

  priority: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '600',
  },

  highPriority: {
    backgroundColor: '#F8D7DA',
    color: '#7B2525',
  },

  mediumPriority: {
    backgroundColor: '#FFF0C2',
    color: '#856404',
  },

  lowPriority: {
    backgroundColor: '#D4EDDA',
    color: '#155724',
  },

  taskBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },

  status: {
    fontSize: 12,
    fontWeight: '700',
  },

  pendingStatus: {
    color: '#856404',
  },

  completedStatus: {
    color: '#2E7D32',
  },

  deleteText: {
    color: '#B3261E',
    fontSize: 13,
    fontWeight: '600',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },

  emptyIcon: {
    fontSize: 50,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },

  emptyText: {
    textAlign: 'center',
    color: '#777',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },

  emptyButton: {
    backgroundColor: '#7B2525',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },

  emptyButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  welcomeText: {
    fontSize: 13,
    color: '#777',
    marginTop: 3,
  },

  profileMenu: {
    position: 'absolute',
    top: 55,
    right: 0,
    width: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 15,

    // Android
    elevation: 8,

    // iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,

    zIndex: 1000,
  },

  profileName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },

  profileEmail: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },

  menuDivider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 12,
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },

  logoutIcon: {
    fontSize: 20,
    color: '#B3261E',
    marginRight: 10,
  },

  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#B3261E',
  },
});

export default styles;
