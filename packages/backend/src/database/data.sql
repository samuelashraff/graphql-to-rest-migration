-- Insert a single dummy user
INSERT INTO users (name, password) VALUES ('John Doe', 'password123');

-- Insert dummy courses
INSERT INTO courses (name, credits, user_id, status, notes, start_date, end_date, responsible_teacher, location, course_link) VALUES
('Design of WWW Services', 3, 1, 'in progress', 'Some notes here', '2023-10-01', '2024-01-15', 'Dr. Smith', 'Building A, Room 101', 'https://example.com/course1'),
('Calculus 1', 4, 1, 'not started', 'No notes yet', NULL, NULL, NULL, NULL, NULL),
('WWW Applications', 3, 1, 'in progress', 'Check the schedule for details', '2023-09-15', '2023-12-20', 'Prof. Johnson', 'Building B, Room 205', 'https://example.com/course2'),
('Social theory of finance: the giving and taking of value in the financialisation of our lives', 5, 1, 'done', 'Important concepts covered', '2023-08-20', '2023-12-10', 'Dr. Williams', 'Online', 'https://example.com/course3');