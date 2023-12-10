DROP TABLE TRECHOS;
DROP TABLE AERONAVES;
DROP TABLE AEROPORTOS;
DROP TABLE VOOS;
DROP TABLE INDISPONIVEIS;

DROP SEQUENCE AEROPORTOS_SEQ;
DROP SEQUENCE AERONAVES_SEQ;
DROP SEQUENCE VOOS_SEQ;
DROP SEQUENCE INDISPONIVEIS_SEQ;
DROP SEQUENCE TRECHOS_SEQ;

CREATE SEQUENCE AERONAVES_SEQ START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE AEROPORTOS_SEQ START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE VOOS_SEQ START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE TRECHOS_SEQ START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE INDISPONIVEIS_SEQ START WITH 1 INCREMENT BY 1;

CREATE TABLE AEROPORTOS(
    CODIGO INTEGER DEFAULT AEROPORTOS_SEQ.NEXTVAL NOT NULL PRIMARY KEY, 
    NOME VARCHAR2(500) NOT NULL,
    SIGLA VARCHAR2(10) NOT NULL,
    CIDADE VARCHAR2(200) NOT NULL,
    PAIS VARCHAR2(100) NOT NULL,
    CONSTRAINT UN_SIGLA UNIQUE(SIGLA)
);

CREATE TABLE AERONAVES(
    CODIGO INTEGER DEFAULT AERONAVES_SEQ.NEXTVAL NOT NULL PRIMARY KEY,
    FABRICANTE VARCHAR2(100) NOT NULL,
    MODELO VARCHAR2(100) NOT NULL,
    ANO_FABRICACAO INTEGER NOT NULL,
    TOTAL_ASSENTOS INTEGER NOT NULL,
    REFERENCIA VARCHAR2(10) NOT NULL,
    
    CONSTRAINT CK_FABRICANTE_VALIDO CHECK 
        (FABRICANTE IN ('Airbus', 'Boeing', 'Embraer')),
        
    CONSTRAINT CK_ANO_VALIDO CHECK 
        (ANO_FABRICACAO BETWEEN 1990 AND 2023),

    CONSTRAINT CK_TOTAL_ASSENTOS CHECK
        (TOTAL_ASSENTOS BETWEEN 100 AND 525),
    
    CONSTRAINT UN_REFERENCIA UNIQUE (REFERENCIA)
);

CREATE TABLE VOOS(
    CODIGO INTEGER DEFAULT VOOS_SEQ.NEXTVAL NOT NULL PRIMARY KEY,
    TRECHO INTEGER NOT NULL,
    ESCALAS INTEGER,
    VALOR_PASSAGEM INTEGER NOT NULL,
    DATA_SAIDA VARCHAR2(20),
    HORA_SAIDA VARCHAR2(20),
    DATA_CHEGADA VARCHAR2(20),
    HORA_CHEGADA VARCHAR2(20),
    DATA_VOLTA VARCHAR2(20),
    HORA_VOLTA VARCHAR2(20),
    DATA_CHEGADA2 VARCHAR2(20),
    HORA_CHEGADA2 VARCHAR2(20),
    
    CONSTRAINT FK_AERONAVE FOREIGN KEY(AERONAVE)
    REFERENCES AERONAVES(CODIGO),

    CONSTRAINT FK_TRECHO FOREIGN KEY (TRECHO)
    REFERENCES TRECHOS(CODIGO)
);

CREATE TABLE TRECHOS(
    CODIGO INTEGER DEFAULT TRECHOS_SEQ.NEXTVAL NOT NULL PRIMARY KEY,
    NOME VARCHAR2(200) NOT NULL,
    ORIGEM INTEGER NOT NULL,
    DESTINO INTEGER NOT NULL,
    AERONAVE INTEGER NOT NULL,
    ESTILO_VOO VARCHAR2(11) NOT NULL,
    
    CONSTRAINT CK_ORIGEM_DESTINO_DIFERENTES CHECK (ORIGEM != DESTINO)
);

CREATE TABLE INDISPONIVEIS (
    CODIGO INTEGER DEFAULT ASSENTOS_OCUPADOS_SEQ.NEXTVAL NOT NULL PRIMARY KEY,
    CODIGO_VOO INTEGER NOT NULL,
    NUMERO_ASSENTO INTEGER NOT NULL,
    CONSTRAINT FK_ASS_OCUP_VOO FOREIGN KEY (CODIGO_VOO) REFERENCES VOOS (CODIGO),
    CONSTRAINT UN_ASS_OCUP UNIQUE (CODIGO_VOO, NUMERO_ASSENTO)
);