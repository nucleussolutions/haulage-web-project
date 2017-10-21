package haulage.project

enum JobStatus {

    COMPLETE('Complete'), PENDING('Pending'), STARTED('Started'), PENDING_REASSIGN('Pending Reassignment')

    private JobStatus(String id) { this.id = id }

    final String id

    static JobStatus byId(String id) {
        values().find { it.id == id }
    }
}
