FROM python:3.11-slim

WORKDIR /app

# Instalar dependencias primero para aprovechar la memoria caché de Docker
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código fuente de /backend y el Excel (sxsw_schedule_seleccion.xlsx)
COPY . .

# Comando default esperado por Render, que inyecta su propia variable $PORT
CMD uvicorn main:app --host 0.0.0.0 --port $PORT
