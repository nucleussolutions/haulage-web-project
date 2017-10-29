package haulage.project

enum ConsignmentType {

    OT('OT'), FLAT_RACK('Flat Rack'), REEFER('Reefer'), HQ('HQ'), GP('GP')

    private ConsignmentType(String id) { this.id = id }

    final String id

    static ConsignmentType byId(String id) {
        values().find { it.id == id }
    }
}
