# Setup

Based on the python version you have installed, run the commands using python or python3 and pip or pip3, whichever works for you. 

## Backend
1) cd backend

2) python3 -m venv venv

3) source venv/bin/activate  # (on mac) run this and (5) everytime you want to run backend server locally

4)  pip install djangorestframework
    pip install markdown       # Markdown support for the browsable API.
    pip install django-filter  # Filtering support
    pip install drf-yasg

5) pip3 install -r requirements.txt

6) add a file named ".env.local" under the backend folder and add the following line:
    BASE_URL = http://127.0.0.1:8000/api

7) To create a superadmin, run the following command and follow the prompts:
    python3 manage.py createsuperuser

8) python3 manage.py runserver




# Frontend
1) cd musicmint

2) npm install

3) add a file named ".env.local" under the backend folder and add the following line:
    BASE_URL = http://127.0.0.1:8000/api

4) npm run dev
