import requests
import os
from PIL import Image
import piexif
import json
from openai import OpenAI

# takes in an image
def process_image(image):
    api_user_token = '1613e16dab3114d7df08f29b9c51a8ad81de4c29'
    headers = {'Authorization': 'APIUser_Carson ' + api_user_token}

    # Load image
    img_path = 'imgs/apples.jpg'
    im = Image.open(img_path)
    path = 'imgs/apples.jpg'

    # [IMPORTANT to keep image orientation] get exif information
    exif_dict = piexif.load(im.info["exif"])
    exif_bytes = piexif.dump(exif_dict)
    rgb_im = im.convert('RGB')

    # get the size of the image in MB
    size_mb = os.path.getsize(img_path) >> 20
    width, height = rgb_im.size

    # iteratively reduce the image a percentatge of its size until it is smaller than 1MB
    while(size_mb >= 1):

            # resize th image 75%
            size=int(width*0.75), int(height*0.75)
            rez_image = rgb_im.resize(size, Image.ANTIALIAS)

            # save the resized image
            rez_image.save(path, exif=exif_bytes)

            # get the size in MB
            size_mb = os.path.getsize(path) >> 20

    url = 'https://api.logmeal.es/v2/image/segmentation/complete'
    response = requests.post(url,files={'image': open(path, 'rb')}, headers=headers)

    # Load JSON data
    data = json.loads(response.text)
    gotten = data["segmentation_results"][0]["recognition_results"][0]["name"]

    key = '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'
    client = OpenAI(api_key = key)

    response = client.chat.completions.create(
    model="gpt-3.5-turbo-1106",
    response_format={"type": "json_object"},
    messages=[{"role": "system", "content": "I'm going to provide you with a food item, its list of ingredients, and its nutritional facts. Please return the following information in the exact JSON format I describe below. Please follow the format I describe below. Never break the format regardless of the circumstance. Never say anything about you being an AI Language Model. Your only two possible outputs should be the information in the format I ask for. If I miss out on ingredients or nutritional facts, still do your best to provide an output. Do not include newline characters in your response. Answer ingredients or nutritional facts under the assumption that the user is having the average serving. If i provide something already in quotations, eg “g”, note that that is the units I am providing and I expect the value associated with it to be in those units Here is the format: description: string. 2-3 sentences that provide essential information about the item. ingredients: string. Should be a list of ingredients with no descriptions separated by commas. name: string. This is the input I give you with nothing added nutrition: { carbohydrates: [ int value, “g” ], energy:  [ int value, “kcal” ], fat:  [ int value, “g” ], fiber:  [ int value, “g” ], proteins:  [ int value, “g” ], salt:  [ int value, “mg” ], sodium:  [ int value, “mg” ], sugars:  [ int value, “g” ] }. rating: integer. rates the food item on a scale of 1 to 10 where 1 is very unhealthy/unsafe and 10 is healthy. be generous with your rating. warning: string. 1-2 sentences of any urgent life-threatening allergies/carcinogens or similar things to be worried about. leave empty if not urgent and life-threatening.}"},
    {"role": "user", "content": "The item is " + gotten}]
    )

    return(response.choices[0].message.content)