package haulage.project

enum TransactionStatus {
    PENDING('Pending'), SUCCESS('Success'), FAILURE('Failure')

    private TransactionStatus(String id) { this.id = id }

    final String id

    static TransactionStatus byId(String id) {
        values().find { it.id == id }
    }
}