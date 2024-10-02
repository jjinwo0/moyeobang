INSERT INTO member (age, birth, email, member_key, profile, username, gender, member_type, role)
VALUES (27, '1998-05-04', 'enduf768640@gmail.com', '89a806dc-c87f-4288-bf6f-7063a75f1ef3', 'https://sample-image1.png',
        '김두열', 'MALE', 'GOOGLE', 'MEMBER'),
       (27, '1998-05-04', 'gnsals0904@naver.com', '596d1e36-c34a-4bbe-9abd-a329decc19e7', 'https://sample-image2.png',
        '김훈민', 'MALE', 'GOOGLE', 'MEMBER'),
       (27, '1998-05-04', 'qkrwjsdn@gmail.com', '8dd67d24-d0d2-49d3-a455-5dd37dffa96d', 'https://sample-image3.png',
        '박진우', 'MALE', 'GOOGLE', 'MEMBER'),
       (27, '1998-05-04', 'wjsrkgus0@gmail.com', '0e7d8c04-1a4d-49ab-8760-994aba776cdc', 'https://sample-image4.png',
        '전가현', 'FEMALE', 'GOOGLE', 'MEMBER'),
       (27, '1998-05-04', 'rkdenghd@gmail.com', '00547aa3-1706-4c19-ba3e-858e2facfc67', 'https://sample-image5.png',
        '강두홍', 'FEMALE', 'GOOGLE', 'MEMBER'),
       (27, '1998-05-04', 'dbwldus@gmail.com', 'cc086302-5dec-486f-a9dc-9755f654927a', 'https://sample-image6.png',
        '유지연', 'FEMALE', 'GOOGLE', 'MEMBER');

INSERT INTO member_account (member_id, account_number, bank_name)
VALUES (1, '9993274339436066', 'SSAFY BANK'),
       (2, '9997745290355417', 'SSAFY BANK'),
       (3, '9994212187222863', 'SSAFY BANK'),
       (4, '9991057007661603', 'SSAFY BANK'),
       (5, '9996488898855335', 'SSAFY BANK'),
       (6, '9990066034542704', 'SSAFY BANK');

INSERT INTO travel (title, travel_key)
VALUES ('제주도 여행', '563cc390-6a0c-407b-b8cd-f1ee2d0cd7ce'),
       ('싸피 여행', '563cc390-6a0c-407b-b8cd-f1ee2d0cd7ce');

INSERT INTO travel_place (travel_id, name)
VALUES (1, '제주도'),
       (2, '서울특별시'),
       (2, '대전광역시'),
       (2, '광주광역시'),
       (2, '경상북도 구미'),
       (2, '부산광역시');

INSERT INTO member_travel (balance, member_id, travel_id)
VALUES (0, 1, 1),
       (0, 2, 1),
       (0, 3, 1),
       (0, 4, 1),
       (0, 5, 1),
       (0, 6, 1),
       (0, 1, 2),
       (0, 3, 2);

INSERT INTO travel_account (travel_id, account_number)
VALUES (1, '9993247649535796'),
       (2, '9997097385463465');

INSERT INTO quiz (travel_id, question, answer)
VALUES (1, '김훈민의 발 사이즈는?', '235'),
       (2, '김용수의 키는?', '155');

INSERT INTO withdraw (withdraw_id, title, amount, balance_snapshot, target_account_number, latitude, longitude,
                      place_id, place_name, place_address, payment_request_id, settle_type, travel_account_id)
VALUES (1, '카페 결제', 5000, 100000, '9993274339436066', 37.7749, -122.4194, 'ChIJN1t_tDeuEmsRUsoyG83frY4', '스타벅스',
        '서울시 강남구 스타벅스', 'REQ1001', 'RECEIPT', 1),
       (2, '식당 결제', 15000, 85000, '9997097385463465', 37.5665, 126.9780, 'ChIJ9TPcRgWuEmsRZtZQk5E_7Pc', '이태원 식당',
        '서울시 용산구 이태원 식당', 'REQ1002', 'CUSTOM', 2);



INSERT INTO orders (order_id, title, amount, withdraw_id)
VALUES (1, '카페 주문', 5000, 1),
       (2, '식당 주문', 15000, 2);

INSERT INTO member_order_history (member_order_history_id, amount, member_id, order_id)
VALUES (1, 2500, 1, 1),
       (2, 2500, 2, 1),
       (3, 15000, 1, 2);

INSERT INTO schedule (schedule_id, schedule_title, start_date_time, title, address, google_place_id,
                      is_matched_transaction, budget, complete, image_url, memo, latitude, longitude, sequence,
                      travel_id, withdraw_id)
VALUES (1, '카페 방문', '2023-10-01 10:00:00', '카페 방문', '서울시 강남구 스타벅스', 'ChIJN1t_tDeuEmsRUsoyG83frY4', TRUE, 5000,
        'COMPLETE', 'http://image.url/cafe.jpg', '친구들과 카페에서 만남', 37.7749, -122.4194, 1, 1, 1),
       (2, '식당 방문', '2023-10-02 12:30:00', '식당 방문', '서울시 용산구 이태원 식당', 'ChIJ9TPcRgWuEmsRZtZQk5E_7Pc', FALSE, 15000,
        'INCOMPLETE', 'http://image.url/restaurant.jpg', '가족과 식사', 37.5665, 126.9780, 2, 1, 2);


-- INSERT INTO deposit (amount, balance_snapshot, created_at, updated_at, member_id, travel_account_id, created_by, modified_by)
-- VALUES (200000, 200000, '2023-09-02 09:00:00', '2023-09-02 09:00:00', 1, 1, 'admin', 'admin'),
--        (200000, 400000, '2023-09-02 10:30:00', '2023-09-02 10:30:00', 2, 1, 'admin', 'admin'),
--        (200000, 600000, '2023-09-02 12:00:00', '2023-09-02 12:00:00', 3, 1, 'admin', 'admin'),
--        (200000, 800000, '2023-09-02 13:00:00', '2023-09-02 13:00:00', 4, 1, 'admin', 'admin');
--
-- INSERT INTO withdraw (latitude, longitude, amount, balance_snapshot, travel_account_id, place_address, place_id, place_name, target_account_number, title,
--                       settle_type)
-- VALUES (37.5665, 126.9780, 100000, 700000, 1, 'Seoul, South Korea', 'PID001', 'Namsan Tower', '123-456-789', 'Tour Fee', 'CUSTOM'),
--        (37.5745, 126.9574, 50000, 650000, 1, 'Seoul, South Korea', 'PID002', 'Insadong', '987-654-321', 'Food Payment', 'CUSTOM'),
--        (37.5510, 126.9882, 150000, 400000, 1, 'Seoul, South Korea', 'PID003', 'Dongdaemun', '456-789-123', 'Shopping', 'CUSTOM'),
--        (37.5705, 126.9922, 50000, 350000, 1, 'Seoul, South Korea', 'PID004', 'Gwanghwamun', '789-123-456', 'Cafe Payment', 'RECEIPT');
--
--
-- INSERT INTO orders (amount, created_at, updated_at, withdraw_id, created_by, modified_by, title)
-- VALUES (100000, '2023-09-02 14:00:00', '2023-09-02 14:00:00', 1, 'admin', 'admin', 'Namsan Tower Tour Fee'),
--        (50000, '2023-09-02 16:30:00', '2023-09-02 16:30:00', 2, 'admin', 'admin', 'Insadong Food Payment'),
--        (150000, '2023-09-02 18:00:00', '2023-09-02 18:00:00', 3, 'admin', 'admin', 'Dongdaemun Shopping'),
--        (20000, '2023-09-02 20:00:00', '2023-09-02 20:00:00', 4, 'admin', 'admin', 'Americano'),
--        (25000, '2023-09-02 20:00:00', '2023-09-02 20:00:00', 4, 'admin', 'admin', 'Café Latte'),
--        (5000, '2023-09-02 20:00:00', '2023-09-02 20:00:00', 4, 'admin', 'admin', 'Cheesecake');
--
-- INSERT INTO member_order_history (amount, created_at, updated_at, member_id, order_id, created_by, modified_by)
-- VALUES (25000, '2023-09-02 14:10:00', '2023-09-02 14:10:00', 1, 1, 'admin', 'admin'),
--        (25000, '2023-09-02 14:10:00', '2023-09-02 14:10:00', 2, 1, 'admin', 'admin'),
--        (25000, '2023-09-02 14:10:00', '2023-09-02 14:10:00', 3, 1, 'admin', 'admin'),
--        (25000, '2023-09-02 14:10:00', '2023-09-02 14:10:00', 4, 1, 'admin', 'admin'),
--
--        (12500, '2023-09-02 16:40:00', '2023-09-02 16:40:00', 1, 2, 'admin', 'admin'),
--        (12500, '2023-09-02 16:40:00', '2023-09-02 16:40:00', 2, 2, 'admin', 'admin'),
--        (12500, '2023-09-02 16:40:00', '2023-09-02 16:40:00', 3, 2, 'admin', 'admin'),
--        (12500, '2023-09-02 16:40:00', '2023-09-02 16:40:00', 4, 2, 'admin', 'admin'),
--
--        (50000, '2023-09-02 18:10:00', '2023-09-02 18:10:00', 1, 3, 'admin', 'admin'),
--        (50000, '2023-09-02 18:10:00', '2023-09-02 18:10:00', 2, 3, 'admin', 'admin'),
--        (50000, '2023-09-02 18:10:00', '2023-09-02 18:10:00', 3, 3, 'admin', 'admin'),
--
--        (5000, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 1, 4, 'admin', 'admin'),
--        (5000, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 2, 4, 'admin', 'admin'),
--        (5000, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 3, 4, 'admin', 'admin'),
--        (5000, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 4, 4, 'admin', 'admin'),
--
--        (6250, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 1, 5, 'admin', 'admin'),
--        (6250, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 2, 5, 'admin', 'admin'),
--        (6250, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 3, 5, 'admin', 'admin'),
--        (6250, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 4, 5, 'admin', 'admin'),
--
--        (1250, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 1, 6, 'admin', 'admin'),
--        (1250, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 2, 6, 'admin', 'admin'),
--        (1250, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 3, 6, 'admin', 'admin'),
--        (1250, '2023-09-02 20:10:00', '2023-09-02 20:10:00', 4, 6, 'admin', 'admin');
--
