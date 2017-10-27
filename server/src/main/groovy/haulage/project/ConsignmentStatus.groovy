package haulage.project

enum ConsignmentStatus {

    READY_FOR_COLLECTION('Ready for Collection'), PENDING('Pending')

    private ConsignmentStatus(String id) { this.id = id }

    final String id

    static ConsignmentStatus byId(String id) {
        values().find { it.id == id }
    }

}