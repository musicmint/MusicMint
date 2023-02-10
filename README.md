# Backend
1) Open up your terminal from the IDE and run the commands listed below.

2) ```git checkout backend-branch```

3) ```python3 -m venv venv```

4) ```source venv/bin/activate```  
     run this and (5) everytime you want to run backend server locally

5) ```pip3 install -r requirements.txt```

6) If you already have a superuser account, skip this step. To create a superadmin, run the following command and follow the prompts:  
    ```python3 manage.py createsuperuser```

7) ```python3 manage.py runserver```