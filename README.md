# nfactorial-tengri-news
this is a Django project about a news website.

# installation instructions
follow these steps to install and run the project:

ensure you have the following installed on your system:

- python 3.11 
- django 5.0.3
- angular cli 17.3
- virtualenv

# steps
1. clone the repository to your local machine:
   ```bash
    git clone https://github.com/zhanius/nfactorial-tengri-news.git
   ```

2. navigate to the project directory:
     for frontend:
       ```bash
       cd tengri-news
       ```
     for backend:
       ```bash
       cd tengri-back
       ```

3. run the application:
   ```bash
   npm install -g @angular/cli@17.3
   ```
   - FOR FRONTEND:
    ```bash
    ng serve
    ```
   - *if you don't have as me angular cli, then* :
   ```bash
    npx ng serve
   ```
    and follow the link http://localhost:4200/ to open the project.

   - FOR BACKEND:
   - apply the migrations
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
   - create a superuser to access the admin panel
   ```bash
   python manage.py createsuperuser
   ```
   - run the project
   ```bash
   python manage.py runserver
   ```
  




   

