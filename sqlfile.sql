create table credentials (
username varchar2(255) not null,
email varchar2(255) primary key,
pass varchar2(255) not null,
CONSTRAINT check_password_length CHECK (LENGTH(pass) >= 8),
CONSTRAINT check_email_format CHECK (REGEXP_LIKE(email, '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'))
 );

create table hospital(
hosp_id int primary key, 
hosp_name varchar2(255) not null unique
);

create table doctor(
doc_id int primary key,
doc_name varchar2(255) not null, 
speciality varchar2(255) not null, 
fee int not null, 
reviews varchar2(255), 
city varchar2(255) not null, 
description varchar2(255) not null, 
rating number, 
review_num int, 
patient_num int, 
experience int not null, 
CONSTRAINT check_fee_positive CHECK (fee > 0),
CONSTRAINT check_rating_range CHECK (rating >= 0 AND rating <= 5)
);


create table patient(
patient_id int primary key,
patient_name varchar2(255) not null, 
dob date not null, 
gender varchar2(255) not null,
phone_num int not null, 
email varchar2(255)not null,
issue varchar2(255), 
constraint chk_gender CHECK (gender IN ('Male', 'Female', 'Other')),
CONSTRAINT chk_phone_num CHECK (phone_num > 0 AND LENGTH(phone_num) <= 20),
CONSTRAINT chk_email_format CHECK (REGEXP_LIKE(email, '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'))

);

create table slot (
slot_id int primary key, 
booking_day varchar2(255) not null, 
booking_time varchar2(255) not null,
booked NUMBER(1) DEFAULT 0 not null,
doc_id int not null, 
hosp_id int not null, 
CONSTRAINT fk_doctor FOREIGN KEY (doc_id) REFERENCES doctor(doc_id),
CONSTRAINT fk_hosp FOREIGN KEY (hosp_id) REFERENCES hospital(hosp_id),
CONSTRAINT check_booked CHECK (booked IN (0, 1)),
CONSTRAINT check_valid_day CHECK (booking_day IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'))
);

create table booking (
booking_id int primary key,
doc_id int not null, 
patient_id not null, 
slot_id not null,
CONSTRAINT fk_doc FOREIGN KEY (doc_id) REFERENCES doctor(doc_id),
CONSTRAINT fk_patient FOREIGN KEY (patient_id) REFERENCES patient(patient_id),
CONSTRAINT fk_slot FOREIGN KEY (slot_id) REFERENCES slot(slot_id)
);

CREATE SEQUENCE hospID_seq INCREMENT BY 1 START WITH 1; 

create or replace trigger hospital_BIR
before insert on hospital
for each row
begin
    select hospID_seq.nextval
    into :new.hosp_id
    from dual;
end;
/
CREATE SEQUENCE docID_seq INCREMENT BY 1 START WITH 1; 

create or replace trigger doc_BIR
before insert on doctor
for each row
begin
    select docID_seq.nextval
    into :new.doc_id
    from dual;
end;
/
CREATE SEQUENCE patientID_seq INCREMENT BY 1 START WITH 1; 

create or replace trigger patient_BIR
before insert on patient
for each row
begin
    select patientID_seq.nextval
    into :new.patient_id
    from dual;
end;
/
CREATE SEQUENCE bookingID_seq INCREMENT BY 1 START WITH 1; 

create or replace trigger booking_BIR
before insert on booking
for each row
begin
    select bookingID_seq.nextval
    into :new.booking_id
    from dual;
end;
/
CREATE SEQUENCE slotID_seq INCREMENT BY 1 START WITH 1; 

create or replace trigger slot_BIR
before insert on slot
for each row
begin
    select slotID_seq.nextval
    into :new.slot_id
    from dual;
end;
/

ALTER TABLE doctor
ADD image varchar2(255);

ALTER TABLE doctor
MODIFY description VARCHAR2(1000);



insert into credentials (username, email, pass) values ('Noor', 'noorussabah136@gmail.com', '12345678');
insert into credentials (username, email, pass) values ('Hritika', 'hritikarathi08@gmail.com', '12345678');
insert into credentials (username, email, pass) values ('Manahil', 'manahil.aamir2410@gmail.com', '12345678');

CREATE TABLE otp (
    email VARCHAR2(255) NOT NULL,
    code NUMBER(4) NOT NULL,
    expiry TIMESTAMP NOT NULL
);



insert into doctor (doc_name, speciality,fee,reviews,city, description, rating, review_num, patient_num, experience, image) values ('Dr. Nazifa Mubashir', 'Gynecologist', 3000, ' Doc was amazing.very kind and professionally very very sound. she was great experience and well doctor ', 'Karachi'
, 'Dr. Nazifa Mubashir is an obstetrician and gynecologist. After graduating from Dow Medical College she undertook postgraduate training in Obstetrics and Gynecology in Pakistan in a total year of 15 years. She also worked at centers in the UK. Her areas of expertise include: acute gynecology and early pregnancy, advanced antenatal practice, maternal medicine, subfertility and reproductive health, benign abdominal surgery (open and laparoscopic), benign gynecological surgery (Hysteroscopy) and advanced labour ward practice.', 5, 751, 1800, 18, 'https://images.app.goo.gl/cYS8VQeibYwBt2uz5');

insert into doctor (doc_name, speciality,fee,reviews,city, description, rating, review_num, patient_num, experience, image) values ('Dr. Fauzia Shafiq', 'Gynecologist', 1500,' It was a wonderful experience. Dr. Fauzia Shafiq is a very good doctor ', 'Karachi', 'Dr. Fauzia Shafiq is an expert Gynecologist with 15 years of experience.Dr. Fauzia Shafiq has the following qualifications: M.B.B.S., F.C.P.S. , M.C.P.S.' , 4.5, 291, 1200, 17, 'https://images.app.goo.gl/aW7eUGB2UwUibwk88');

insert into doctor (doc_name, speciality,fee,reviews,city, description, rating, review_num, patient_num, experience, image) values ('Dr. Syed Gauhar Alam', 'Dermatologist', 2500,' Excellent doctor. Very generous with time. He taught me a great deal about my condition.' ,'Karachi','Dr. Syed Gauhar Alam is a consultant Dermatologist. He is having over 25 year(s) of experience in the field of Dermatologist and practices at Cosmo Derme. Field of interest includes Alopecia,Carbon Peel, Psoriasis,Hyperhidrosis, Skin Rejuvenation,Burn Surgery,Vampire Facial,Wart Removal,Acne Scars Removal,Acne Scar Treatment,Sun Damage,Pimples, Acne Treatment,Whitening Injections,Carbon Facial.', 5.0, 763, 3600, 25, 'https://images.app.goo.gl/iAKFmynYnNxry6Ef7' );

insert into doctor (doc_name, speciality,fee,reviews,city, description, rating, review_num, patient_num, experience, image) values ('Dr. Hina Fahad', 'Dermatologist', 2500, 'Wonderful Doctor. Great personality and attitude. One of the nicest doctors I’ve ever been to! ', 'Karachi', 'Dr. Hina Fahad is a Dermatologist with 8 years of experience currently practicing at R5 Aesthetics and Healthcare, Karachi.Dr. Hina Fahad has the following qualifications: Dip. in Dermatology, M.B.B.S.', 4.3, 62, 370, 8, 'https://images.app.goo.gl/rjQ9zqLU42uqSVqe9' );

insert into doctor (doc_name, speciality,fee,reviews,city, description, rating, review_num, patient_num, experience, image) values ('Dr. Jawed Akbar Dars', 'Psychiatrist', 3000, ' Doc is amazing! He is great with his patients and spends as much time as needed with you to get all questions answered and also just to get to know you', 'Karachi' , 'Dr. Jawed Akbar Dars is one of the best psychiatrists in Karachi with a high patient satisfaction rate. He has the following qualifications: MBBS,FCPS He continued serving in different psychiatry departments for years treating all kinds of mental health conditions and illnesses. Dr. Jawed Akbar Dars also works on mental health conditions combining different treatment plans for more effective results against disorders like depression, bipolar disorder, insomnia, eating disorders, post-traumatic stress disorder, etc.', 4.8, 690, 4600,16, 'https://images.app.goo.gl/niWcR3PJgdXpStu8A' );

insert into doctor (doc_name, speciality,fee,reviews,city, description, rating, review_num, patient_num, experience, image) values ('Dr. Aneel Kumar Keswani', 'Psychiatrist', 3000, ' I found him very nice and excellent doctor he give excellent attention to his patients he also has a brilliant counciling experience over all I found him excellent doctor who deserves more excellent words which I cant have for him ', 'Karachi' , 'Dr. Aneel Kumar Keswani is one of the best psychiatrists in Karachi with a high patient satisfaction rate. He has the following qualifications: MBBS, FCPS He continued serving in different psychiatry departments for years treating all kinds of mental health conditions and illnesses. Dr. Aneel Kumar Keswani also works on mental health conditions combining different treatment plans for more effective results against disorders like depression, bipolar disorder, insomnia, eating disorders, post-traumatic stress disorder PTSD, etc', 4.5, 1176, 5700, 12, 'https://images.app.goo.gl/A8AkDESsN7CkWXUp6' );

insert into doctor (doc_name, speciality,fee,reviews,city, description, rating, review_num, patient_num, experience, image) values ('Dr. Farhan Naushad Ali Khan', 'Dentist' , 1500, ' Very nice. Explained in detail the issue as well as the options for treatment. Gave me time and listened to what I had to say. Totally satisfied. ', 'Karachi', 'Dr. Farhan Naushad Ali Khan is one of the best dentists in Karachi with a high patient satisfaction rate. He has the following qualifications: BDS, FICCDE Malaysia. Dr. Farhan Naushad Ali Khan expertise in dentistry involves diagnosis, and treatment of dental conditions including gum diseases, teeth sensitivity, tooth erosion, cracked broken teeth, etc.' , 4.3, 60, 1200, 24, 'https://images.app.goo.gl/Qr8eJBxs7Jskjzjw9' );

insert into doctor (doc_name, speciality,fee,reviews,city, description, rating, review_num, patient_num, experience, image) values ('Dr. Rehana Lakhani', 'Dentist' , 2000, 'Dr. Rehana Lakhani is a very professional and responsible professional. She not only treats the patient also gives proper knowledge and guideline for treatment and post treatment. ', 'Karachi' , '32 years in Dentistry, worked abroad and in Pakistan, got education from Pakistan, UAE, USA, Germany.Dr Rehana Delivered Lectures on Dentistry in many countries, as International Dental Speaker ,field of intrest Cosmetic,Laser,Orthodontic and General Dentistry, Dental research article writer', 4.7, 230, 3800, 32, 'https://images.app.goo.gl/cac6LmZdNiRgRyHAA' );

insert into doctor (doc_name, speciality,fee,reviews,city, description, rating, review_num, patient_num, experience, image) values ('Dr. Shahid Hussain Baloch', 'Urologist' , 1500, ' Very professional and well behaved doctor. Always recommend you all concerned patients to consult him. Thanks Dr Shahid hussain.' , 'Karachi', 'Dr. Shahid Hussain Baloch is one of the best urologists in Karachi with a high patient satisfaction rate. He has the following qualifications: MBBS, FCPS CPSP. He has expertise in the diagnosis, and treatment of any urinary tract conditions such as UTIs, urinary incontinence, interstitial cystitis, etc.' , 4.3, 256, 2560, 20, 'https://images.app.goo.gl/2hxDNYfCUQmN18GE8' );


insert into doctor (doc_name, speciality,fee,reviews,city, description, rating, review_num, patient_num, experience, image) values ('Dr. Shahab Javid', 'Urologist' , 3000, 'Amazing doctor, Had a great experience' , 'Karachi', 'Dr. Shahab Javid is an expert Urologist with 36 years of experience.Dr. Shahab Javid has the following qualifications: MBBS, F.R.C.S. - Glassgow', 4.7, 350, 3800, 36, 'https://images.app.goo.gl/MmqzyPPHDFQghbtH9' );

insert into doctor (doc_name, speciality,fee,reviews,city, description, rating, review_num, patient_num, experience, image) values ('Dr. Rana Nasir Ali Khan', 'Psychiatrist', 3000, 'Great Doctor. Gave ample time and listened carefully.', 'Lahore', 'Dr. Rana Nasir Ali Khan is a top Psychiatrist with 12 years of experience. Dr. Rana Nasir Ali Khan has the following qualifications: MBBS, FCPS. Following are some of the services offered by Dr. Rana Nasir Ali Khan: ADHD Treatment, Anxiety Disorders Treatment, Bipolar Disorder Treatment, Depression Treatment, Electroconvulsive Therapy', 4.0, 240, 700, 12, 'https://images.app.goo.gl/vATrZw1Xs35PUMPK7' );

insert into doctor (doc_name, speciality,fee,reviews,city, description, rating, review_num, patient_num, experience, image) values('Dr. Sumbal Altaf', 'Gynecologist', 3000, ' It was good experience. We had to wait a little but Dr Sumbl Altaf was extremely kind and checked with very detail. Thanks Dr we will visit again sure. ', 'Lahore', 'r. Sumbal Altaf is a graduate of Allama Iqbal Medical College. She has done Fellowship of College of Physicians and Surgeons of Pakistan FCPS in Obstetrics and Gynaecology. During her two years of Postgraduate training in Ireland, she completed Membership of Royal College of Physicians of Ireland MRCPI in Obstetrics and Gynaecology. She is also Diplomate Royal College of Obstetricians and Gynaecologists (DRCOG), UK. Currently she is working as a Consultant Gynecologist at Hameed Latif Hospital, Lahore and is a member of Laparoscopic (Key hole surgery) unit of Hameed Latif Hospital (MIGSU).', 4.9, 670, 3400, 13,'https://images.app.goo.gl/8yWe46rY1mkN6GhFA' );

insert into doctor (doc_name, speciality,fee,reviews,city, description, rating, review_num, patient_num, experience, image) values('Dr. Salahuddin', 'Urologist' , 3000, ' Good experience with dr islahudin... I recommend to visit dr islahudin.', 'Lahore', 'Dr. Salahuddin is a top Urologist with 11 years of experience.Dr. Salahuddin has the following qualifications: M.B.B.S, F.I.C.S (USA) ,M.S', 3.9, 254, 3200, 13, 'https://images.app.goo.gl/sbn3V28GxqRs7KZv5' );

insert into doctor (doc_name, speciality,fee,reviews,city, description, rating, review_num, patient_num, experience, image) values ('Dr. Muhammad Anees', 'Dermatologist', 2500, ' He has excellent diagnostic approach. He professionally examined my case. Highly recommend for skin problems. ', 'Lahore', 'Dr. Muhammad Anees is an expert Dermatologist with 10 years of experience currently practicing at Islamabad Diagnostic Center (IDC), Lahore. Dr. Muhammad Anees has the following qualifications: MBBS, FCPS (Dermatology)', 4.2, 231, 760, 10, 'https://images.app.goo.gl/5uJVFga4YWeXyphS7' );


insert into doctor (doc_name, speciality,fee,reviews,city, description, rating, review_num, patient_num, experience, image) values ('Dr. Ali Raza Jafri', 'Dentist', 3000, 'I am extremely pleased with Dr Ali. He is a truly knowledgeable person and very nice in conduct. His caring and thoroughness of each time I visit make him my favourite dentist in the town. ', 'Lahore', 'Assoc. Prof. Dr. Ali Raza jafri is a Dentist practicing in Lahore. Assoc. Prof. Dr. Ali Raza jafri has the following degree(s): M.Orth RCSEd (U.K), FCPS(ORTHODONTICS ), BDS(Gold Medalist)(de’Mont), RDS, B.Sc and has 13 years of experience', 4.2, 450, 2300, 13, 'https://images.app.goo.gl/AKB8bhk8osNRnu3c9' );



CREATE OR REPLACE TRIGGER delete_previous_otp
BEFORE INSERT ON otp
FOR EACH ROW
DECLARE
BEGIN
  -- Delete previous entry for the same email
  DELETE FROM otp
  WHERE email = :new.email;
  
END;
/

UPDATE doctor
SET image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsGhAqbGwF5-KwLB4fRXKE7X0f_3w8b9gxmq8ymuScYFX10wBpewHc4DBiCXb7NDtViFg'
WHERE doc_name = 'Dr. Nazifa Mubashir';

update doctor
set image = 'https://staticconnect.marham.pk/assets/doctors/30899/dr-fauzia-shafiq-gynecologist-karachi-22_450X450.jpg'
where doc_name = 'Dr. Fauzia Shafiq';

UPDATE doctor
SET image = 'https://southcityhospital.org/images/dr-gohar-alam.jpg'
WHERE doc_name = 'Dr. Syed Gauhar Alam';

UPDATE doctor
SET image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFA2FJgnOjM5Pbu0sjLBQZud5-0uXT5LjZoEFW0cIid0R6xqXuVpB_Hgz3XFAwqRmFHY'
WHERE doc_name = 'Dr. Hina Fahad';


UPDATE doctor
SET image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5AsDaDYF-gP7XGGJzpyDdiwrVXXh80wlJPDDIuB4ox4E444z30ibd5I9CgZxd2DP1ajs'
WHERE doc_name = 'Dr. Jawed Akbar Dars';

UPDATE doctor
SET image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT27Z9Rz1Tik0nMG4_foFpO3eHXD9oYZMuggqP2dOc4OPG6qtjAbcmcg6qkjPyyakroPf0'
WHERE doc_name = 'Dr. Aneel Kumar Keswani';

UPDATE doctor 
SET image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOew7_t7ET0TbvXvK2PdzF0kbEcm5GYLLtmdf1Lykjk-lo-hKaNjjj1Q7QkIuPE9RCWxU'
WHERE doc_name = 'Dr. Farhan Naushad Ali Khan';

UPDATE doctor
SET image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1YZ0O52g0R6hCTQPwKJ3tawl4pxBv2CcNyNfAcmCzX4PvC56HAIJOcQM1Npyx8xYrd44'
WHERE doc_name = 'Dr. Rehana Lakhani';

update doctor
set image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsT8hJezvxZQgUyNE5_6qw9rM1S_S4brHYbAHA7L3EZxgvTdoY4SNQvDdgaqCr5l8mLl4&usqp=CAU'
where doc_name = 'Dr. Shahid Hussain Baloch';

UPDATE doctor
SET image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsT8hJezvxZQgUyNE5_6qw9rM1S_S4brHYbAHA7L3EZxgvTdoY4SNQvDdgaqCr5l8mLl4'
WHERE doc_name = 'Dr. Shahid Hussain Baloch';


UPDATE doctor
SET image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHLpbJq0Du1j25-pBmtpFcpDePGxSuPmedTS0FhOu2yIqz7wD6D8RigSu8VFy-vBOtY_4'
WHERE doc_name = 'Dr. Shahab Javid';

UPDATE doctor
SET image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyc2bKQNQfFLt8SJa-3Wb72gVC4aXTP-dsr4Ay4z0YA2A-Yx6e2Bf1wMM-1nmFblmECfk'
WHERE doc_name = 'Dr. Rana Nasir Ali Khan';

UPDATE doctor
SET image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaS0HWZgDDNhZLCw-RAaChT_30HrCruwuil8xlfFrJ8rumUb-XDvN32CrTlQ4qCBgQDBw'
WHERE doc_name = 'Dr. Sumbal Altaf';


UPDATE doctor
SET image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQINDEK2kxjGUDJycxRUQheb630B9qmf56dzVud4BVxpASeJkQy-kv5r-CF5P5PxEjnsM'
WHERE doc_name = 'Dr. Salahuddin';


UPDATE doctor
SET image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnMM1Y0CBClemrUipg4O1O5itraL5SQQViwCeoZmzmyWRZSj8tM5F96Q5-HpzC8kd4ipc'
WHERE doc_name = 'Dr. Muhammad Anees';

UPDATE doctor
SET image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTErMcIrAsVg0pcHM65P3H5XjznhJp5dtviOtNIbZ-g1ztWasLH_PWmN1B8_HbDQdYUW38'
WHERE doc_name = 'Dr. Ali Raza Jafri';



commit;