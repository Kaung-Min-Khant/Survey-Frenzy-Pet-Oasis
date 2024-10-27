//////////////////////////////////////////////////////
// REQUIRE DOTENV MODULE
//////////////////////////////////////////////////////
require("dotenv").config();
require("dotenv").config(); //read .env file and set environment variables

const pool = require("../services/db");

const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.SALT_ROUNDS);

const callback = (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
};

bcrypt.hash("1234", saltRounds, (error, hash) => {
  if (error) {
    console.error("Error hashing password:", error);
  } else {
    console.log("Hashed password:", hash);

    const SQLSTATEMENT = `
    DROP TABLE IF EXISTS User;

    DROP TABLE IF EXISTS PetWiki;

    Drop TABLE IF EXISTS Pet;

    DROP TABLE IF EXISTS Reviews;
    
    Drop TABLE IF EXISTS SurveyQuestion;

    Drop TABLE IF EXISTS UserAnswer;

    DROP TABLE IF EXISTS Shop;

    DROP TABLE IF EXISTS GachaReward;

    DROP TABLE IF EXISTS GachaDraw;
    
    -- Create User table
    CREATE TABLE User (
        id INT PRIMARY KEY AUTO_INCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        points INT DEFAULT 0,
        food_amt INT DEFAULT 0
    );

    -- Create PetWiki table
    CREATE TABLE PetWiki (
        type_number INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        price INT NOT NULL,
        description TEXT 
    );

    -- Create Pet table
    CREATE TABLE Pet (
    pet_id INT AUTO_INCREMENT PRIMARY KEY,
    type INT NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    hunger INT DEFAULT 100,
    last_hunger_update_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    owner_id INT NOT NULL
    );

    -- Create Reviews table
    CREATE TABLE Reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    review_amt INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Create SurveyQuestion table
    CREATE TABLE SurveyQuestion (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    creator_id INT NOT NULL,
    question TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Create UserAnswer table
    CREATE TABLE UserAnswer (
    answer_id INT AUTO_INCREMENT PRIMARY KEY,
    answered_question_id INT NOT NULL,
    participant_id INT NOT NULL,
    answer BOOL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    additional_notes TEXT
    );

    --  Create Shop table
    CREATE TABLE Shop (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    pet_type INT NOT NULL,
    refresh_date DATE NOT NULL
    );

    --  Create GachaReward table
    CREATE TABLE GachaReward (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    rarity VARCHAR(10) NOT NULL,
    probability DECIMAL(4,2) NOT NULL,
    reward_food_amount INT NOT NULL
    );

    --  Create GachaDraw table
    CREATE TABLE GachaDraw (
    draw_id INT AUTO_INCREMENT PRIMARY KEY,
    player_id INT NOT NULL,
    draw_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reward_item INT NOT NULL
    );

    INSERT INTO User (username, email, password, points, food_amt) VALUES
    ('admin', 'admin@a.com', '${hash}', 10000, 2500),
    ('Bob', 'bob@gmail.com', '${hash}', 100, 30),
    ('Jerry', 'jerry@gmail.com', '${hash}', 20, 180);

    -- Insert data into SurveyQuestion table
    INSERT INTO SurveyQuestion (creator_id, question) VALUES
    -- User1 questions
    (1,'Do you buy fruits from FC6?'),
    (1,'Is the fried chicken at FC5 salty?'),
    -- User2 questions
    (2,'Did you recycled any e-waste?'),
    (2,'Do you turn off lights and appliances when not in use?'),
    -- User3 questions
    (3,'Have you visit the cafe at Moberly?');

    -- Insert data into UserAnswer table
    INSERT INTO UserAnswer (answered_question_id, participant_id, answer, additional_notes) VALUES
    -- User1 answers
    (3,1,TRUE,'A lot actually'),
    (4,1,FALSE,'I always forget'),
    -- User2 answers
    (1,2,FALSE,'I rarely eat fruits'),
    (2,2,TRUE,'Yes so salty'),
    -- User3 answers
    (1,3,TRUE,'I like fruit a lot'),
    (2,3,FALSE,'No it is normal');

    INSERT INTO PetWiki (name, price, description) VALUES
    ('turtle', 50.00, 'A slow-moving reptile often kept as a pet.'),
    ('puffer-fish', 30.00, 'A small, inflatable fish known for its unique appearance.'),
    ('jellyfish', 20.00, 'A gelatinous sea creature that drifts with ocean currents.'),
    ('crab', 25.00, 'A crustacean with a hard shell and claws for scavenging.'),
    ('sea-urchin', 15.00, 'A spiny marine creature found in shallow coastal waters.'),
    ('swordfish', 80.00, 'A large, predatory fish known for its long, sword-like bill.'),
    ('flounder', 40.00, 'A flatfish with both eyes on one side of its body.'),
    ('tuna', 70.00, 'A large, fast-swimming fish prized for its meat.'),
    ('clownfish', 35.00, 'A small, brightly colored fish often found in coral reefs.'),
    ('dolphin', 200.00, 'A highly intelligent marine mammal known for its playful behavior.'),
    ('shark', 150.00, 'A large predatory fish with sharp teeth and a streamlined body.'),
    ('lobster', 60.00, 'A large crustacean prized for its meat.'),
    ('manta-ray', 90.00, 'A large, graceful ray with distinctive wing-like fins.'),
    ('eel', 55.00, 'A snake-like fish found in both freshwater and saltwater habitats.'),
    ('whale', 500.00, 'A massive marine mammal that breathes air through a blowhole.'),
    ('squid', 25.00, 'A cephalopod mollusk with a tubular body and ten arms.'),
    ('carp', 10.00, 'A freshwater fish often raised for food.'),
    ('dragon', 1000.00, 'A mythical creature resembling a large reptile with wings and scales.'),
    ('stingray', 45.00, 'A flat-bodied fish with a long, venomous spine.'),
    ('seahorse', 30.00, 'A small fish with a distinctive horse-like head and curled tail.'),
    ('nautilus', 85.00, 'A mollusk with a spiral-shaped shell and tentacle-like appendages.'),
    ('goldfish', 15.00, 'A small freshwater fish known for its golden coloration.'),
    ('conchshell', 8.00, 'A large, spiral-shaped shell often used for decoration.'),
    ('shrimp', 12.00, 'A small, swimming crustacean with a curled body.'),
    ('orca', 300.00, 'A large, powerful marine mammal known for its black and white coloration.'),
    ('oyster', 18.00, 'A bivalve mollusk with a rough, irregular shell.'),
    ('hammerhead', 120.00, 'A distinctive shark with a flattened, hammer-shaped head.'),
    ('narwhal', 250.00, 'A medium-sized whale known for its long, spiral tusk.'),
    ('starfish', 8.00, 'A marine animal with a central disc and five arms.'),
    ('blowfish', 25.00, 'A fish known for its ability to inflate into a ball shape.'),
    ('octopus', 40.00, 'A highly intelligent mollusk with eight arms and a soft body.'),
    ('anglerfish', 75.00, 'A deep-sea fish with a bioluminescent lure on its head.'),
    ('angelfish', 30.00, 'A colorful freshwater or saltwater fish with a flattened body shape.');

    -- Insert data into Pet table
    INSERT INTO Pet (type, owner_id) VALUES
    -- User 1 has a puffer-fish and a jellyfish
    (2,1),
    (3,1),
    -- User 2 has a turtle and a crab
    (1,2),
    (4,2),
    -- User 3 has a sea-urchin and a swordfish
    (5,3),
    (6,3);

    INSERT INTO Reviews (review_amt, user_id) VALUES
    -- User 1 give 5 star review
    (4, 1),
    -- User 2 give 3 star review
    (3, 2),
    -- User 3 give 2 star review
    (2, 3);

    -- Insert data into GachaReward table
    INSERT INTO GachaReward (rarity, probability, reward_food_amount) VALUES
    ('Common', 0.6, 5),
    ('Uncommon', 0.25, 10),
    ('Rare', 0.1, 30),
    ('Epic', 0.04, 50),
    ('Legendary', 0.01, 100);

    -- Insert data into Shop table
    INSERT INTO Shop (pet_type, refresh_date)
    SELECT type_number, CURRENT_DATE()
    FROM PetWiki
    ORDER BY RAND()
    LIMIT 4;
    `;

    pool.query(SQLSTATEMENT, callback);
  }
});
