release: echo "INSERT INTO django_migrations (app, name, applied) VALUES ('users', '0001_initial', CURRENT_TIMESTAMP);" | python manage.py dbshell
release: echo "UPDATE django_content_type SET app_label = 'users' WHERE app_label = 'auth' and model = 'user';" | python manage.py dbshell
release: python3. manage.py makemigrations --no-input
release: python3 manage.py migrate --no-input
web: gunicorn nnybackend.wsgi