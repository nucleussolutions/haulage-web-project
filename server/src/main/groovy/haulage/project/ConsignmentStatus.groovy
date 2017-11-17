package haulage.project

enum ConsignmentStatus {

    READY_TO_COLLECT('Ready to Collect'), PENDING('Pending'), CONTAINER_DAMAGED('Container Damaged'), CONTAINER_REJECTED('Container Rejected'), LOADING_AT_CUSTOMER('Loading at Customer Location'), ARRIVED('Arrived at Customer Location'), UNCOUPLE('Uncouple at Customer Location'), LOADING_AT_PORT('Loading at Port')

    private ConsignmentStatus(String id) { this.id = id }

    final String id

    static ConsignmentStatus byId(String id) {
        values().find { it.id == id }
    }

}
