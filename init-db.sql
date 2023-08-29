CREATE DATABASE npc_irs_db;

\connect npc_irs_db

CREATE SCHEMA IF NOT EXISTS public;

CREATE SEQUENCE IF NOT EXISTS public.tasks_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE SEQUENCE IF NOT EXISTS public.users_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE public.tasks
(
    id          integer      NOT NULL,
    task        varchar(255) NOT NULL,
    description text,
    status      varchar(63)  NOT NULL,
    progress    numeric      NOT NULL DEFAULT 0.0,
    created_at  date         NOT NULL DEFAULT NOW(),
    user_id     integer,
    CONSTRAINT tasks_pkey PRIMARY KEY (id)
);

CREATE TABLE public.users
(
    id               integer     NOT NULL,
    username         varchar(63) NOT NULL,
    password         text        NOT NULL,
    task_amount      integer     NOT NULL DEFAULT 0,
    overall_progress numeric     NOT NULL DEFAULT 0.0,
    created_at       date        NOT NULL DEFAULT NOW(),
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_username_key UNIQUE (username)
);

ALTER TABLE IF EXISTS public.tasks
    ADD
        CONSTRAINT tasks_user_id_fkey FOREIGN KEY (user_id)
            REFERENCES public.users (id) MATCH SIMPLE
            ON UPDATE CASCADE
            ON DELETE SET NULL;

ALTER SEQUENCE public.tasks_id_seq
    OWNED BY tasks.id;

ALTER SEQUENCE public.users_id_seq
    OWNED BY users.id;

ALTER TABLE IF EXISTS public.tasks
    ALTER COLUMN id SET DEFAULT nextval('tasks_id_seq'::regclass);

ALTER TABLE IF EXISTS public.users
    ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);


CREATE OR REPLACE FUNCTION public.on_delete_func()
    RETURNS trigger
    LANGUAGE plpgsql
AS
$BODY$
begin
    update users
    set task_amount=task_amount - 1
    where id = old.user_id;

    CREATE TEMP TABLE selected AS
    SELECT COUNT(*) AS count, SUM(progress) AS summ, user_id
    FROM public.tasks
    GROUP BY user_id
    HAVING user_id = old.user_id;
    UPDATE users
    SET overall_progress = selected.summ / selected.count
    FROM selected
    WHERE users.id = selected.user_id;
    DROP TABLE selected;
    return null;
end;
$BODY$;

CREATE TRIGGER on_delete_trigger
    AFTER DELETE
    ON public.tasks
    FOR EACH ROW
EXECUTE FUNCTION public.on_delete_func();

CREATE OR REPLACE FUNCTION public.calculate_progress()
    RETURNS TRIGGER
    LANGUAGE plpgsql
AS
$BODY$
BEGIN
    CREATE TEMP TABLE selected AS
    SELECT COUNT(*) AS count, SUM(progress) AS summ, user_id
    FROM public.tasks
    GROUP BY user_id
    HAVING user_id = new.user_id;
    UPDATE users
    SET overall_progress = selected.summ / selected.count
    FROM selected
    WHERE users.id = selected.user_id;
    DROP TABLE selected;
    return null;
END;
$BODY$;

CREATE TRIGGER on_change_trigger
    AFTER INSERT OR UPDATE
    ON public.tasks
    FOR EACH ROW
EXECUTE FUNCTION public.calculate_progress();

CREATE OR REPLACE FUNCTION on_insert_func()
    RETURNS trigger
    LANGUAGE plpgsql
AS
$BODY$
begin
    UPDATE public.users
    SET task_amount=task_amount + 1
    WHERE id = new.user_id;
    return null;
end;
$BODY$;

CREATE TRIGGER on_insert_trigger
    AFTER INSERT
    ON public.tasks
    FOR EACH ROW
EXECUTE FUNCTION public.on_insert_func();

DO
$$
    BEGIN
        FOR i IN 1..30
            LOOP
                INSERT INTO users(username, password)
                VALUES (md5(random()::text), md5(random()::text));
            END LOOP;
    END;
$$;

DO
$$
    BEGIN
        FOR i IN 1..30
            LOOP
                INSERT INTO tasks(task, description, status, progress, user_id)
                VALUES (md5(random()::text), md5(random()::text), 'Working', random(), floor(random() * 30) + 1);
            END LOOP;
    END;
$$;

