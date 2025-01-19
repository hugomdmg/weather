from flask import Blueprint, jsonify, request
import requests
from datetime import datetime



API_KEY = 'e977d82fb6541dc8c4fbf8ada061c5ee'

coord_weather_blueprint = Blueprint('coord-weather', __name__)
city_weather_blueprint = Blueprint('city-weather', __name__)




@coord_weather_blueprint.route('/coord-weather', methods=['POST'])
def get_weather():
    weather_data = []
    coordinates = request.json.get('coord')

    for coord in coordinates:
        url = f"http://api.openweathermap.org/data/2.5/weather?lat={coord['lat']}&lon={coord['lon']}&appid={API_KEY}&units=metric"
        
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            weather_data.append({
                'city':data['name'],
                'coord': data['coord'],
                'temperature': f"{ data['main']['temp']}°C",
                'weather_description': data['weather'][0]['description'],
                'temp_min': data['main']['temp_min'],
                'temp_max': data['main']['temp_max'],
                'pressure': data['main']['pressure'],
                'humidity': data['main']['humidity'],
                'wind': data['wind'],
                'sunrise': datetime.utcfromtimestamp(data['sys']['sunrise']),
                'sunset': datetime.utcfromtimestamp(data['sys']['sunset']),
            })
        else:
            weather_data.append({
                'error': 'No se pudo obtener el clima para esta ubicación.',
                'coordinates': coord
            })
    
    return jsonify(weather_data)


@city_weather_blueprint.route('/city-weather', methods=['POST'])
def data():
    city = request.json.get('city')
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        print(data)


        
        return jsonify({
            'coord': data['coord'],
            'city': city,
            'temperature': f"{ data['main']['temp']}°C",
            "weather_description": data['weather'][0]['description'],
            "temp_min": data['main']['temp_min'],
            "temp_max": data['main']['temp_max'],
            "pressure": data['main']['pressure'],
            "humidity": data['main']['humidity'],
            'wind': data['wind'],
            "sunrise": datetime.utcfromtimestamp(data['sys']['sunrise']),
            "sunset": datetime.utcfromtimestamp(data['sys']['sunset']),
        })
    else:
        return jsonify({
            'error': 'No se pudo obtener el clima. Verifica la clave API o la ciudad.'
        })
