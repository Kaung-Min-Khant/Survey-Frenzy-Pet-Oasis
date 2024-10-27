# Repo For Survey Frenzy: Pet Oasis

![logo.gif](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)

### Developed and Maintained By: Kaung Min Khant

Survey Frenzy: Pet Oasis is a web application that combines the fun of digital pet ownership with a survey creation and answering system. Users can create and participate in surveys, buy digital pets, feed them, and engage in a food gacha system.

## Description

Survey Frenzy: Pet Oasis allows users to:

- Login and Sign Up
- Create and answer surveys
- Buy and own digital pets
- Feed their pets
- Participate in a food gacha system to get 10x, 20x, even 50x food for their pets

## Deployed Website

you can view the demo of the website here.

```
https://bed-ca2-kaung-min-khant.onrender.com
```

## Prerequisites

Before running the app, ensure that the following dependencies are installed:

- Node.js
- npm (Node Package Manager)
- Mysql Server
- Any IDE (prefer Visual Studio Code)
- Postman

## Project Folder Structure

```
bed-ca2-Kaung-Min-Khant/
│
├── public
│   ├── css
│   ├── color.css
│   ├── style.css
│   ├── images
│   │   ├── background
│   │   ├── gif
│   │   ├── icons
│   ├── js
│   │   ├── changeUsername.js
│   │   ├── createAnswer.js
│   │   ├── changeQuestion.js
│   │   ├── changeReview.js
│   │   ├── drawGacha.js
│   │   ├── getCurrentURL.js
│   │   ├── getReviewStats.js
│   │   ├── getSingleQuestion.js
│   │   ├── getSingleUserInfo.js
│   │   ├── getUserProfile.js
│   │   ├── indexPageButtonToggle.js
│   │   ├── loginUser.js
│   │   ├── queryCmds.js
│   │   ├── refreshPersistedPage.js
│   │   ├── registerUser.js
│   │   ├── showAllPet.js
│   │   ├── showAllPetWiki.js
│   │   ├── showAllQuestions.js
│   │   ├── showAllReview.js
│   │   ├── showAllShopItems.js
│   │   ├── showAllUser.js
│   │   ├── showMyQuestion.js
│   │   ├── showMyReview.js
│   │   ├── updateReview.js
│   │   ├── userNavbarToggle.js
│   ├── index.html
│   ├── login.html
│   ├── myQuestion.html
│   ├── myReview.html
│   ├── pets.html
│   ├── petWiki.html
│   ├── profile.html
│   ├── questions.html
│   ├── register.html
│   ├── review.html
│   ├── shop.html
│   ├── singleQuestionInfo.html
│   ├── singleUserInfo.html
│   ├── updateReview.html
│   ├── users.html
├── node_modules
├── src
│   ├── configs
│   │   ├── createSchema.js
│   │   ├── initTables.js
│   │   ├── initProcedures.js
│   │   └── initEventScheduler.js
│   └── controllers
│   │   ├── answerController.js
│   │   ├── gachaRewardController.js
│   │   ├── petController.js
│   │   ├── petWikiController.js
│   │   ├── questionController.js
│   │   ├── reviewController.js
│   │   ├── shopController.js
│   │   ├── userController.js
│   └── middlewares
│   │   ├── bcryptMiddleware.js
│   │   ├── errorHandlerMiddleware.js
│   │   ├── jwtMiddleware.js
│   ├── models
│   │   ├── answerModel.js
│   │   ├── gachaRewardModel.js
│   │   ├── petModel.js
│   │   ├── petWikiModel.js
│   │   ├── questionModel.js
│   │   ├── reviewModel.js
│   │   ├── shopModel.js
│   │   ├── userModel.js
│   ├── routes
│   │   ├── gachaRoutes.js
│   │   ├── mainRoutes.js
│   │   ├── petRoutes.js
│   │   ├── petWikiRoutes.js
│   │   ├── questionRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── shopRoutes.js
│   │   ├── userRoutes.js
│   ├── services
│   │   ├── db.js
│   ├── utils
│   │   ├── httpStatusCode.js
│   ├── app.js
├── .env
├── .env.local
├── .gitignore
├── index.js
├── package.json
└── package-lock.json
└── README.md
└── requirements.txt
```

## Installation Instructions

1. Clone the repository:
   ```shell
   git clone https://github.com/ST0503-BED/bed-ca2-Kaung-Min-Khant
   ```
2. Navigate to the project directory:
   ```shell
   cd /bed-ca2-Kaung-Min-Khant/
   ```
3. Install dependencies:
   ```shell
   npm install
   ```
4. Open the `.env` file and edit the following lines:

   ```shell
    DB_DATABASE=<your_database_name>
    DB_HOST=<your_database_host>
    DB_USER=<your_database_user>
    DB_PASSWORD=<your_database_password>
    JWT_SECRET_KEY=<your_jwt_secret>
    JWT_EXPIRES_IN=15m
    JWT_ALGORITHM=HS256
    SALT_ROUNDS=14
   ```

   Replace `<your_database_host>`, `<your_database_user>`, `<your_database_password>`, `<your_jwt_secret>` and `<your_database_name>` with the appropriate values for your database connection. I recommend jwt_secret to be randomly generated 256 bits.

5. Initialize the database tables and populate them with sample data
   ```shell
   npm run init_tables
   ```
6. Start the development server:
   ```shell
   npm start
   ```
7. Open your web browser and go to
   ```shell
   http://localhost:your-port
   ```

## Features

- **User Management:** user login registration and update info.
- **Survey System:** Create, manage, and participate in surveys.
- **Digital Pet Ownership:** Buy and own digital pets.
- **Pet Feeding:** Feed your pets to keep them healthy and happy.
- **Food Gacha System:** Engage in a fun gacha system to get special food items.

## Examples

User must login into the webpage to access some of the features.

- Buying a Pet:

  Go to the "Shop" section.
  Select a pet you want to buy. <br>
  Click on the "Buy" button. <br>

- Feeding a Pet:

  1. Go to the "Profile" section.
  2. Select the pet you want to feed.
  3. Click on the "Feed" button.

- Asking a Question:

  1. Go to the "Questions" section.
  2. Click on the "My Questions" button.
  3. Type in your question and Click on the "Post" button.

- Answering a Question:

  1. Go to the "Questions" section.
  2. Click on the "Answer" button on the question you wanna answer.
  3. Select your answer ,Type in additional Info, and Click on the "Answer" button

- Rating Review

  1. Go to the "Reviews" section.
  2. Click on the "Rate Us" button.
  3. Select the rating Star you wanna give, and Click on the "Submit Review" button

## New EndPoint for CA2

- **GET /users/token**: This endpoint should return an object of user information. this is for user accessing their own profile.

Token Required?

- [x] Yes
- [ ] No

Example Request Body

```
None
```

Example Response Body

```
{
    "id": 1,
    "username": "haha",
    "email": "admin@a.com",
    "created_on": "2024-07-25 08:29:25",
    "updated_on": "2024-08-02 17:09:49",
    "last_login_on": "2024-08-02 18:03:17",
    "points": 7850,
    "food_amt": 1030,
    "created_questions": 4,
    "answered_questions": 6,
    "collected_pets": 31
}
```

---

- **GET /users/token/pets**: This endpoint should return an array pets owned by user. this is for user accessing their own profile.

Token Required?

- [x] Yes
- [ ] No

Example Request Body

```
None
```

Example Response Body

```
[
    {
        "pet_id": 1,
        "species": "puffer-fish",
        "creation_date": "2024-07-25 08:29:25",
        "owner_id": 1,
        "owner": "haha",
        "hunger": 46
    },
    {
        "pet_id": 2,
        "species": "jellyfish",
        "creation_date": "2024-07-25 08:29:25",
        "owner_id": 1,
        "owner": "haha",
        "hunger": 86
    },
    {
        "pet_id": 7,
        "species": "tuna",
        "creation_date": "2024-07-25 08:29:44",
        "owner_id": 1,
        "owner": "haha",
        "hunger": 86
    }
]
```

---

- **PUT /users/token/username**: This endpoint should return an object of new updated user with different username.

Token Required?

- [x] Yes
- [ ] No

Example Request Body

```
{
    "username": "admin"
}
```

Example Response Body

```
{
    "id": 1,
    "username": "admin",
    "email": "admin@a.com",
    "created_on": "2024-07-25 08:29:25",
    "updated_on": "2024-08-02 18:23:12",
    "last_login_on": "2024-08-02 18:22:52",
    "points": 7850,
    "food_amt": 1030
}
```

---

- **PUT /pets/:pet_id/feed**: This endpoint should return an object of pet that had been successfully feed.

Token Required?

- [x] Yes
- [ ] No

Example Request Body

```
None
```

Example Response Body

```
{
    "pet_id": 1,
    "owner_id": 1,
    "hunger": 51,
    "food_amt": 1025
}
```

---

- **GET /questions/creator**: This endpoint should return an array of questions user had been created.

Token Required?

- [x] Yes
- [ ] No

Example Request Body

```
None
```

Example Response Body

```
[
    {
        "question_id": 9,
        "question": "do you love egg?",
        "creator_id": 1,
        "creator": "admin",
        "created_at": "2024-08-02 16:14:13"
    },
    {
        "question_id": 7,
        "question": "Do you like BED or not?",
        "creator_id": 1,
        "creator": "admin",
        "created_at": "2024-08-02 15:50:11"
    }
]
```

---

- **GET /reviews**: This endpoint should return an array of all created reviews.

Token Required?

- [ ] Yes
- [x] No

Example Request Body

```
None
```

Example Response Body

```
[
    {
        "id": 1,
        "review_amt": 4,
        "user_id": 1,
        "username": "admin",
        "email": "admin@a.com"
    },
    {
        "id": 2,
        "review_amt": 3,
        "user_id": 2,
        "username": "Bob",
        "email": "bob@gmail.com"
    }
]
```

---

- **GET /reviews/stats**: This endpoint should return an object with statistics of all created reviews.

Token Required?

- [ ] Yes
- [x] No

Example Request Body

```
None
```

Example Response Body

```
{
    "count_reviews": 5,
    "avg_review_amt": "2.2",
    "total_review_amt": "11"
}
```

---

- **GET /reviews/owner**: This endpoint should return an array of reviews created by user.

Token Required?

- [x] Yes
- [ ] No

Example Request Body

```
None
```

Example Response Body

```
[
    {
        "id": 1,
        "review_amt": 4,
        "user_id": 1,
        "username": "admin",
        "email": "admin@a.com"
    },
    {
        "id": 4,
        "review_amt": 1,
        "user_id": 1,
        "username": "admin",
        "email": "admin@a.com"
    }
]
```

---

- **POST /reviews/**: This endpoint should return a message indicating Review had been successfully.

Token Required?

- [x] Yes
- [ ] No

Example Request Body

```
{
    "review_amt" : 5
}
```

Example Response Body

```
{
    "message": "Review created successfully"
}
```

---

- **POST /reviews/**: This endpoint should return a message indicating Review had been successfully created.

Token Required?

- [x] Yes
- [ ] No

Example Request Body

```
{
    "review_amt" : 5
}
```

Example Response Body

```
{
    "message": "Review created successfully"
}
```

---

- **GET /reviews/:id**: This endpoint should return a object of review with id.

Token Required?

- [ ] Yes
- [x] No

Example Request Body

```
None
```

Example Response Body

```
{
    "id": 1,
    "review_amt": 1,
    "user_id": 1,
    "created_at": "2024-07-25 08:29:25"
}
```

---

- **PUT /reviews/:id**: This endpoint should return a message indicating Review had been updated.

Token Required?

- [x] Yes
- [ ] No

Example Request Body

```
{
    "review_amt" : 1
}
```

Example Response Body

```
{
    "message": "Review updated successfully"
}
```

---

- **DELETE /reviews/:id**: This endpoint should return a HTTP status code 204 (indicating successfully deleted).

Token Required?

- [x] Yes
- [ ] No

Example Request Body

```
None
```

Example Response Body

```
None
```

---

## EndPoint for Gaming Part

- **GET /shop**: This endpoint should return an array of 4 shop item objects. Shop items refresh everyday.

Token Required?

- [x] Yes
- [ ] No

Example Request Body

```
None
```

Example Response Body

```
[
    {
        "item_id": 1,
        "pet_type": 3,
        "species": "jellyfish",
        "price": 20,
        "refresh_date": "2024-08-01"
    },
    {
        "item_id": 2,
        "pet_type": 6,
        "species": "swordfish",
        "price": 80,
        "refresh_date": "2024-08-01"
    },
    {
        "item_id": 3,
        "pet_type": 1,
        "species": "turtle",
        "price": 50,
        "refresh_date": "2024-08-01"
    },
    {
        "item_id": 4,
        "pet_type": 8,
        "species": "tuna",
        "price": 70,
        "refresh_date": "2024-08-01"
    }
]
```

---

- **POST /shop/:item_id/pet**: This endpoint is for buying the pet. it will return pet object user just bought and reduce the points of users according to the price of pet.

Token Required?

- [x] Yes
- [ ] No

Example Request Body

```
None
```

Example Response Body

```
{
    "pet_id": 5,
    "species": "Cat",
    "owner_id": 1,
    "owner": "surveyKing"
}
```

---

- **PUT /gacha/draw**: This endpoint should return gacha object reward (food Amount) user just draw. it also update the food amount of user according to gacha reward and reduce the points of user for drawing gacha.

Token Required?

- [x] Yes
- [ ] No

Example Request Body

```
None 
```

Example Response Body

```
{
    "item_id": 1,
    "rarity": "Common",
    "probability": "0.60",
    "reward_food_amount": 5
}
```

---

- **GET /users/:user_id/pets**: This endpoint should return array of pets owned by user.

Token Required?

- [x] Yes
- [ ] No

Example Request Body

```
None
```

Example Response Body

```
[
    {
        "pet_id": 5,
        "species": "sea-urchin",
        "creation_date": "2024-07-25 08:29:25",
        "owner_id": 3,
        "owner": "Jerry"
    },
    {
        "pet_id": 6,
        "species": "swordfish",
        "creation_date": "2024-07-25 08:29:25",
        "owner_id": 3,
        "owner": "Jerry"
    }
]
```

---

- **GET /users/token/pets**: This endpoint should return pets owned by user (for profile). it also update hunger of pets when user view this route.

Token Required?

- [x] Yes
- [ ] No

Example Request Body

```
None
```

Example Response Body

```
[
    {
        "pet_id": 1,
        "species": "puffer-fish",
        "creation_date": "2024-07-25 08:29:25",
        "owner_id": 1,
        "owner": "admin",
        "hunger": 50
    },
    {
        "pet_id": 2,
        "species": "jellyfish",
        "creation_date": "2024-07-25 08:29:25",
        "owner_id": 1,
        "owner": "admin",
        "hunger": 85
    },
]
```

---

- **PUT pets/:pet_id/feed**: This endpoint is for feeding the pet of user. it should increase the hunger_level of pet and update last_hunger_update_on and reduce the food amount of user.

Token Required?

- [x] Yes
- [ ] No

```
None
```

Example Response Body

```
{
    "pet_id": 1,
    "owner_id": 1,
    "hunger": 55,
    "food_amt": 1020
}
```

---

- **GET /petWiki**: This endpoint should return an array of all Pet Wikipedia objects.

Token Required?

- [ ] Yes
- [x] No


Example Request Body

```
None
```

Example Response Body

```
[
    {
        "type_number": 1,
        "name": "turtle",
        "price": 50,
        "description": "A slow-moving reptile often kept as a pet."
    },
    {
        "type_number": 2,
        "name": "puffer-fish",
        "price": 30,
        "description": "A small, inflatable fish known for its unique appearance."
    },
    {
        "type_number": 3,
        "name": "jellyfish",
        "price": 20,
        "description": "A gelatinous sea creature that drifts with ocean currents."
    }
]
```

---

- **GET /pets**: This endpoint should return an array of all Created Pet objects.

Token Required?

- [ ] Yes
- [x] No

Example Request Body

```
None
```

Example Response Body

```
[
    {
        "pet_id": 1,
        "species": "puffer-fish",
        "creation_date": "2024-07-25 08:29:25",
        "owner_id": 1,
        "owner": "admin"
    },
    {
        "pet_id": 2,
        "species": "jellyfish",
        "creation_date": "2024-07-25 08:29:25",
        "owner_id": 1,
        "owner": "admin"
    }
]
```

---

## Contact Information

For questions or support, please open an issue in the repository or contact KAUNGKHANT.23@ichat.sp.edu.sg.

## Authors

Kaung Min Khant - Initial work - (https://github.com/Kaung-Min-Khant)

## Acknowledgements

Thanks to SIAH Peih Wee for support and guidance.
References to any libraries or tools used in the project.
