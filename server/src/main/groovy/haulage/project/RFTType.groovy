package haulage.project

enum RFTType {
    DIRECT_IMPORT('Direct Import'), DIRECT_EXPORT('Direct Export'), UNCOUPLE_IMPORT('Uncouple Import'), UNCOUPLE_EXPORT('Uncouple Export')

    private RFTType(String id) { this.id = id }

    final String id

    static RFTType byId(String id) {
        values().find { it.id == id }
    }
}
