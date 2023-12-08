import { getDbInstance } from "../database/db";

const db = getDbInstance();

export const deleteLectureById = async (id: number) => {
    try {
        await new Promise<void>((resolve, reject) => {
            db.run(`DELETE FROM lectures WHERE id = ${id}`, [], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });

        console.log("Lecture deleted from database");
    } catch (error) {
        console.error("Error while deleting lecture from database");
    }
};
