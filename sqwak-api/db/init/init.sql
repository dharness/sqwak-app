-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2017-02-08 19:37:20.577

-- tables
-- Table: audio_sample
CREATE TABLE audio_sample (
    id serial  NOT NULL,
    ml_class_id serial  NOT NULL,
    features integer[]  NOT NULL,
    original_file_name varchar(100)  NOT NULL,
    extraction_method varchar(100)  NOT NULL,
    start int  NOT NULL,
    "end" int  NOT NULL,
    salience int  NOT NULL,
    CONSTRAINT audio_sample_pk PRIMARY KEY (id)
);

-- Table: ml_app
CREATE TABLE ml_app (
    id serial  NOT NULL,
    owner_id serial  NOT NULL,
    app_name varchar(100)  NOT NULL,
    updated_at timestamp  NOT NULL,
    created_at timestamp  NOT NULL,
    query_url varchar(200)  NOT NULL,
    ml_class_id int  NOT NULL,
    CONSTRAINT ml_app_pk PRIMARY KEY (id)
);

-- Table: ml_class
CREATE TABLE ml_class (
    id serial  NOT NULL,
    audio_samples_id int  NOT NULL,
    is_edited boolean  NOT NULL,
    updated_at timestamp  NOT NULL,
    created_At timestamp  NOT NULL,
    ml_app_id serial  NOT NULL,
    CONSTRAINT ml_class_pk PRIMARY KEY (id)
);

-- Table: user
CREATE TABLE "user" (
    id serial  NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- foreign keys
-- Reference: ml_apps_ml_class (table: ml_class)
ALTER TABLE ml_class ADD CONSTRAINT ml_apps_ml_class
    FOREIGN KEY (ml_app_id)
    REFERENCES ml_app (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: ml_class_audio_samples (table: audio_sample)
ALTER TABLE audio_sample ADD CONSTRAINT ml_class_audio_samples
    FOREIGN KEY (ml_class_id)
    REFERENCES ml_class (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: users_apps (table: ml_app)
ALTER TABLE ml_app ADD CONSTRAINT users_apps
    FOREIGN KEY (owner_id)
    REFERENCES "user" (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

