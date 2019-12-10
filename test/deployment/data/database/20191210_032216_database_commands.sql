ALTER TABLE "main$datap" ALTER COLUMN "z" RENAME TO "mag";
UPDATE "mendixsystem$attribute"
 SET "entity_id" = '3d830743-17c0-43e8-8deb-ac1fbc4c639e', 
"attribute_name" = 'mag', 
"column_name" = 'mag', 
"type" = 2, 
"length" = 0, 
"default_value" = '0.0', 
"is_auto_number" = false
 WHERE "id" = 'ee4fc950-19f0-4969-b919-8c7cf62dd389';
UPDATE "mendixsystem$version"
 SET "versionnumber" = '4.2', 
"lastsyncdate" = '20191210 03:21:58';
