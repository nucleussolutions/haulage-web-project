package haulage.project

enum ConsignmentStatus {

    READY_FOR_COLLECTION('Ready for Collection'), PENDING('Pending'), CONTAINER_DAMAGED('Container Damaged'), ENROUTE_TO_DEPOT('Enroute to Depot')

    private ConsignmentStatus(String id) { this.id = id }

    final String id

    static ConsignmentStatus byId(String id) {
        values().find { it.id == id }
    }

}