-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/NWbJTZ
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Customer
-- -
-- CustomerID PK int
-- Name string INDEX
-- Address1 string
-- Address2 NULL string
-- Address3 NULL string
-- Order
-- -
-- OrderID PK int
-- CustomerID int FK >- Customer.CustomerID
-- TotalAmount money
-- OrderStatusID int FK >- os.OrderStatusID
-- OrderLine as ol
-- ----
-- OrderLineID PK int
-- OrderID int FK >- Order.OrderID
-- ProductID int FK >- p.ProductID
-- Quantity int
-- Product as p
-- ------------
-- ProductID PK int
-- Name varchar(200) UNIQUE
-- Price money
-- OrderStatus as os
-- ----
-- OrderStatusID PK int
-- Name UNIQUE string

CREATE TABLE "answers" (
    "answers_id" varchar   NOT NULL,
    "answers_author_id" varchar   NOT NULL,
    "answers_question_id" varchar   NOT NULL,
    "answers_date_added" datetime   NOT NULL,
    "answers_body" string   NOT NULL,
    CONSTRAINT "pk_answers" PRIMARY KEY (
        "answers_id"
     )
);

CREATE TABLE "comments" (
    "comments_id" varchar   NOT NULL,
    "comments_author_id" varchar   NOT NULL,
    "comments_parent_content_id" varchar   NOT NULL,
    "comments_date_added" datetime   NOT NULL,
    "comments_body" varchar   NOT NULL,
    CONSTRAINT "pk_comments" PRIMARY KEY (
        "comments_id"
     )
);

CREATE TABLE "emails" (
    "emails_id" varchar   NOT NULL,
    "emails_recipient_id" varchar   NOT NULL,
    "emails_date_sent" datetime   NOT NULL,
    "emails_frequency_level" varchar   NOT NULL,
    CONSTRAINT "pk_emails" PRIMARY KEY (
        "emails_id"
     )
);

CREATE TABLE "group_memberships" (
    "group_memberships_group_id" varchar   NOT NULL,
    "group_memberships_user_id" varchar   NOT NULL
);

CREATE TABLE "groups" (
    "groups_id" varchar   NOT NULL,
    "groups_group_type" varchar   NOT NULL,
    CONSTRAINT "pk_groups" PRIMARY KEY (
        "groups_id"
     )
);

CREATE TABLE "matches" (
    "matches_email_id" varchar   NOT NULL,
    "matches_question_id" varchar   NOT NULL
);

CREATE TABLE "professionals" (
    "professionals_id" varchar   NOT NULL,
    "professionals_location" varchar   NOT NULL,
    "professionals_industry" varchar   NOT NULL,
    "professionals_headline" varchar   NOT NULL,
    "professionals_date_joined" datetime   NOT NULL,
    CONSTRAINT "pk_professionals" PRIMARY KEY (
        "professionals_id"
     )
);

CREATE TABLE "questions" (
    "questions_id" varchar   NOT NULL,
    "questions_author_id" varchar   NOT NULL,
    "questions_date_added" datetime   NOT NULL,
    "questions_title" varchar   NOT NULL,
    "questions_body" string   NOT NULL,
    CONSTRAINT "pk_questions" PRIMARY KEY (
        "questions_id"
     )
);

CREATE TABLE "school_memberships" (
    "school_memberships_school_id" varchar   NOT NULL,
    "school_memberships_user_id" varchar   NOT NULL
);

CREATE TABLE "students" (
    "students_id" varchar   NOT NULL,
    "students_location" varchar   NOT NULL,
    "students_date_joined" varchar   NOT NULL,
    CONSTRAINT "pk_students" PRIMARY KEY (
        "students_id"
     )
);

ALTER TABLE "answers" ADD CONSTRAINT "fk_answers_answers_author_id" FOREIGN KEY("answers_author_id")
REFERENCES "professionals" ("professionals_id");

ALTER TABLE "answers" ADD CONSTRAINT "fk_answers_answers_question_id" FOREIGN KEY("answers_question_id")
REFERENCES "questions" ("questions_id");

ALTER TABLE "group_memberships" ADD CONSTRAINT "fk_group_memberships_group_memberships_group_id" FOREIGN KEY("group_memberships_group_id")
REFERENCES "groups" ("groups_id");

ALTER TABLE "matches" ADD CONSTRAINT "fk_matches_matches_email_id" FOREIGN KEY("matches_email_id")
REFERENCES "emails" ("emails_id");

ALTER TABLE "matches" ADD CONSTRAINT "fk_matches_matches_question_id" FOREIGN KEY("matches_question_id")
REFERENCES "questions" ("questions_id");

ALTER TABLE "questions" ADD CONSTRAINT "fk_questions_questions_author_id" FOREIGN KEY("questions_author_id")
REFERENCES "students" ("students_id");

