package haulage.project

enum ConsignmentTaskType {

    LADEN('Laden'), DROP_OFF('Drop Off')

    private ConsignmentTaskType(String id) { this.id = id }

    final String id

    static ConsignmentTaskType byId(String id) {
        values().find { it.id == id }
    }
}