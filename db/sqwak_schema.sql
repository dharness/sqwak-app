--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.1
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: audio_sample; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE audio_sample (
    id integer NOT NULL,
    ml_class_id integer NOT NULL,
    features integer[] NOT NULL,
    extraction_method character varying NOT NULL,
    label character varying NOT NULL,
    in_point integer,
    out_point integer,
    salience integer
);


ALTER TABLE audio_sample OWNER TO postgres;

--
-- Name: audio_sample_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE audio_sample_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE audio_sample_id_seq OWNER TO postgres;

--
-- Name: audio_sample_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE audio_sample_id_seq OWNED BY audio_sample.id;


--
-- Name: ml_app; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE ml_app (
    id integer NOT NULL,
    owner_id character varying NOT NULL,
    app_name character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    query_url character varying,
    working_model character varying,
    published_model character varying,
    is_published boolean NOT NULL
);


ALTER TABLE ml_app OWNER TO postgres;

--
-- Name: ml_app_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE ml_app_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ml_app_id_seq OWNER TO postgres;

--
-- Name: ml_app_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE ml_app_id_seq OWNED BY ml_app.id;


--
-- Name: ml_class; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE ml_class (
    id integer NOT NULL,
    ml_app_id integer,
    class_name character varying NOT NULL,
    img_name character varying,
    package_name character varying NOT NULL,
    is_edited boolean,
    in_model boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE ml_class OWNER TO postgres;

--
-- Name: ml_class_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE ml_class_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ml_class_id_seq OWNER TO postgres;

--
-- Name: ml_class_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE ml_class_id_seq OWNED BY ml_class.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE "user" (
    id character varying NOT NULL,
    email character varying(64) NOT NULL
);


ALTER TABLE "user" OWNER TO postgres;

--
-- Name: audio_sample id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY audio_sample ALTER COLUMN id SET DEFAULT nextval('audio_sample_id_seq'::regclass);


--
-- Name: ml_app id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ml_app ALTER COLUMN id SET DEFAULT nextval('ml_app_id_seq'::regclass);


--
-- Name: ml_class id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ml_class ALTER COLUMN id SET DEFAULT nextval('ml_class_id_seq'::regclass);


--
-- Name: audio_sample audio_sample_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY audio_sample
    ADD CONSTRAINT audio_sample_pkey PRIMARY KEY (id);


--
-- Name: ml_app ml_app_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ml_app
    ADD CONSTRAINT ml_app_pkey PRIMARY KEY (id);


--
-- Name: ml_class ml_class_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ml_class
    ADD CONSTRAINT ml_class_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: audio_sample audio_sample_ml_class_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY audio_sample
    ADD CONSTRAINT audio_sample_ml_class_id_fkey FOREIGN KEY (ml_class_id) REFERENCES ml_class(id);


--
-- Name: ml_app ml_app_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ml_app
    ADD CONSTRAINT ml_app_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES "user"(id);


--
-- Name: ml_class ml_class_ml_app_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY ml_class
    ADD CONSTRAINT ml_class_ml_app_id_fkey FOREIGN KEY (ml_app_id) REFERENCES ml_app(id);


--
-- PostgreSQL database dump complete
--

