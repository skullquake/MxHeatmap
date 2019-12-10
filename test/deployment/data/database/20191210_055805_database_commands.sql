ALTER TABLE "main$config" RENAME TO "d6ecb8f25769404da53a0580e47fbc2b";
ALTER TABLE "main$datasetp_config" DROP CONSTRAINT "uniq_main$datasetp_config_main$datasetpid";
DROP INDEX "idx_main$datasetp_config_main$config_main$datasetp";
ALTER TABLE "main$datasetp_config" RENAME TO "401b17b6855748908d797bbe841f48fa";
DELETE FROM "mendixsystem$entity" 
 WHERE "id" = '1f391ff4-c848-4547-8026-f99218d49184';
DELETE FROM "mendixsystem$entityidentifier" 
 WHERE "id" = '1f391ff4-c848-4547-8026-f99218d49184';
DELETE FROM "mendixsystem$sequence" 
 WHERE "attribute_id" IN (SELECT "id"
 FROM "mendixsystem$attribute"
 WHERE "entity_id" = '1f391ff4-c848-4547-8026-f99218d49184');
DELETE FROM "mendixsystem$attribute" 
 WHERE "entity_id" = '1f391ff4-c848-4547-8026-f99218d49184';
ALTER TABLE "main$datasetp" ADD "max_y" DOUBLE NULL;
UPDATE "main$datasetp"
 SET "max_y" = 100.0;
ALTER TABLE "main$datasetp" ADD "max_x" DOUBLE NULL;
UPDATE "main$datasetp"
 SET "max_x" = 100.0;
ALTER TABLE "main$datasetp" ADD "nelem" INT NULL;
UPDATE "main$datasetp"
 SET "nelem" = 32;
ALTER TABLE "main$datasetp" ADD "min_mag" DOUBLE NULL;
UPDATE "main$datasetp"
 SET "min_mag" = 0.0;
ALTER TABLE "main$datasetp" ADD "min_y" DOUBLE NULL;
UPDATE "main$datasetp"
 SET "min_y" = 0.0;
ALTER TABLE "main$datasetp" ADD "max_mag" DOUBLE NULL;
UPDATE "main$datasetp"
 SET "max_mag" = 100.0;
ALTER TABLE "main$datasetp" ADD "min_x" DOUBLE NULL;
UPDATE "main$datasetp"
 SET "min_x" = 0.0;
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('7696e026-8c89-49a8-b674-dd7ca3742086', 
'ebf9dde3-5dba-4961-9b9c-6da758ee1212', 
'max_x', 
'max_x', 
2, 
0, 
'100.0', 
false);
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('be3aac85-9ff7-49c7-9c28-de9a08ad1f6a', 
'ebf9dde3-5dba-4961-9b9c-6da758ee1212', 
'nelem', 
'nelem', 
3, 
0, 
'32', 
false);
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('70828941-18e7-4d6c-ba80-74d9bbf1d7fb', 
'ebf9dde3-5dba-4961-9b9c-6da758ee1212', 
'max_y', 
'max_y', 
2, 
0, 
'100.0', 
false);
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('dfec45ab-ecc9-4c73-9026-55b7decb6852', 
'ebf9dde3-5dba-4961-9b9c-6da758ee1212', 
'min_mag', 
'min_mag', 
2, 
0, 
'0.0', 
false);
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('a2efb14b-805d-4b37-90a2-f425f3eef407', 
'ebf9dde3-5dba-4961-9b9c-6da758ee1212', 
'min_x', 
'min_x', 
2, 
0, 
'0.0', 
false);
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('3b74ccc4-5c7f-4375-9f20-3eb77bcff98d', 
'ebf9dde3-5dba-4961-9b9c-6da758ee1212', 
'min_y', 
'min_y', 
2, 
0, 
'0.0', 
false);
INSERT INTO "mendixsystem$attribute" ("id", 
"entity_id", 
"attribute_name", 
"column_name", 
"type", 
"length", 
"default_value", 
"is_auto_number")
 VALUES ('8e41045f-d25a-46f5-be22-a8ae69525e39', 
'ebf9dde3-5dba-4961-9b9c-6da758ee1212', 
'max_mag', 
'max_mag', 
2, 
0, 
'100.0', 
false);
DELETE FROM "mendixsystem$association" 
 WHERE "id" = '9a208c2c-b301-4e15-9731-4657531b8494';
DELETE FROM "mendixsystem$unique_constraint" 
 WHERE "name" = 'uniq_main$datasetp_config_main$datasetpid';
DROP TABLE "d6ecb8f25769404da53a0580e47fbc2b";
DROP TABLE "401b17b6855748908d797bbe841f48fa";
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.2', 
"lastsyncdate" = '20191210 05:58:04';
