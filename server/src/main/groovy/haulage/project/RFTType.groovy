package haulage.project

enum RFTType {
    DIRECT_IMPORT('Direct Import'), DIRECT_EXPORT('Direct Export'), NORMAL_IMPORT('Normal Import'), NORMAL_EXPORT('Normal Export')

    private RFTType(String id) { this.id = id }

    final String id

    static RFTType byId(String id) {
        values().find { it.id == id }
    }
}
