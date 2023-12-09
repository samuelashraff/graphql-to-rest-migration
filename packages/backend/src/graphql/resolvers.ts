import { getDbInstance } from "../database/db";

const db = getDbInstance();

export type Course = {
    id: number;
    name: string;
    credits: number;
    user_id: number;
    status: string;
    notes: string;
    start_date: string;
    end_date: string;
    responsible_teacher: string;
    location: string;
    course_link: string;
};

export type Assignment = {
    id: number;
    type: "exam" | "report";
    deadline: Date;
    is_obligatory: boolean;
    is_group: boolean;
};

export type Lecture = {
    id: number;
    date: Date;
    start_time: string;
    end_time: string;
    location: string;
    is_obligatory: boolean;
};

export const getCourses = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM courses`, [], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

export const getCourse = (id: string) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM courses WHERE id = ?`, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

export const getAssignments = (courseId: string) => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM assignments WHERE course_id = ? ORDER BY deadline ASC`,
            [courseId],
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            },
        );
    });
};

export const getLectures = (courseId: string) => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM lectures WHERE course_id = ? ORDER BY date ASC`,
            [courseId],
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            },
        );
    });
};

export const createCourse = async (args: any) => {
    const { name, status, startDate, endDate } = args as {
        name: string;
        status: string;
        startDate: string;
        endDate: string;
    };

    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO courses (name, status, start_date, end_date) VALUES
        ('${name}', '${status}', ${startDate}, ${endDate})`,
            function (this, err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            },
        );
    });
};

export const updateCourse = async (args: any) => {
    const { id, credits, location, responsible_teacher, status } = args as {
        id: string;
        credits: number;
        location: string;
        responsible_teacher: string;
        status: string;
    };
    return await new Promise<void>((resolve, reject) => {
        db.run(
            `UPDATE courses SET
            credits = $credits,
            status = $status,
            responsible_teacher = $responsible_teacher,
            location = $location
            WHERE id = $id`,
            {
                $credits: credits,
                $status: status,
                $responsible_teacher: responsible_teacher,
                $location: location,
                $id: id,
            },
            (err) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve();
                }
            },
        );
    });
};

export const deleteCourseById = async (id: number) => {
    await new Promise<void>((resolve, reject) => {
        db.run(`DELETE FROM courses WHERE id = ?`, [id], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

export const createLecture = async (args: any) => {
    const { courseId, date, start_time, end_time, location, is_obligatory } =
        args;

    try {
        await new Promise<void>((resolve, reject) => {
            db.run(
                `INSERT INTO lectures (course_id, date, start_time, end_time, location, is_obligatory) VALUES (?, ?, ?, ?, ?, ?)`,
                [courseId, date, start_time, end_time, location, is_obligatory],
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                },
            );
        });
    } catch (error) {
        console.error(
            "Error while inserting lecture into the database:",
            error,
        );
        throw new Error("Error while inserting lecture into the database");
    }
};

export const createAssignment = async (args: any) => {
    const { courseId, type, deadline, is_obligatory, is_group } = args;

    try {
        await new Promise<void>((resolve, reject) => {
            db.run(
                `INSERT INTO assignments (course_id, type, deadline, is_obligatory, is_group) VALUES (?, ?, ?, ?, ?)`,
                [courseId, type, deadline, is_obligatory, is_group],
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                },
            );
        });
    } catch (error) {
        console.error(
            "Error while inserting assignment into the database:",
            error,
        );
        throw new Error("Error while inserting assignment into the database");
    }
};

function isLectureType(obj: any): obj is Lecture {
    return "date" in obj;
}

export const getUpcomingEvents = async () => {
    try {
        const assignments: Assignment[] = await new Promise(
            (resolve, reject) => {
                db.all(
                    `SELECT * FROM assignments 
                    WHERE deadline >= DATE('now') 
                    ORDER BY deadline ASC`,
                    [],
                    (err, rows) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(rows as Assignment[]);
                        }
                    },
                );
            },
        );

        const lectures: Lecture[] = await new Promise((resolve, reject) => {
            db.all(
                `SELECT * FROM lectures 
                WHERE date >= DATE('now') 
                ORDER BY date ASC`,
                [],
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows as Lecture[]);
                    }
                },
            );
        });

        // Combine assignments and lectures
        const timetableData = [...assignments, ...lectures];

        // Sort the combined data by deadline
        timetableData.sort((a, b) => {
            const dateA = isLectureType(a)
                ? new Date(a.date)
                : new Date(a.deadline);
            const dateB = isLectureType(b)
                ? new Date(b.date)
                : new Date(b.deadline);

            return dateA.valueOf() - dateB.valueOf();
        });

        return timetableData;
    } catch (error) {
        console.error("Error while querying the database:", error);
    }
};

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
