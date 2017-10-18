package haulage.project

enum RFTStatus {
    APPROVED('approved'), REJECTED('rejected'), PENDING('pending')

    private RFTStatus(String id) { this.id = id }

    final String id

    static RFTStatus byId(String id) {
        values().find { it.id == id }
    }
}