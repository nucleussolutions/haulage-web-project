package haulage.project

enum UserType {
    SUPER_ADMIN('Super Admin'), ADMIN('Admin'), MANAGER('Manager'), USER('User')

    private UserType(String id) { this.id = id }

    final String id

    static UserType byId(String id) {
        values().find { it.id == id }
    }
}