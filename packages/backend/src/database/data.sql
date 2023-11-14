-- Insert a single dummy user
INSERT INTO users (name, password) VALUES ('John Doe', 'password123');

-- Insert dummy courses
INSERT INTO courses (name, credits, user_id, status, notes, start_date, end_date, responsible_teacher, location, course_link) VALUES
('Design of WWW Services', 3, 1, 'in progress', 'Some notes here', '2023-10-01', '2024-01-15', 'Dr. Smith', 'Building A, Room 101', 'https://example.com/course1'),
('Calculus 1', 4, 1, 'not started', 'No notes yet', NULL, NULL, NULL, NULL, NULL),
('WWW Applications', 3, 1, 'in progress', 'Check the schedule for details', '2023-09-15', '2023-12-20', 'Prof. Johnson', 'Building B, Room 205', 'https://example.com/course2'),
('Social theory of finance: the giving and taking of value in the financialisation of our lives', 5, 1, 'done', 'Important concepts covered', '2023-08-20', '2023-12-10', 'Dr. Williams', 'Online', 'https://example.com/course3');

-- Insert mock data into the assignments table
INSERT INTO assignments (course_id, type, is_group, deadline, is_obligatory) VALUES
    (1, 'exam', 0, '2023-11-05', 1),
    (1, 'report', 1, '2023-11-15', 1),
    (2, 'exam', 0, '2023-11-10', 1),
    (2, 'report', 0, '2023-11-20', 1),
    (3, 'exam', 0, '2023-11-08', 1),
    (3, 'report', 1, '2023-11-18', 1),
    (4, 'exam', 1, '2023-11-12', 1),
    (4, 'report', 0, '2023-11-22', 1);

-- Insert mock data into the lectures table
INSERT INTO lectures (course_id, date, start_time, end_time, location, is_obligatory) VALUES
    (1, '2023-11-02', '10:00', '12:00', 'Lecture Hall A', 1),
    (1, '2023-11-09', '10:00', '12:00', 'Lecture Hall A', 1),
    (2, '2023-11-05', '09:00', '11:00', 'Lecture Hall B', 1),
    (2, '2023-11-12', '09:00', '11:00', 'Lecture Hall B', 1),
    (3, '2023-11-07', '11:00', '13:00', 'Lecture Hall C', 1),
    (3, '2023-11-14', '11:00', '13:00', 'Lecture Hall C', 1),
    (4, '2023-11-10', '13:00', '15:00', 'Lecture Hall D', 1),
    (4, '2023-11-17', '13:00', '15:00', 'Lecture Hall D', 1);

    
-- Insert a dummy lecture
INSERT INTO lectures (course_id, date, location, is_obligatory) VALUES (1, '2023-12-11', 'Room 102', 1);

-- Insert a dummy assignment
INSERT INTO assignments (course_id, type, is_group, deadline, is_obligatory) VALUES (1, 'exam', 0, '2023-12-15', 1);
