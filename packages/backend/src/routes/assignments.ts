import { getDbInstance } from "../database/db";

const db = getDbInstance();

export const deleteAssignmentById = async (id: number) => {
    try {
        await new Promise<void>((resolve, reject) => {
            db.run(`DELETE FROM assignments WHERE id = ${id}`, [], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        console.log("Assignment deleted from database");
    } catch (error) {
        console.error("Error while deleting assignment from database");
    }
};
