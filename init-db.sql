CREATE DATABASE test_online_store WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1252'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'npc_irs_db')\gexec;

ALTER DATABASE npc_irs_db OWNER TO postgres;

\connect npc_irs_db

ALTER SCHEMA public OWNER TO postgres;

CREATE TABLE public.table1 (
    id integer NOT NULL,
    "number" integer
);

ALTER TABLE public.table1 OWNER TO postgres;

CREATE SEQUENCE public.table1_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.table1_id_seq OWNER TO postgres;

ALTER SEQUENCE public.table1_id_seq OWNED BY public.table1.id;

CREATE TABLE public.table2 (
    id integer NOT NULL,
    "number" integer
);

ALTER TABLE public.table2 OWNER TO postgres;

CREATE SEQUENCE public.table2_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.table2_id_seq OWNER TO postgres;

ALTER SEQUENCE public.table2_id_seq OWNED BY public.table2.id;