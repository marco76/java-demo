CREATE TABLE Conference(id BIGINT AUTO_INCREMENT PRIMARY KEY, name VARCHAR2(50), website VARCHAR2(100), edition SMALLINT, languages VARCHAR2(20), begin DATE, end DATE, cfp DATE, city VARCHAR2(30), country VARCHAR2(30), confirmed boolean, iso_country VARCHAR(5));

CREATE UNIQUE INDEX Conference_id_uindex ON Conference (id);
CREATE INDEX Conference_begin ON Conference(begin);