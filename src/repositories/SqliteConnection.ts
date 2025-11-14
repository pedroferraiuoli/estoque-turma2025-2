import Database from "better-sqlite3";

export class SqliteConnection {

    private connection: Database.Database;
    
    constructor(file: string) {
        this.connection = new Database(file);
    }

    public getConnection(): Database.Database {
        return this.connection;
    }
}