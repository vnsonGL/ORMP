use master
go
if DB_ID('OMRP') IS NOT NULL
   DROP DATABASE OMRP
GO

CREATE DATABASE OMRP
GO

USE OMRP
GO

SET DATEFORMAT 'YMD'

CREATE TABLE ACCOUNT(
	ID_LOGIN char(5),
	USERNAME CHAR(20),
	PASS CHAR(20),
	CREATED_DATE DATETIME,
	ROLE NVARCHAR(20),
	
	CONSTRAINT PK_ACCOUNT PRIMARY KEY (ID_LOGIN)
)

CREATE TABLE PARTNERS(
	ID_PARTNERS CHAR(5),
	NAME NVARCHAR(80),
	EMAIL CHAR(50),
	ADDRESS NVARCHAR(200),
	PHONE CHAR(10),
	
	CONSTRAINT PK_PARTNERS PRIMARY KEY (ID_PARTNERS)
)

CREATE TABLE CUSTOMERS(
	ID_CUSTOMERS CHAR(5),
	NAME NVARCHAR(80),
	BIRTHDAY DATE,
	ADDRESS NVARCHAR(200),
	EMAIL CHAR(50),
	PHONE CHAR(10),
	
	CONSTRAINT PK_CUSTOMERS PRIMARY KEY (ID_CUSTOMERS)
)

CREATE TABLE EMPLOYEES(
	ID_EMP CHAR(5),
	NAME NVARCHAR(20),
	BIRTHDAY DATE,
	EMAIL CHAR(50),
	PHONE CHAR(10),
	ADDRESS NVARCHAR(200),
	SALARY FLOAT,
	ALLOWANCE FLOAT,
	ROLE NVARCHAR(20),
	
	CONSTRAINT PK_EMP PRIMARY KEY (ID_EMP)
)

CREATE TABLE ACCUMULATION_POINTS(
	ID_CUSTOMERS CHAR(5),
	ID_TYPEP CHAR(5),
	POINTS INT,
	
	CONSTRAINT PK_POINTSOFCUS PRIMARY KEY (ID_CUSTOMERS, ID_TYPEP)
)

CREATE TABLE CART(
	ID_CUSTOMERS CHAR(5),
	ID_PRODUCTS INT,
	NAME_PRODUCTS NVARCHAR(80),
	PRICE INT,
	QUANTITY INT,
	POINT_TYPE NVARCHAR(50),
	
	CONSTRAINT PK_CART PRIMARY KEY (ID_CUSTOMERS, NAME_PRODUCTS)
)

CREATE TABLE PRODUCTS(
	ID_PRODUCTS INT,
	NAME NVARCHAR(80),
	INFOR_PRODUCTS NVARCHAR(200),
	ADD_DATE DATETIME,
	QUANTITY INT,
	PRICE INT,
	
	CONSTRAINT PK_PRODUCTS PRIMARY KEY (ID_PRODUCTS)
)

CREATE TABLE TYPE_PRODUCTS(
	ID_PRODUCTS INT,
	TYPE_PROD NVARCHAR(20),
	
	CONSTRAINT PK_TYPEOFPROD PRIMARY KEY (ID_PRODUCTS, TYPE_PROD)
)

CREATE TABLE EXCHANGE_POINT(
	ID_PRODUCTS INT,
	PRICE INT,
	ID_PARTNERS CHAR(5),
	
	CONSTRAINT PK_EXPOINTS PRIMARY KEY (ID_PRODUCTS, ID_PARTNERS)
)

CREATE TABLE HISTORY(
	ID_TRADE INT,
	ID_CUSTOMERS CHAR(5),
	ID_PRODUCTS INT,
	NAME NVARCHAR(80),
	DATE_TRADE DATETIME,
	TOTAL_POINTS INT,
	QUANTITY INT,
	POINT_TYPE CHAR(5),
	
	CONSTRAINT PK_TRADE PRIMARY KEY (ID_TRADE)
)

CREATE TABLE CHATBOX(
	ID_CHAT CHAR(10),
	ID_CUSTOMERS CHAR(5),
	CREATED_DATE DATE,
	STATUS CHAR(20),
	
	CONSTRAINT PK_CHATBOX PRIMARY KEY (ID_CHAT)
)

CREATE TABLE CONTENT_CHATBOX(
	STT INT,
	ID_CHAT CHAR(10),
	MESSAGE_CREATED DATETIME,
	CONTENT NVARCHAR(200),
	RATE NCHAR(3),
	
	CONSTRAINT PK_CONTENT_CHATBOX PRIMARY KEY (STT, ID_CHAT)
)

CREATE TABLE CONTRACT(
	ID_CONTRACT CHAR(5),
	TAX CHAR(10),
	DEPUTY NVARCHAR(100),
	DATE_CONTRACT DATETIME,
	EFFECTIVE_TIME DATETIME,
	AMOUNTTOPOINTS FLOAT,
	COMMISSION INT,
	CONTRACT_MANAGER CHAR(5),
	CONTRACT_PARTNER CHAR(5),
	STATUS NVARCHAR(10),

	CONSTRAINT PK_CONTRACT PRIMARY KEY (ID_CONTRACT)
)

CREATE TABLE FEEDBACK(
	STT INT,
	ID_PRODUCTS INT,
	ID_CUSTOMERS CHAR(5),
	NAME NVARCHAR(80),
	FEEDBACK NVARCHAR(100),
	RATE INT,
	CREATED_DATE DATETIME,

	CONSTRAINT PK_FEEDBACK PRIMARY KEY (STT, ID_PRODUCTS, ID_CUSTOMERS)
)

CREATE TABLE PAY(
	ID_REVENUE INT,
	ID_PARTNER CHAR(5),
	MONTH_REV INT,
	YEAR_REV INT,
	TOTAL_POINTS INT,

	CONSTRAINT PK_PAY PRIMARY KEY (ID_REVENUE)
)

CREATE TABLE DETAIL_PAY(
	STT INT,
	ID_REVENUE INT,
	MONTH_REV INT,
	DAY_REV INT,
	POINTS INT,
	QUANTITY INT,
	TOTAL INT,

	CONSTRAINT PK_DETAIL_PAY PRIMARY KEY (STT,ID_REVENUE,MONTH_REV)
)

--CUSTOMERS(ID_CUSTOMERS) -> ACCOUNT(ID_LOGIN)
ALTER TABLE CUSTOMERS
ADD CONSTRAINT FK_CUSTOMERS
FOREIGN KEY (ID_CUSTOMERS)
REFERENCES ACCOUNT(ID_LOGIN)

--PARTNER(ID_PARTNERS) -> ACCOUNT(ID_LOGIN)
ALTER TABLE PARTNERS
ADD CONSTRAINT FK_PARTNERS
FOREIGN KEY (ID_PARTNERS)
REFERENCES ACCOUNT(ID_LOGIN)

--EMPLOYEES(ID_EMP) -> ACCOUNT(ID_LOGIN)
ALTER TABLE EMPLOYEES
ADD CONSTRAINT FK_EMP
FOREIGN KEY (ID_EMP)
REFERENCES ACCOUNT(ID_LOGIN)

--CONTRACT(CONTRACT_MANAGER) -> EMPLOYEES(ID_EMP)
ALTER TABLE CONTRACT
ADD CONSTRAINT FK_MANAGER
FOREIGN KEY (CONTRACT_MANAGER)
REFERENCES EMPLOYEES(ID_EMP)

--CONTRACT(CONTRACT_PARTNER) -> PARTNERS(ID_PARTNERS)
ALTER TABLE CONTRACT
ADD CONSTRAINT FK_CONTRACT_PARTNER
FOREIGN KEY (CONTRACT_PARTNER)
REFERENCES PARTNERS(ID_PARTNERS)

--ACCUMULATION_POINTS(ID_CUSTOMERS) -> CUSTOMERS(ID_CUSTOMERS)
ALTER TABLE ACCUMULATION_POINTS
ADD CONSTRAINT FK_ACCUMULATION_CUS
FOREIGN KEY (ID_CUSTOMERS)
REFERENCES CUSTOMERS(ID_CUSTOMERS)

--ACCUMULATION_POINTS(ID_TYPEP) -> TYPE_POINTS(ID_TYPEP)
ALTER TABLE ACCUMULATION_POINTS
ADD CONSTRAINT FK_ACCUMULATION_TYPE
FOREIGN KEY (ID_TYPEP)
REFERENCES PARTNERS(ID_PARTNERS)

--CART(ID_CUSTOMERS) -> CUSTOMERS(ID_CUSTOMERS)
ALTER TABLE CART
ADD CONSTRAINT FK_CUS_CART
FOREIGN KEY (ID_CUSTOMERS)
REFERENCES CUSTOMERS(ID_CUSTOMERS)

--CART(ID_PRODUCTS) -> PRODUCTS(ID_PRODUCTS)
ALTER TABLE CART
ADD CONSTRAINT FK_PROD_CART
FOREIGN KEY (ID_PRODUCTS)
REFERENCES PRODUCTS(ID_PRODUCTS)

--TYPE_PRODUCTS(ID_PRODUCTS) -> PRODUCTS(ID_PRODUCTS)
ALTER TABLE TYPE_PRODUCTS
ADD CONSTRAINT FK_TYPE_PROD
FOREIGN KEY (ID_PRODUCTS)
REFERENCES PRODUCTS(ID_PRODUCTS)

--EXCHANGE_POINT(ID_PRODUCTS) -> PRODUCTS(ID_PRODUCTS)
ALTER TABLE EXCHANGE_POINT
ADD CONSTRAINT FK_EXC_PROD
FOREIGN KEY (ID_PRODUCTS)
REFERENCES PRODUCTS(ID_PRODUCTS)

--EXCHANGE_POINT(ID_TYPEP) -> TYPE_POINTS(ID_TYPEP)
ALTER TABLE EXCHANGE_POINT
ADD CONSTRAINT FK_EXC_POINTS
FOREIGN KEY (ID_PARTNERS)
REFERENCES PARTNERS(ID_PARTNERS)

--HISTORY(ID_PRODUCTS) -> PRODUCTS(ID_PRODUCTS)
ALTER TABLE HISTORY
ADD CONSTRAINT FK_HIS_PROD
FOREIGN KEY (ID_PRODUCTS)
REFERENCES PRODUCTS(ID_PRODUCTS)

--HISTORY(ID_CUSTOMERS) -> CUSTOMERS(ID_CUSTOMERS)
ALTER TABLE HISTORY
ADD CONSTRAINT FK_HIS_CUS
FOREIGN KEY (ID_CUSTOMERS)
REFERENCES CUSTOMERS(ID_CUSTOMERS)

--HISTORY(POINT_TYPE) -> TYPE_POINTS(ID_TYPEP)
ALTER TABLE HISTORY
ADD CONSTRAINT FK_TYPOINTS
FOREIGN KEY (POINT_TYPE)
REFERENCES PARTNERS(ID_PARTNERS)

--CHATBOX(ID_CUSTOMERS) -> CUSTOMERS(ID_CUSTOMERS)
ALTER TABLE CHATBOX
ADD CONSTRAINT FK_CB_CUS
FOREIGN KEY (ID_CUSTOMERS)
REFERENCES CUSTOMERS(ID_CUSTOMERS)

--CONTENT_CHATBOX(ID_CHAT) -> CHATBOX(ID_CHAT)
ALTER TABLE CONTENT_CHATBOX
ADD CONSTRAINT FK_CB_CONTENT
FOREIGN KEY (ID_CHAT)
REFERENCES CHATBOX(ID_CHAT)

--FEEDBACK(ID_PRODUCTS) -> PRODUCTS(ID_PRODUCTS)
ALTER TABLE FEEDBACK
ADD CONSTRAINT FK_FB_PROD
FOREIGN KEY (ID_PRODUCTS)
REFERENCES PRODUCTS(ID_PRODUCTS)

--FEEDBACK(ID_CUSTOMERS) -> CUSTOMERS(ID_CUSTOMERS)
ALTER TABLE FEEDBACK
ADD CONSTRAINT FK_FB_CUS
FOREIGN KEY (ID_CUSTOMERS)
REFERENCES CUSTOMERS(ID_CUSTOMERS)
