INSERT INTO member (age, created_at, updated_at, birth, created_by, email, member_key, modified_by, profile, username, gender, member_type,
                    role)
VALUES (25, '2023-09-01 10:00:00', '2023-09-01 10:00:00', '1998-01-15', 'admin', 'member1@example.com', 'MKEY001', 'admin', 'profile1.jpg',
        'John Doe', 'MALE', 'GOOGLE', 'MEMBER'),
       (30, '2023-09-01 10:00:00', '2023-09-01 10:00:00', '1993-03-12', 'admin', 'member2@example.com', 'MKEY002', 'admin', 'profile2.jpg',
        'Jane Doe', 'FEMALE', 'KAKAO', 'MEMBER'),
       (27, '2023-09-01 10:00:00', '2023-09-01 10:00:00', '1996-07-21', 'admin', 'member3@example.com', 'MKEY003', 'admin', 'profile3.jpg',
        'Michael Smith', 'MALE', 'GOOGLE', 'MEMBER'),
       (22, '2023-09-01 10:00:00', '2023-09-01 10:00:00', '2001-05-18', 'admin', 'member4@example.com', 'MKEY004', 'admin', 'profile4.jpg',
        'Emily Davis', 'FEMALE', 'KAKAO', 'MEMBER'),
       (35, '2023-09-01 10:00:00', '2023-09-01 10:00:00', '1988-11-09', 'admin', 'member5@example.com', 'MKEY005', 'admin', 'profile5.jpg',
        'Chris Johnson', 'MALE', 'GOOGLE', 'ADMIN'),
       (28, '2023-09-01 10:00:00', '2023-09-01 10:00:00', '1995-08-14', 'admin', 'member6@example.com', 'MKEY006', 'admin', 'profile6.jpg',
        'Anna Brown', 'FEMALE', 'KAKAO', 'MEMBER'),
       (32, '2023-09-01 10:00:00', '2023-09-01 10:00:00', '1991-02-24', 'admin', 'member7@example.com', 'MKEY007', 'admin', 'profile7.jpg',
        'James Taylor', 'MALE', 'GOOGLE', 'MEMBER'),
       (26, '2023-09-01 10:00:00', '2023-09-01 10:00:00', '1997-04-30', 'admin', 'member8@example.com', 'MKEY008', 'admin', 'profile8.jpg',
        'Sophia Lee', 'FEMALE', 'KAKAO', 'MEMBER'),
       (29, '2023-09-01 10:00:00', '2023-09-01 10:00:00', '1994-06-17', 'admin', 'member9@example.com', 'MKEY009', 'admin', 'profile9.jpg',
        'David Wilson', 'MALE', 'GOOGLE', 'MEMBER'),
       (31, '2023-09-01 10:00:00', '2023-09-01 10:00:00', '1992-09-08', 'admin', 'member10@example.com', 'MKEY010', 'admin',
        'profile10.jpg', 'Olivia White', 'FEMALE', 'KAKAO', 'MEMBER'),
       (33, '2023-09-01 10:00:00', '2023-09-01 10:00:00', '1990-12-25', 'admin', 'member11@example.com', 'MKEY011', 'admin',
        'profile11.jpg', 'Matthew Harris', 'MALE', 'GOOGLE', 'MEMBER'),
       (24, '2023-09-01 10:00:00', '2023-09-01 10:00:00', '1999-10-03', 'admin', 'member12@example.com', 'MKEY012', 'admin',
        'profile12.jpg', 'Mia Lewis', 'FEMALE', 'KAKAO', 'MEMBER'),
       (27, '2023-09-01 10:00:00', '2023-09-01 10:00:00', '1996-03-29', 'admin', 'member13@example.com', 'MKEY013', 'admin',
        'profile13.jpg', 'Alexander Walker', 'MALE', 'GOOGLE', 'MEMBER'),
       (26, '2023-09-01 10:00:00', '2023-09-01 10:00:00', '1997-07-22', 'admin', 'member14@example.com', 'MKEY014', 'admin',
        'profile14.jpg', 'Isabella Hall', 'FEMALE', 'KAKAO', 'MEMBER'),
       (30, '2023-09-01 10:00:00', '2023-09-01 10:00:00', '1993-01-06', 'admin', 'member15@example.com', 'MKEY015', 'admin',
        'profile15.jpg', 'Daniel Martinez', 'MALE', 'GOOGLE', 'MEMBER'),
       (35, '2023-09-01 10:00:00', '2023-09-01 10:00:00', '1988-04-14', 'admin', 'member16@example.com', 'MKEY016', 'admin',
        'profile16.jpg', 'Lucas Anderson', 'MALE', 'GOOGLE', 'ADMIN'),
       (23, '2023-09-01 10:00:00', '2023-09-01 10:00:00', '2000-11-18', 'admin', 'member17@example.com', 'MKEY017', 'admin',
        'profile17.jpg', 'Amelia Thomas', 'FEMALE', 'KAKAO', 'MEMBER'),
       (31, '2023-09-01 10:00:00', '2023-09-01 10:00:00', '1992-08-27', 'admin', 'member18@example.com', 'MKEY018', 'admin',
        'profile18.jpg', 'Henry Robinson', 'MALE', 'GOOGLE', 'MEMBER'),
       (28, '2023-09-01 10:00:00', '2023-09-01 10:00:00', '1995-05-13', 'admin', 'member19@example.com', 'MKEY019', 'admin',
        'profile19.jpg', 'Emma Clark', 'FEMALE', 'KAKAO', 'MEMBER'),
       (34, '2023-09-01 10:00:00', '2023-09-01 10:00:00', '1989-09-30', 'admin', 'member20@example.com', 'MKEY020', 'admin',
        'profile20.jpg', 'Jack King', 'MALE', 'GOOGLE', 'MEMBER');

INSERT INTO member_account (created_at, updated_at, member_id, account_number, bank_name, created_by, modified_by)
VALUES ('2023-09-01 09:00:00', '2023-09-01 09:00:00', 1, '111-1234-5678', 'Korea Bank', 'admin', 'admin'),
       ('2023-09-01 09:00:00', '2023-09-01 09:00:00', 2, '111-2345-6789', 'Korea Bank', 'admin', 'admin'),
       ('2023-09-01 09:00:00', '2023-09-01 09:00:00', 3, '111-3456-7890', 'Shinhan Bank', 'admin', 'admin'),
       ('2023-09-01 09:00:00', '2023-09-01 09:00:00', 4, '111-4567-8901', 'Hana Bank', 'admin', 'admin');

INSERT INTO travel (created_at, updated_at, created_by, modified_by, title, travel_key)
VALUES ('2023-09-01 10:00:00', '2023-09-01 10:00:00', 'admin', 'admin', 'Paris Trip', 'TKEY001'),
       ('2023-09-01 10:00:00', '2023-09-01 10:00:00', 'admin', 'admin', 'Japan Adventure', 'TKEY002'),
       ('2023-09-01 10:00:00', '2023-09-01 10:00:00', 'admin', 'admin', 'Australia Journey', 'TKEY003'),
       ('2023-09-01 10:00:00', '2023-09-01 10:00:00', 'admin', 'admin', 'Canada Exploration', 'TKEY004'),
       ('2023-09-01 10:00:00', '2023-09-01 10:00:00', 'admin', 'admin', 'New Zealand Trek', 'TKEY005');

INSERT INTO member_travel (balance, created_at, updated_at, member_id, travel_id, created_by, modified_by)
VALUES (500000, '2023-09-02 08:30:00', '2023-09-02 08:30:00', 1, 1, 'admin', 'admin'),
       (450000, '2023-09-02 09:00:00', '2023-09-02 09:00:00', 2, 1, 'admin', 'admin'),
       (600000, '2023-09-02 10:30:00', '2023-09-02 10:30:00', 3, 1, 'admin', 'admin'),
       (550000, '2023-09-02 11:00:00', '2023-09-02 11:00:00', 4, 1, 'admin', 'admin'),

       (800000, '2023-09-03 10:00:00', '2023-09-03 10:00:00', 5, 2, 'admin', 'admin'),
       (750000, '2023-09-03 11:00:00', '2023-09-03 11:00:00', 6, 2, 'admin', 'admin'),
       (850000, '2023-09-03 12:00:00', '2023-09-03 12:00:00', 7, 2, 'admin', 'admin'),
       (800000, '2023-09-03 13:00:00', '2023-09-03 13:00:00', 8, 2, 'admin', 'admin'),

       (700000, '2023-09-04 12:45:00', '2023-09-04 12:45:00', 9, 3, 'admin', 'admin'),
       (650000, '2023-09-04 13:15:00', '2023-09-04 13:15:00', 10, 3, 'admin', 'admin'),
       (750000, '2023-09-04 14:00:00', '2023-09-04 14:00:00', 11, 3, 'admin', 'admin'),
       (700000, '2023-09-04 14:30:00', '2023-09-04 14:30:00', 12, 3, 'admin', 'admin'),

       (600000, '2023-09-05 14:20:00', '2023-09-05 14:20:00', 13, 4, 'admin', 'admin'),
       (550000, '2023-09-05 14:50:00', '2023-09-05 14:50:00', 14, 4, 'admin', 'admin'),
       (650000, '2023-09-05 15:30:00', '2023-09-05 15:30:00', 15, 4, 'admin', 'admin'),
       (600000, '2023-09-05 16:00:00', '2023-09-05 16:00:00', 16, 4, 'admin', 'admin'),

       (550000, '2023-09-06 09:10:00', '2023-09-06 09:10:00', 17, 5, 'admin', 'admin'),
       (500000, '2023-09-06 09:45:00', '2023-09-06 09:45:00', 18, 5, 'admin', 'admin'),
       (600000, '2023-09-06 10:15:00', '2023-09-06 10:15:00', 19, 5, 'admin', 'admin'),
       (550000, '2023-09-06 10:45:00', '2023-09-06 10:45:00', 20, 5, 'admin', 'admin');

INSERT INTO travel_account (created_at, updated_at, travel_id, account_number, created_by, modified_by)
VALUES ('2023-09-01 08:00:00', '2023-09-01 08:00:00', 1, '111-222-333', 'admin', 'admin');

INSERT INTO deposit (amount, balance_snapshot, created_at, updated_at, member_id, travel_account_id, created_by, modified_by)
VALUES (200000, 200000, '2023-09-02 09:00:00', '2023-09-02 09:00:00', 1, 1, 'admin', 'admin'),
       (200000, 400000, '2023-09-02 10:30:00', '2023-09-02 10:30:00', 2, 1, 'admin', 'admin'),
       (200000, 600000, '2023-09-02 12:00:00', '2023-09-02 12:00:00', 3, 1, 'admin', 'admin'),
       (200000, 800000, '2023-09-02 13:00:00', '2023-09-02 13:00:00', 4, 1, 'admin', 'admin');

INSERT INTO withdraw (latitude, longitude, amount, balance_snapshot, created_at, updated_at, travel_account_id, created_by, modified_by,
                      place_address, place_id, place_name, target_account_number, title, settle_type)
VALUES (37.5665, 126.9780, 100000, 700000, '2023-09-02 14:00:00', '2023-09-02 14:00:00', 1, 'admin', 'admin', 'Seoul, South Korea',
        'PID001', 'Namsan Tower', '123-456-789', 'Tour Fee', 'CUSTOM'),
       (37.5745, 126.9574, 50000, 650000, '2023-09-02 16:30:00', '2023-09-02 16:30:00', 1, 'admin', 'admin', 'Seoul, South Korea', 'PID002',
        'Insadong', '987-654-321', 'Food Payment', 'CUSTOM'),
       (37.5510, 126.9882, 150000, 400000, '2023-09-02 18:00:00', '2023-09-02 18:00:00', 1, 'admin', 'admin', 'Seoul, South Korea',
        'PID003', 'Dongdaemun', '456-789-123', 'Shopping', 'CUSTOM'),
       (37.5705, 126.9922, 50000, 350000, '2023-09-02 20:00:00', '2023-09-02 20:00:00', 1, 'admin', 'admin', 'Seoul, South Korea', 'PID004',
        'Gwanghwamun', '789-123-456', 'Cafe Payment', 'RECEIPT');


INSERT INTO orders (amount, created_at, updated_at, withdraw_id, created_by, modified_by, title)
VALUES (100000, '2023-09-02 14:00:00', '2023-09-02 14:00:00', 1, 'admin', 'admin', 'Namsan Tower Tour Fee'),
       (50000, '2023-09-02 16:30:00', '2023-09-02 16:30:00', 2, 'admin', 'admin', 'Insadong Food Payment'),
       (150000, '2023-09-02 18:00:00', '2023-09-02 18:00:00', 3, 'admin', 'admin', 'Dongdaemun Shopping'),
       (20000, '2023-09-02 20:00:00', '2023-09-02 20:00:00', 4, 'admin', 'admin', 'Americano'),
       (25000, '2023-09-02 20:00:00', '2023-09-02 20:00:00', 4, 'admin', 'admin', 'Café Latte'),
       (5000, '2023-09-02 20:00:00', '2023-09-02 20:00:00', 4, 'admin', 'admin', 'Cheesecake');

INSERT INTO member_order_history (amount, created_at, updated_at, member_id, order_id, created_by, modified_by)
VALUES (25000, '2023-09-02 14:10:00', '2023-09-02 14:10:00', 1, 1, 'admin', 'admin'),
       (25000, '2023-09-02 14:10:00', '2023-09-02 14:10:00', 2, 1, 'admin', 'admin'),
       (25000, '2023-09-02 14:10:00', '2023-09-02 14:10:00', 3, 1, 'admin', 'admin'),
       (25000, '2023-09-02 14:10:00', '2023-09-02 14:10:00', 4, 1, 'admin', 'admin'),

       (12500, '2023-09-02 16:40:00', '2023-09-02 16:40:00', 1, 2, 'admin', 'admin'),
       (12500, '2023-09-02 16:40:00', '2023-09-02 16:40:00', 2, 2, 'admin', 'admin'),
       (12500, '2023-09-02 16:40:00', '2023-09-02 16:40:00', 3, 2, 'admin', 'admin'),
       (12500, '2023-09-02 16:40:00', '2023-09-02 16:40:00', 4, 2, 'admin', 'admin'),

       (50000, '2023-09-02 18:10:00', '2023-09-02 18:10:00', 1, 3, 'admin', 'admin'),
       (50000, '2023-09-02 18:10:00', '2023-09-02 18:10:00', 2, 3, 'admin', 'admin'),
       (50000, '2023-09-02 18:10:00', '2023-09-02 18:10:00', 3, 3, 'admin', 'admin'),

       (5000, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 1, 4, 'admin', 'admin'),
       (5000, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 2, 4, 'admin', 'admin'),
       (5000, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 3, 4, 'admin', 'admin'),
       (5000, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 4, 4, 'admin', 'admin'),

       (6250, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 1, 5, 'admin', 'admin'),
       (6250, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 2, 5, 'admin', 'admin'),
       (6250, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 3, 5, 'admin', 'admin'),
       (6250, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 4, 5, 'admin', 'admin'),

       (1250, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 1, 6, 'admin', 'admin'),
       (1250, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 2, 6, 'admin', 'admin'),
       (1250, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 3, 6, 'admin', 'admin'),
       (1250, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 4, 6, 'admin', 'admin');

