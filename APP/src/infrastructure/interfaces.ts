export interface WeatherData {
    coord?: string
    city?: string
    temperature?: string
    weather_description?: string
    temp_min?: string
    temp_max?: string
    pressure?: string
    humidity?: string
    wind: {
        speed?: number
        deg?: number
        gust?: number
    }
    sunrise?: string
    sunset?: string
}