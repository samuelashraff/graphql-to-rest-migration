export type CourseSummary = {
    id: number;
    name: string;
    status: string;
};

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
