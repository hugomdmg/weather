# Usa una imagen base de Python
FROM python:3.9-slim

# Establece el directorio de trabajo en el contenedor
WORKDIR /API

# Copia los archivos de tu aplicación al contenedor
COPY . /API

# Instala las dependencias necesarias
RUN pip install --no-cache-dir -r requirements.txt

# Expone el puerto en el que correrá la aplicación
EXPOSE 5000

# Define el comando para ejecutar el servidor
CMD ["python3", "server.py"]
