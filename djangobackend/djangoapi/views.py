import json
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from io import BytesIO
from .serializers import ImageUploadSerializer

import requests
import os
from PIL import Image
import piexif
import json
from openai import OpenAI
import base64


# takes in an image
def process_image(image):
    api_user_token = "1613e16dab3114d7df08f29b9c51a8ad81de4c29"
    headers = {"Authorization": "APIUser_Carson " + api_user_token}

    # Load image
    im = Image.open(BytesIO(base64.b64decode(image)))
    # path = "imgs/apples.jpg"

    # [IMPORTANT to keep image orientation] get exif information
    exif_dict = piexif.load(im.info["exif"])
    exif_bytes = piexif.dump(exif_dict)
    rgb_im = im.convert("RGB")

    # with open("image.jpg", "rb") as w:
    #     w.write(im)]
    img_path = "image.jpg"
    im.save(img_path)

    # get the size of the image in MB
    size_mb = os.path.getsize(img_path) >> 20
    width, height = rgb_im.size

    # iteratively reduce the image a percentatge of its size until it is smaller than 1MB
    while size_mb >= 1:
        # resize th image 75%
        size = int(width * 0.75), int(height * 0.75)
        rez_image = rgb_im.resize(size, Image.LANCZOS)

        # save the resized image
        rez_image.save(img_path, exif=exif_bytes)

        # get the size in MB
        size_mb = os.path.getsize(img_path) >> 20

    # imgByteArr = io.BytesIO()
    # im.save(imgByteArr, format=im.format)
    # imgByteArr = imgByteArr.getvalue()
    url = "https://api.logmeal.es/v2/image/segmentation/complete"
    response = requests.post(
        url, files={"image": open(img_path, "rb")}, headers=headers
    )

    print("four")
    # Load JSON data
    data = json.loads(response.text)

    gotten = data["segmentation_results"][0]["recognition_results"][0]["name"]

    key = "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"
    client = OpenAI(api_key=key)

    response = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": "I'm going to provide you with a food item, its list of ingredients, and its nutritional facts. Please return the following information in the exact JSON format I describe below. Please follow the format I describe below. Never break the format regardless of the circumstance. Never say anything about you being an AI Language Model. Your only two possible outputs should be the information in the format I ask for. If I miss out on ingredients or nutritional facts, still do your best to provide an output. Do not include \\n characters in your response. Answer ingredients or nutritional facts under the assumption that the user is having the average serving. If i provide something already in quotations, eg “g”, note that that is the units I am providing and I expect the value associated with it to be in those units Here is the format: description: string. 2-3 sentences that provide essential information about the item. ingredients: string. Should be a list of ingredients with no descriptions separated by commas. name: string. This is the input I give you with nothing added nutrition: { carbohydrates: [ int value, “g” ], energy:  [ int value, “kcal” ], fat:  [ int value, “g” ], fiber:  [ int value, “g” ], proteins:  [ int value, “g” ], salt:  [ int value, “mg” ], sodium:  [ int value, “mg” ], sugars:  [ int value, “g” ] }. rating: integer. rates the food item on a scale of 1 to 10 where 1 is very unhealthy/unsafe and 10 is healthy. be generous with your rating. warning: string. 1-2 sentences of any urgent life-threatening allergies/carcinogens or similar things to be worried about. leave empty if not urgent and life-threatening.}",
            },
            {"role": "user", "content": "The item is " + gotten},
        ],
    )

    return response.choices[0].message.content


@api_view(["GET"])
def hello_world(request):
    return Response({"message": "Hello, world"})


"""
### need to figure out 
@api_view(['GET'])
def process_img(request):
    return Response(process_image(image))
    """
"""
@api_view(['POST'])
class ProcessImageView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ImageUploadSerializer(data=request.data)
        if serializer.is_valid():
            # Process the image here using Pillow or any other library
            processed_image_data = process_image_function(serializer.validated_data['image'])
            # Return the processed image data in the response
            return Response({'success': True, 'processed_image': processed_image_data})
        else:
            return Response({'success': False, 'error': 'Invalid input data'}, status=status.HTTP_400_BAD_REQUEST)
"""


@api_view(["POST"])
def process(request):
    print(request)
    print(request.data)
    nutrition = process_image(request.data["img"])
    print(nutrition)
    return Response(json.loads(nutrition))
