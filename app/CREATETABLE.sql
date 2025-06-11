-- ตาราง student
CREATE TABLE IF NOT EXISTS student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL
);

-- ตาราง mukata พร้อม foreign key cascade
CREATE TABLE IF NOT EXISTS mukata (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    is_come TINYINT(1) DEFAULT 0,
    FOREIGN KEY (student_id)
        REFERENCES student(student_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


INSERT INTO student (student_id, name) VALUES
('123456789-0', 'สมชาย ใจดี'),
('987654321-1', 'สมหญิง แก่นกล้า'),
('111222333-4', 'อนันต์ เพียรดี'),
('444555666-2', 'พรทิพย์ ใจงาม'),
('777888999-3', 'ชัยวัฒน์ สายลม'),
('222333444-9', 'สุภาพร ใจเด็ด'),
('333444555-5', 'ธีรวัฒน์ กล้าหาญ'),
('888999000-7', 'ดวงใจ ใจเย็น'),
('666777888-6', 'นิภา น้ำใจดี'),
('555666777-8', 'เจนจิรา สายรุ้ง');
