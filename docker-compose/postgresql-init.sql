--
-- BASE: db_test_tdd
-- USER: u_test_tdd
-- PASS: 1234567890
--

CREATE DATABASE db_test_tdd;
CREATE USER u_test_tdd WITH PASSWORD '1234567890';
GRANT ALL PRIVILEGES ON DATABASE db_test_tdd TO u_test_tdd;
