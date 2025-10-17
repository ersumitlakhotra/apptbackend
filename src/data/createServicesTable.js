import pool from "../config/db.js";

const createServicesTable = async () => {

    const queryText = `
CREATE TABLE IF NOT EXISTS public.services
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    cid bigint,
    title text COLLATE pg_catalog."default",
    createdat timestamp with time zone,
    modifiedat timestamp with time zone,
    price text COLLATE pg_catalog."default",
    timing text COLLATE pg_catalog."default",
    status text COLLATE pg_catalog."default",
    CONSTRAINT services_pkey PRIMARY KEY (id),
    CONSTRAINT cid FOREIGN KEY (cid)
        REFERENCES public.company (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.services
    OWNER to postgres;`;

    try {
        pool.query(queryText);
        console.log("User Table Created");
    } catch (error) {

        console.log("Error Creating User table :", error);
    }
}

export default createServicesTable;