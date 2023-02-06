# Backend
1) Open up your terminal from the IDE and run the commands listed below.

2) ```git checkout backend-branch```

3) ```python3 -m venv venv```

4) ```source venv/bin/activate```  
     run this and (5) everytime you want to run backend server locally

5)  ```
    pip install djangorestframework  
    pip install markdown       # Markdown support for the browsable API.  
    pip install django-filter  # Filtering support  
    pip install drf-yasg
    ```

6) ```pip3 install -r requirements.txt```

7) add (if not already there) a file named ".env.local" under the backend folder and add the following line:  
    ```BASE_URL = http://127.0.0.1:8000/api```

8) If you already have a superuser account, skip this step. To create a superadmin, run the following command and follow the prompts:  
    ```python3 manage.py createsuperuser```

9) ```python3 manage.py runserver```