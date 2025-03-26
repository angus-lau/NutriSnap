# NutriSnap is an intuitive nutrition tracker that seamlessly integrates into your daily life.

## Inspiration

Every time you go to a restaurant, its highly likely that you see someone taking a picture of their food before they eat it. We wanted to create a seamless way for people to keep track of their nutritional intake, minimizing the obstacles required to be aware of the food you consume. Building on the idea that people already often take pictures of the food they eat, we decided to utilize something as simple as one's camera app to keep track of their daily nutritional intake.

## What it does

NutriSnap analyzes pictures of food to detect its nutritional value. After simply scanning a picture of food, it summarizes all its nutritional information and displays it to the user, while also adding it to a log of all consumed food so people have more insight on all the food they consume. NutriSnap has two fundamental features:

scan UPC codes on purchased items and fetch its nutritional information
detect food from an image using a public ML food-classification API and estimate its nutritional information
This information is summarized and displayed to the user in a clean and concise manner, taking their recommended daily intake values into account. Furthermore, it is added to a log of all consumed food items so the user can always access a history of their nutritional intake.

## How we built it

The app uses React Native for its frontend and a Python Django API for its backend. If the app detects a UPC code in the photo, it retrieves nutritional information from a UPC food nutrition API and summarizes its data in a clean and concise manner. If the app fails to detect a UPC code in the photo, it forwards the photo to its Django backend, which proceeds to classify all the food in the image using another open API. All collected nutritional data is forwarded to the OpenAI API to summarize nutritional information of the food item, and to provide the item with a nutrition rating betwween 1 and 10. This data is displayed to the user, and also added to their log of consumed food.
