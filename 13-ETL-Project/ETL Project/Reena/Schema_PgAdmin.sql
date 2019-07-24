CREATE TABLE "answers" (
    "answers_id" varchar   NOT NULL,
    "answers_author_id" varchar  ,
    "answers_question_id" varchar   ,
    "answers_date_added" date  ,
    "answers_body" varchar   ,
    CONSTRAINT "pk_answers" PRIMARY KEY (
        "answers_id"
     )
);

CREATE TABLE "comments" (
    "comments_id" varchar   NOT NULL,
    "comments_author_id" varchar   ,
    "comments_parent_content_id" varchar  ,
    "comments_date_added" date,
    "comments_body" varchar,
    CONSTRAINT "pk_comments" PRIMARY KEY (
        "comments_id"
     )
);

CREATE TABLE "emails" (
    "emails_id" varchar   NOT NULL,
    "emails_recipient_id" varchar,
    "emails_date_sent" date,
    "emails_frequency_level" varchar,
    CONSTRAINT "pk_emails" PRIMARY KEY (
        "emails_id"
     )
);

CREATE TABLE "group_memberships" (
    "group_memberships_group_id" varchar ,
    "group_memberships_user_id" varchar  
);

CREATE TABLE "groups" (
    "groups_id" varchar   NOT NULL,
    "groups_group_type" varchar ,
    CONSTRAINT "pk_groups" PRIMARY KEY (
        "groups_id"
     )
);

CREATE TABLE "matches" (
    "matches_email_id" varchar  ,
    "matches_question_id" varchar
);

CREATE TABLE "professionals" (
    "professionals_id" varchar   NOT NULL,
    "professionals_location" varchar,
    "professionals_industry" varchar,
    "professionals_headline" varchar,
    "professionals_date_joined" date,
    CONSTRAINT "pk_professionals" PRIMARY KEY (
        "professionals_id"
     )
);

CREATE TABLE "questions" (
    "questions_id" varchar   NOT NULL,
    "questions_author_id" varchar  ,
    "questions_date_added" date   ,
    "questions_title" varchar   ,
    "questions_body" varchar   ,
    CONSTRAINT "pk_questions" PRIMARY KEY (
        "questions_id"
     )
);

CREATE TABLE "school_memberships" (
    "school_memberships_school_id" varchar ,
    "school_memberships_user_id" varchar
);

CREATE TABLE "students" (
    "students_id" varchar   NOT NULL,
    "students_location" varchar  ,
    "students_date_joined" varchar  ,
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

