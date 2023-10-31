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
