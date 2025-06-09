import Dexie from 'dexie';

class MyDriveDatabase extends Dexie {
    constructor() {
        super('MyDriveDatabase');

        // Define tables and their schema
        this.version(1).stores({
            users: '++id, name, email, password',
            folders: '++id, name, route, createdAt, createdBy',
            files: '++id, name, folderId, type, size, createdAt, createdBy'
        });
    }

    // Helper methods for users
    async getAllUsers() {
        return await this.users.toArray();
    }

    async getUserById(id) {
        return await this.users.get(id);
    }

    async getUserByEmail(email) {
        return await this.users.where('email').equals(email).first();
    }

    async addUser(user) {
        return await this.users.add(user);
    }

    // Helper methods for folders
    async getAllFolders() {
        return await this.folders.toArray();
    }

    async getFoldersByUser(userId) {
        return await this.folders.where('createdBy').equals(userId).toArray();
    }

    async addFolder(folder) {
        return await this.folders.add(folder);
    }

    async updateFolder(id, changes) {
        return await this.folders.update(id, changes);
    }

    async deleteFolder(id) {
        return await this.folders.delete(id);
    }

    // Helper methods for files
    async getFilesByFolder(folderId) {
        return await this.files.where('folderId').equals(folderId).toArray();
    }

    async addFile(file) {
        return await this.files.add(file);
    }

    async deleteFile(id) {
        return await this.files.delete(id);
    }
}

export const db = new MyDriveDatabase(); 