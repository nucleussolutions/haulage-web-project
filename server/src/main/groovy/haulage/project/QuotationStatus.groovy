package haulage.project

enum QuotationStatus {
    ACCEPTED('Accepted'), PENDING_ACCEPTANCE('Pending Acceptance')

    private QuotationStatus(String id) { this.id = id }

    final String id

    static QuotationStatus byId(String id) {
        values().find { it.id == id }
    }
}
