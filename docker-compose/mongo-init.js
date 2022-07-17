// Production user
var USER = "klawdyo";
var PASS = "6qm3uRI9eITGuZP2I01aFKVZNKg7dytb";
var BASE = "db_api";

// Test user
var TEST_USER = "u_test";
var TEST_PASS = "12EA67E68B416";
var TEST_BASE = "test_db_api";

// First collection to be created
var COLLECTION = "users";


db = db.getSiblingDB(BASE);
db.createUser(
  {
    user: USER,
    pwd: PASS,
    roles: [{ role: 'readWrite', db: BASE }],
  },
);
db.createCollection(COLLECTION);

db = db.getSiblingDB(TEST_BASE);
db.createUser(
  {
    user: TEST_USER,
    pwd: TEST_PASS,
    roles: [{ role: 'readWrite', db: TEST_BASE }],
  },
);
db.createCollection(COLLECTION);
